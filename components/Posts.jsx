import { getSortedPostsData } from "@/lib/posts";
import ListItem from "./ListItem";

const Posts = () => {
  const allPosts = getSortedPostsData();
  console.log("post::", allPosts);
  return (
    <section>
      <h2 className="text-center text-primary text-3xl font-bold mb-4">
        Blogs
      </h2>
      <ul className="w-full">
        {allPosts.map((post) => (
          <ListItem key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
};

export default Posts;
