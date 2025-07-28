import { getSortedPostsData } from "@/lib/posts";
import ListItem from "./ListItem";
import Image from "next/image";

const Posts = () => {
  const allPosts = getSortedPostsData();
  // console.log("post::", allPosts);
  return (
    <section className="">
      <div className="relative h-[300px] flex items-center justify-center mb-8 rounded-2xl overflow-hidden">
        <h2 className="text-center text-primary rounded py-2 px-4 backdrop-blur text-3xl font-bold mb-4 z-10">
          Blogs
        </h2>
        <div className="absolute inset-x-0 bottom-0 top-0 bg-gray-200">
          <Image
            src="/images/desk_passport.jpg"
            alt="Blog Background"
            // width={3372}
            // height={3468}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="article">
        <ul className="w-full">
          {allPosts.map((post) => (
            <ListItem key={post.id} post={post} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Posts;
