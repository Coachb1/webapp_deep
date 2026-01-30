import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownHandlerProps {
  content: string;
}

const NewAdvMarkdown: React.FC<MarkdownHandlerProps> = ({ content }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-transparent">
      <article className="prose prose-slate max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-xl font-bold mt-3 mb-2" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-lg font-semibold mt-2 mb-1" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-base font-semibold mt-1 mb-1" {...props} />
            ),
            // Handle Unordered Lists (ul)
            ul: ({ node, ...props }) => {
              const { ordered, ...rest } = props as any;
              // Reduced 'my-4' to 'my-1' and 'space-y-2' to 'space-y-0.5'
              return (
                <ul
                  className="list-disc pl-6 space-y-0.5 my-1 text-slate-700"
                  {...rest}
                />
              );
            },

            // Handle Ordered Lists (ol)
            ol: ({ node, ...props }) => {
              const { ordered, ...rest } = props as any;
              // Reduced 'my-4' to 'my-1' and 'space-y-2' to 'space-y-0.5'
              return (
                <ol
                  className="list-decimal pl-6 space-y-0.5 my-1 text-slate-700"
                  {...rest}
                />
              );
            },

            // Handle Individual List Items (li)
            li: ({ node, children, ...props }) => (
              // Removed 'leading-relaxed' (which adds line-height) for a tighter fit
              <li className="leading-tight marker:text-slate-400" {...props}>
                {children}
              </li>
            ),
            // Reuse your fixed blockquote from before
            blockquote: ({ children }) => (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 italic text-blue-900">
                {children}
              </div>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
};

export default NewAdvMarkdown;
