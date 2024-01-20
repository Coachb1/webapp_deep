"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import copy from "clipboard-copy";

const CopyToClipboard = ({ textToCopy }: { textToCopy: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    setIsCopied(true);
    try {
      await copy(textToCopy);
      setIsCopied(true);
    } catch (error) {
      console.error("Copy failed:", error);
    }
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <>
      <Button
        variant={"secondary"}
        className="p-2 h-8 border border-gray-200"
        onClick={handleCopyClick}
      >
        {isCopied ? "Copied" : "Copy code"}
        <Copy className="h-4 w-4 ml-2" />
      </Button>
    </>
  );
};

export default CopyToClipboard;
