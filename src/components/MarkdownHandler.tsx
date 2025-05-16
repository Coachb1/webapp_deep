import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  markdown: string;
}

const preprocessMarkdown = (raw: string): string => {
  // Add a newline before each asterisk that starts a list item
  // but ignore the first one (so it doesn’t start with a blank line)
  return raw
    .replace(/(\*\s+)/g, '\n$1') // insert newline before each asterisk-bullet

    .replace(/^\*\s+/, '* ') // clean first `*`
    .replace(/\*\s{2,}/g, '\n* ') // replace multiple spaces after * with newline + proper format
    .trim(); // clean leading/trailing whitespace
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  const formatted = preprocessMarkdown(markdown);

  return (
    <div className="prose max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {formatted}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;


const cleanAndSplitText = (text: string): string[] => {
    return text
      .replace(/[*\-`]/g, '') // Remove *, -, `
      .split(/(?<=[.?!])\s+(?=[A-Z])/g) // Split on sentence boundaries before capital letter
      .map(s => s.trim())
      .filter(Boolean);
  };
  

const BulletList = (rawText:string) => {
  const items = cleanAndSplitText(rawText);


  return (
    <ul className="list-disc pl-6 space-y-2">
      {items.map((item, index) => (
        <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
      ))}
    </ul>
  );
};

export { BulletList };

