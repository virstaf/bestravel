import Link from "next/link";
import React from "react";

const BlogPreview = ({ excerpt, id }) => {
  return (
    excerpt && (
      <div>
        {excerpt}
        <Link href={`/blogs/${id}`}>Read more</Link>
      </div>
    )
  );
};

export default BlogPreview;
