import { getFormattedDate } from "@/lib/getFormattedDate";
import Link from "next/link";
import React from "react";
import BlogPreview from "./BlogPreview";
import { getPostExcerpt } from "@/lib/posts";

const ListItem = async ({ post }) => {
  const { id, title, date } = post;
  const formattedDate = getFormattedDate(date);
  const excerpt = await getPostExcerpt(id, title);

  // console.log("excerpt:::", excerpt);

  return (
    <li className="mb-4 text-xl">
      <Link href={`/blogs/${id}`} className="text-primary hover:underline">
        {title ? title.split(":")[1] : "Untitled Post"}
      </Link>
      <BlogPreview excerpt={excerpt} id={id} />
      <p className="text-gray-600 text-sm"> - {formattedDate}</p>
    </li>
  );
};

export default ListItem;
