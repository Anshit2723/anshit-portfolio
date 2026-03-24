import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDirectory = path.join(process.cwd(), "content");

export interface ContentMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readingTime: string;
  image?: string;
}

function getContentFromDirectory(dir: string): ContentMeta[] {
  const fullPath = path.join(contentDirectory, dir);

  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const files = fs.readdirSync(fullPath).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const filePath = path.join(fullPath, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        slug: filename.replace(".mdx", ""),
        title: data.title || "",
        date: data.date || "",
        category: data.category || "",
        excerpt: data.excerpt || "",
        readingTime: readingTime(content).text,
        image: data.image || undefined,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPosts(): ContentMeta[] {
  return getContentFromDirectory("blog");
}

export function getProjectContent(): ContentMeta[] {
  return getContentFromDirectory("projects");
}

export function getContentBySlug(
  dir: string,
  slug: string
): { meta: ContentMeta; content: string } | null {
  const fullPath = path.join(contentDirectory, dir, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    meta: {
      slug,
      title: data.title || "",
      date: data.date || "",
      category: data.category || "",
      excerpt: data.excerpt || "",
      readingTime: readingTime(content).text,
      image: data.image || undefined,
    },
    content,
  };
}
