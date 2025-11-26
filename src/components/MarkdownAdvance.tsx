"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownDisplayProps {
  content: string;
}

const AdvMarkdownHandler: React.FC<MarkdownDisplayProps> = ({ content }) => {
  const fixedContent = content.replace(/\\n/g, "\n").trim();

  return (
    <div
      className="
        prose prose-zinc max-w-none dark:prose-invert
        prose-headings:font-semibold

        /* Compact Mode Tweaks */
        leading-7                   /* tighter line height */
        prose-p:my-2               /* smaller paragraph spacing */
        prose-p:leading-snug
        prose-li:leading-snug
        prose-ul:my-2 prose-ol:my-2
        prose-ul:list-disc prose-ul:pl-5
        prose-ol:list-decimal prose-ol:pl-5
      "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          /** TIGHT HEADINGS **/
          h1: ({ node, ...props }) => (
            <h1 className="text-xl font-bold mt-3 mb-2" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-lg font-semibold mt-2 mb-1" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-base font-semibold mt-1 mb-1" {...props} />
          ),

          /** TIGHT LISTS **/
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-5 space-y-1" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-5 space-y-1" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="leading-snug" {...props} />
          ),

          /** TIGHT SEPARATORS **/
          hr: () => (
            <hr className="my-3 border-zinc-300 dark:border-zinc-700" />
          ),

          /** TIGHT BLOCKQUOTE **/
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-zinc-400 dark:border-zinc-600 pl-3 italic my-3"
              {...props}
            />
          ),

          /** COMPACT INLINE + BLOCK CODE **/
          code: ({ node, ...props }) => {
            const isInline =
              node?.position?.start.line === node?.position?.end.line;

            return isInline ? (
              <code
                className="bg-zinc-200 dark:bg-zinc-800 px-1 rounded text-sm"
                {...props}
              />
            ) : (
              <pre className="bg-zinc-900 text-zinc-100 p-3 rounded-lg overflow-x-auto my-3 text-sm">
                <code {...props} />
              </pre>
            );
          },
        }}
      >
        {fixedContent}
      </ReactMarkdown>
    </div>
  );
};

export default AdvMarkdownHandler;
