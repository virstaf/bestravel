// import { Button } from "@/components/ui/button";
// import { getFormattedDate } from "@/lib/getFormattedDate";
// import { getPostData, getSortedPostsData } from "@/lib/posts";
// import { ArrowLeft } from "lucide-react";
// import Link from "next/link";
// import React from "react";

// export const generateStaticParams = () => {
//   const posts = getSortedPostsData();

//   return posts.map((post) => ({
//     postId: post.id,
//   }));
// };

// export const generateMetadata = ({ params }) => {
//   const posts = getSortedPostsData();
//   const postId = params.postId;
//   const post = posts.find((p) => p.id === postId);
//   if (!post) {
//     return <div>Post not found</div>;
//   }
//   return {
//     title: post.title,
//     description: post.description,
//   };
// };

// const PostPage = async ({ params }) => {
//   const posts = getSortedPostsData();
//   const postId = params.postId;
//   const post = posts.find((p) => p.id === postId);
//   if (!post) {
//     return <div>Post not found</div>;
//   }

//   console.log("Post data:", post);

//   const { title, date, content } = await getPostData(postId);
//   const pubDate = getFormattedDate(date);
//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8">
//       <h1 className="text-3xl text-primary mb-0">{title}</h1>
//       <p className="text-gray-600 mb-2">{pubDate}</p>

//       <article className="">
//         <section
//           className="article text-gray-600 mb-6"
//           dangerouslySetInnerHTML={{ __html: content }}
//         />
//         <Button asChild>
//           <Link href="/blog" className="text-primary hover:underline">
//             <span>
//               <ArrowLeft />
//             </span>
//             Back to posts
//           </Link>
//         </Button>
//       </article>
//     </div>
//   );
// };

// export default PostPage;
