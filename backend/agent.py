import json
from typing import AsyncIterator
from google import genai
from google.genai import types
from knowledge_base import KnowledgeBase
from system_prompt import SYSTEM_PROMPT
from config import MAX_TOOL_CALLS, GEMINI_MODEL

TOOL_DECLARATIONS = [
    types.Tool(function_declarations=[
        types.FunctionDeclaration(
            name="list_topics",
            description="List all available knowledge base files with their category, tags, and summary. Call this first for broad or ambiguous questions.",
            parameters=types.Schema(type="OBJECT", properties={}),
        ),
        types.FunctionDeclaration(
            name="search_files",
            description="Full-text search across all knowledge base files. Returns matching filenames, excerpts, and relevance scores. Use targeted keywords.",
            parameters=types.Schema(
                type="OBJECT",
                properties={
                    "query": types.Schema(type="STRING", description="Search query keywords"),
                },
                required=["query"],
            ),
        ),
        types.FunctionDeclaration(
            name="read_file",
            description="Read the full contents of a specific knowledge base file. Use after identifying relevant files via search or list_topics.",
            parameters=types.Schema(
                type="OBJECT",
                properties={
                    "filename": types.Schema(type="STRING", description="Relative path to the file, e.g. 'career/career_chewy.md'"),
                },
                required=["filename"],
            ),
        ),
    ])
]


class AgentLoop:
    MAX_HISTORY_TURNS = 10

    def __init__(self, kb: KnowledgeBase, api_key: str):
        self.kb = kb
        self.client = genai.Client(api_key=api_key)
        self.model = GEMINI_MODEL

    def _execute_tool(self, name: str, args: dict) -> str | list | dict:
        try:
            if name == "list_topics":
                return self.kb.list_topics()
            elif name == "search_files":
                return self.kb.search(args.get("query", ""))
            elif name == "read_file":
                return self.kb.read_file(args.get("filename", ""))
            else:
                return f"Error: Unknown tool '{name}'"
        except (ValueError, FileNotFoundError) as e:
            return f"Error: {str(e)}"
        except Exception as e:
            return f"Error: {str(e)}"

    async def run(self, message: str, history: list[dict] | None = None) -> AsyncIterator[dict]:
        contents = []

        # Sliding window: keep last MAX_HISTORY_TURNS pairs
        if history:
            trimmed = history[-(self.MAX_HISTORY_TURNS * 2):]
            for msg in trimmed:
                contents.append(types.Content(
                    role="user" if msg["role"] == "user" else "model",
                    parts=[types.Part.from_text(text=msg["content"])],
                ))

        contents.append(types.Content(
            role="user",
            parts=[types.Part.from_text(text=message)],
        ))

        tool_calls_log = []
        files_read = set()

        for turn in range(MAX_TOOL_CALLS):
            response = self.client.models.generate_content(
                model=self.model,
                contents=contents,
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_PROMPT,
                    tools=TOOL_DECLARATIONS,
                    automatic_function_calling=types.AutomaticFunctionCallingConfig(disable=True),
                ),
            )

            candidate = response.candidates[0]
            function_calls = response.function_calls

            if function_calls:
                contents.append(candidate.content)
                tool_parts = []

                for fc in function_calls:
                    args = dict(fc.args) if fc.args else {}
                    yield {"type": "tool_call", "tool": fc.name, "args": args}

                    result = self._execute_tool(fc.name, args)
                    tool_calls_log.append({"tool": fc.name, "args": args})

                    if fc.name == "read_file" and not str(result).startswith("Error"):
                        files_read.add(args.get("filename", ""))

                    if isinstance(result, (list, dict)):
                        result_str = json.dumps(result)
                    else:
                        result_str = str(result)

                    tool_parts.append(types.Part.from_function_response(
                        name=fc.name,
                        response={"result": result_str},
                    ))

                contents.append(types.Content(role="tool", parts=tool_parts))
                continue

            # Final text response
            if candidate.content and candidate.content.parts:
                for part in candidate.content.parts:
                    if part.text:
                        yield {"type": "text", "content": part.text}

            yield {
                "type": "done",
                "files_cited": sorted(files_read),
                "tool_calls": tool_calls_log,
            }
            return

        # Hit max tool calls
        yield {"type": "limit_reached", "message": "I've reached my search limit for this query. Here is a summary based on the information I could gather:"}
        yield {
            "type": "done",
            "files_cited": sorted(files_read),
            "tool_calls": tool_calls_log,
        }
