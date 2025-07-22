import { getFormattedDate } from "@/lib/getFormattedDate";
import Link from "next/link";
import React from "react";

const ListItem = ({ post }) => {
  const { id, title, date } = post;
  const formattedDate = getFormattedDate(date);

  return (
    <li className="mb-4 text-xl">
      <Link href={`/posts/${id}`} className="text-primary hover:underline">
        {title ? title : "Untitled Post"}
      </Link>
      <p className="text-gray-600 text-sm"> - {formattedDate}</p>
    </li>
  );
};

export default ListItem;
