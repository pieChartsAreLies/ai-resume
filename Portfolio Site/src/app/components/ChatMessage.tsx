import React from 'react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  filesCited?: string[];
  isStreaming?: boolean;
}

/**
 * Parses simple markdown-like bold (**text**) into React elements.
 * Returns an array of strings and <strong> elements.
 */
function parseContent(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(<strong key={match.index}>{match[1]}</strong>);
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

/**
 * Formats a file path into a readable source name.
 * Strips .md extension and takes just the filename portion.
 */
function formatSourceName(filePath: string): string {
  const filename = filePath.split('/').pop() || filePath;
  return filename.replace(/\.md$/, '');
}

export function ChatMessage({ role, content, filesCited, isStreaming }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-[#C4785C] text-white rounded-br-md'
            : 'bg-[#4A4440] text-[#FAF7F2] rounded-bl-md'
        }`}
      >
        {/* Message content with line breaks preserved */}
        <div
          className="font-['Montserrat',sans-serif] text-[14px] leading-relaxed whitespace-pre-wrap break-words"
        >
          {parseContent(content)}
          {isStreaming && (
            <span className="inline-block w-[2px] h-[16px] bg-current ml-0.5 align-middle animate-pulse" />
          )}
        </div>

        {/* Files cited footer */}
        {filesCited && filesCited.length > 0 && !isStreaming && (
          <div className="mt-2 pt-2 border-t border-white/10">
            <p className="font-['Montserrat',sans-serif] text-[11px] opacity-50">
              Sources: {filesCited.map(formatSourceName).join(', ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
