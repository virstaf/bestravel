import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkStripHtml from "remark-strip-html";

const postDirectory = path.join(process.cwd(), "blogposts");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(id) {
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  return {
    id,
    ...matterResult.data,
    content: processedContent.toString(),
    excerpt: processedContent.toString().slice(0, 100),
  };
}

export async function getPostExcerpt(id, title) {
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  // Remove the title if it appears at the start of the content
  let content = matterResult.content;
  if (content.startsWith(`# ${title}\n`)) {
    content = content.replace(`# ${title}\n`, "");
  }

  // Process with remark to get plain text
  const processedContent = await remark()
    .use(remarkStripHtml) // Optional: if you want to remove any HTML tags
    .process(content);

  // Convert to plain text and get first 50 words
  const plainText = processedContent
    .toString()
    .replace(/\n/g, " ") // Replace newlines with spaces
    .replace(/\s+/g, " ") // Collapse multiple spaces
    .replace(/\*/g, " ") // Replace * with space
    .trim();

  const words = plainText.split(" ");
  const excerptWords = words.slice(0, 50);

  // Add ellipsis if we cut off the text
  const excerpt = excerptWords.join(" ") + (words.length > 50 ? "... " : "");

  return excerpt;
}
