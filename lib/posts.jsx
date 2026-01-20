import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkStripHtml from "remark-strip-html";
import {
  calculateReadingTime,
  extractCategory,
  getFeaturedImage,
} from "./blogUtils";

const postDirectory = path.join(process.cwd(), "blogposts");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    // Calculate additional metadata
    const readingTime = calculateReadingTime(matterResult.content);
    const category =
      matterResult.data.category || extractCategory(id, matterResult.content);
    const featuredImage =
      matterResult.data.featuredImage || getFeaturedImage(id);

    return {
      id,
      ...matterResult.data,
      readingTime,
      category,
      featuredImage,
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

  // Strip all Markdown syntax
  let plainText = content
    // Remove HTML comments (including <!--# -->)
    .replace(/<!--[\s\S]*?-->/g, "")
    // Remove headers (##, ###, etc.)
    .replace(/^#{1,6}\s+/gm, "")
    // Remove horizontal rules
    .replace(/^[-*_]{3,}$/gm, "")
    // Remove bold/italic (**text**, *text*, __text__, _text_)
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    // Remove links [text](url)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Remove images ![alt](url)
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")
    // Remove inline code `code`
    .replace(/`([^`]+)`/g, "$1")
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, "")
    // Remove blockquotes
    .replace(/^>\s+/gm, "")
    // Remove list markers (-, *, +, 1.)
    .replace(/^[\s]*[-*+]\s+/gm, "")
    .replace(/^[\s]*\d+\.\s+/gm, "")
    // Remove emojis and special characters
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, "")
    .replace(/[✅✈️🌟🧭💼🎉🔸😌👥🤝🌍📋💬📧📞]/g, "")
    // Remove checkboxes
    .replace(/\[[ x]\]/gi, "")
    // Replace newlines with spaces
    .replace(/\n/g, " ")
    // Collapse multiple spaces
    .replace(/\s+/g, " ")
    .trim();

  const words = plainText.split(" ").filter((word) => word.length > 0);
  const excerptWords = words.slice(0, 40);

  // Add ellipsis if we cut off the text
  const excerpt = excerptWords.join(" ") + (words.length > 40 ? "..." : "");

  return excerpt;
}
