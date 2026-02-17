"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CodeBlock({ children, language }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const code = children?.props?.children || children;
    const textContent =
      typeof code === "string" ? code : code?.toString() || "";

    await navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      {/* Language Label */}
      {language && (
        <div className="absolute top-0 left-0 px-3 py-1 bg-muted/80 text-xs font-mono text-muted-foreground rounded-tl-lg rounded-br-lg border-r border-b border-border">
          {language}
        </div>
      )}

      {/* Copy Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopy}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        title="Copy code"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 mr-1" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 mr-1" />
            Copy
          </>
        )}
      </Button>

      {/* Code Content */}
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto border border-border">
        {children}
      </pre>
    </div>
  );
}
