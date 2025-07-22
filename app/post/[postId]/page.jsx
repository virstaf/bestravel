import { getFormattedDate } from "@/lib/getFormattedDate";
import { getPostData, getSortedPostsData } from "@/lib/posts";
import React from "react";

export const generateMetadata = ({ params }) => {
  const posts = getSortedPostsData();
  const postId = params.postId;
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return <div>Post not found</div>;
  }
  return {
    title: post.title,
    description: post.description,
  };
};

const PostPage = async ({ params }) => {
  const posts = getSortedPostsData();
  const postId = params.postId;
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return <div>Post not found</div>;
  }

  console.log("Post data:", post);

  const { title, date, content } = await getPostData(postId);
  const pubDate = getFormattedDate(date);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 mb-2">{pubDate}</p>
      <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default PostPage;
