"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownDisplayProps {
  content: string;
}

const AdvMarkdownHandler: React.FC<MarkdownDisplayProps> = ({ content }) => {
 
  return (
    <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl">
      <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => (
        <h1 className="text-3xl font-bold my-4" {...props} />
        ),
    }}
      >{content}</ReactMarkdown>
    </div>
  );
};

export default AdvMarkdownHandler;
