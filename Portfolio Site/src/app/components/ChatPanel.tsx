import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  filesCited?: string[];
  isStreaming?: boolean;
}

const API_BASE = import.meta.env.VITE_API_URL || '';

const SUGGESTED_QUESTIONS = [
  "What was Michael's biggest project at Chewy?",
  'Tell me about his team scaling experience',
  "What's his leadership philosophy?",
  'Does he have cloud platform experience?',
];

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Describes a tool call in human-readable terms.
 */
function describeToolCall(tool: string, args: Record<string, unknown>): string {
  switch (tool) {
    case 'search_files':
      return `Searching for "${args.query}"...`;
    case 'read_file': {
      const filename = String(args.filename || '');
      return `Reading ${filename.split('/').pop() || filename}...`;
    }
    case 'list_topics':
      return 'Browsing available topics...';
    default:
      return `Running ${tool}...`;
  }
}

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [agentActivity, setAgentActivity] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, agentActivity]);

  // Abort any in-flight stream when panel closes
  useEffect(() => {
    if (!isOpen && abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, [isOpen]);

  const handleSend = useCallback(
    async (text: string) => {
      // Add user message
      const userMsg: Message = {
        id: generateId(),
        role: 'user',
        content: text,
      };

      // Create placeholder assistant message for streaming
      const assistantId = generateId();
      const assistantMsg: Message = {
        id: assistantId,
        role: 'assistant',
        content: '',
        isStreaming: true,
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setIsLoading(true);
      setAgentActivity(null);

      // Build history from existing messages (excluding the streaming placeholder)
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Abort any previous stream
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await fetch(`${API_BASE}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, history }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('No response body');
        }

        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // Parse SSE lines: look for "data: {...}\n\n" patterns
          const lines = buffer.split('\n');
          buffer = '';

          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // If this line starts with "data: ", parse the JSON payload
            if (line.startsWith('data: ')) {
              const jsonStr = line.slice(6);
              try {
                const event = JSON.parse(jsonStr);
                handleSSEEvent(event, assistantId);
              } catch {
                // Incomplete JSON; put it back in the buffer
                buffer = lines.slice(i).join('\n');
                break;
              }
            } else if (line !== '' && !line.startsWith(':')) {
              // Non-empty, non-comment, non-data line; keep in buffer
              buffer += line + '\n';
            }
          }
        }

        // If stream ends without a "done" event, finalize
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, isStreaming: false } : m
          )
        );
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          // User closed panel or sent new message; ignore
          return;
        }
        const errorMessage =
          err instanceof Error ? err.message : 'An unexpected error occurred.';
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: m.content || `Something went wrong: ${errorMessage}`,
                  isStreaming: false,
                }
              : m
          )
        );
      } finally {
        setIsLoading(false);
        setAgentActivity(null);
        abortControllerRef.current = null;
      }
    },
    [messages]
  );

  /**
   * Processes a parsed SSE event and updates state accordingly.
   */
  const handleSSEEvent = useCallback(
    (event: Record<string, unknown>, assistantId: string) => {
      switch (event.type) {
        case 'tool_call':
          setAgentActivity(
            describeToolCall(
              event.tool as string,
              (event.args as Record<string, unknown>) || {}
            )
          );
          break;

        case 'text':
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: m.content + (event.content as string) }
                : m
            )
          );
          break;

        case 'limit_reached':
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: m.content + (event.message as string) }
                : m
            )
          );
          break;

        case 'done':
          setAgentActivity(null);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    isStreaming: false,
                    filesCited: (event.files_cited as string[]) || undefined,
                  }
                : m
            )
          );
          break;

        case 'error':
          setAgentActivity(null);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    content:
                      m.content || (event.content as string) || 'An error occurred.',
                    isStreaming: false,
                  }
                : m
            )
          );
          break;
      }
    },
    []
  );

  const handleSuggestionClick = (question: string) => {
    handleSend(question);
  };

  const showWelcome = messages.length === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[998]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[700px] bg-[#3D3632] shadow-2xl z-[999] flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            >
              <span className="text-2xl text-[#FAF7F2] leading-none">
                &times;
              </span>
            </button>

            {/* Header */}
            <div className="bg-gradient-to-r from-[#C4785C] to-[#8B5A3C] text-white px-6 py-4 shrink-0">
              <h2 className="font-['Montserrat',sans-serif] font-semibold text-lg">
                Ask Me Anything
              </h2>
              <p className="font-['Montserrat',sans-serif] font-light text-xs mt-1 opacity-80">
                Agentic AI assistant
              </p>
            </div>

            {/* Messages area */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto px-4 py-4"
            >
              {showWelcome ? (
                <WelcomeScreen onQuestionClick={handleSuggestionClick} />
              ) : (
                <>
                  {messages.map((msg) => (
                    <ChatMessage
                      key={msg.id}
                      role={msg.role}
                      content={msg.content}
                      filesCited={msg.filesCited}
                      isStreaming={msg.isStreaming}
                    />
                  ))}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Agent activity indicator */}
            {agentActivity && (
              <div className="px-4 py-2 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A853] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4A853]" />
                  </span>
                  <p className="font-['Montserrat',sans-serif] text-[12px] text-[#D4A853] truncate">
                    {agentActivity}
                  </p>
                </div>
              </div>
            )}

            {/* Input */}
            <ChatInput onSend={handleSend} disabled={isLoading} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Welcome screen shown when no messages exist yet.
 * Displays a greeting and suggested question chips.
 */
function WelcomeScreen({
  onQuestionClick,
}: {
  onQuestionClick: (q: string) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      {/* Welcome icon */}
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C4785C] to-[#8B5A3C] flex items-center justify-center mb-5">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>

      <p className="font-['Montserrat',sans-serif] text-[15px] text-[#FAF7F2] text-center leading-relaxed max-w-[420px] mb-8">
        Hi! I'm Michael's AI career assistant. Ask me anything about his
        experience, leadership philosophy, or projects.
      </p>

      {/* Suggested question chips */}
      <div className="flex flex-col gap-2 w-full max-w-[420px]">
        {SUGGESTED_QUESTIONS.map((question) => (
          <button
            key={question}
            onClick={() => onQuestionClick(question)}
            className="text-left px-4 py-3 rounded-xl border border-[#FAF7F2]/15 bg-[#4A4440] hover:bg-[#555048] hover:border-[#FAF7F2]/25 transition-all font-['Montserrat',sans-serif] text-[13px] text-[#D4CFC8]"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
