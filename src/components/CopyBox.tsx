"use client";

import React, { useState } from "react";

interface CopyBoxProps {
  content: string;
  className?: string;
}

const CopyBox: React.FC<CopyBoxProps> = ({
  content,
  className = 'top-3 right-3 text-gray-500 hover:text-gray-800 hover:bg-gray-200',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
      <button
        onClick={handleCopy}
        className={`${className} absolute  p-1 rounded transition`}
        title={copied ? "Copied!" : "Copy"}
      >
        {copied ? (
          // check icon
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          // copy icon
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
  );
};

export default CopyBox;
