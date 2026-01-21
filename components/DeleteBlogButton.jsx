"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteBlogPost } from "@/app/actions/blogActions";
import { useState } from "react";

export function DeleteBlogButton({ postId, postTitle }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${postTitle}"?`)) {
      return;
    }

    setIsDeleting(true);
    const { error } = await deleteBlogPost(postId);

    if (error) {
      alert(`Error deleting post: ${error}`);
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      <Trash2 className="w-4 h-4 text-destructive" />
    </Button>
  );
}
