"use client";

import { useState } from "react";
import copy from "copy-to-clipboard";

export default function CopyButton({ text, className = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copy(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`text-xs px-2 py-1 rounded font-medium transition-colors ${
        copied
          ? "bg-green-600/20 text-green-400"
          : "bg-gray-800 hover:bg-gray-700 text-gray-300"
      } ${className}`}
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}
