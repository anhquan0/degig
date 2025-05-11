import { CircleCheck, Copy } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/utils";

async function copyToClipboard(textToCopy: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(textToCopy);
  } else {
    // Use the 'out of viewport hidden text area' trick
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;

    // Move textarea out of the viewport so it's not visible
    textArea.style.position = "absolute";
    textArea.style.left = "-999999px";

    document.body.prepend(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
    } catch (e) {
      console.error(e);
    } finally {
      textArea.remove();
    }
  }
}
export default function CopyButton({ content, className = "" }: { content: string; className?: string }) {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = async () => {
    await copyToClipboard(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 500);
  };
  return (
    <Button variant="ghost" size="icon" onClick={handleCopy} className={cn(className, "")}>
      {copied ? <CircleCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  );
}
