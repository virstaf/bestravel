"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

export function ShareButton({ title, className = "" }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <button
      className={`flex items-center gap-2 hover:text-white transition-colors ${className}`}
      onClick={handleShare}
    >
      <Share2 className="w-4 h-4" />
      <span>Share</span>
    </button>
  );
}

export function ShareArticleButton({ title }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <Button variant="outline" onClick={handleShare}>
      <Share2 className="w-4 h-4 mr-2" />
      Share Article
    </Button>
  );
}
