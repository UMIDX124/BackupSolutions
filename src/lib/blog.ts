import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";

const contentDirectory = path.join(/* turbopackIgnore: true */ process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  author: string;
  readTime: string;
  lastModified?: string;
  featured?: boolean;
  faqs?: { question: string; answer: string }[];
}

export interface BlogPostWithContent extends BlogPost {
  content: string;
}

export interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export const CATEGORIES: Record<string, { label: string; color: string }> = {
  "web-development": { label: "Web Development", color: "blue" },
  "software-engineering": { label: "Software Engineering", color: "green" },
  "ai-machine-learning": { label: "AI & Machine Learning", color: "purple" },
  "cloud-infrastructure": { label: "Cloud & Infrastructure", color: "orange" },
  "business-strategy": { label: "Business & Strategy", color: "amber" },
  "security-performance": { label: "Security & Performance", color: "red" },
};

export const AUTHORS: Record<
  string,
  {
    name: string;
    initials: string;
    title: string;
    bio: string;
    expertise: string[];
  }
> = {
  "m-faizan-rafiq": {
    name: "M Faizan Rafiq",
    initials: "MFR",
    title: "Co-Founder & CTO",
    bio: "Technologist with 8+ years building enterprise infrastructure. Specializes in cloud architecture, security, and performance optimization.",
    expertise: ["Cloud Architecture", "Security", "Performance", "DevOps"],
  },
  "faizan-ali-malik": {
    name: "Faizan Ali Malik",
    initials: "FAM",
    title: "Co-Founder & CEO",
    bio: "Software engineer and business strategist. Leads AI initiatives and client relationships at Backup Solutions.",
    expertise: [
      "AI/ML",
      "Software Design",
      "Business Strategy",
      "API Development",
    ],
  },
};

function getPostSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  return fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
}

function parsePost(slug: string): BlogPost | null {
  const realSlug = slug.replace(/\.(md|mdx)$/, "");
  const mdPath = path.join(contentDirectory, `${realSlug}.md`);
  const mdxPath = path.join(contentDirectory, `${realSlug}.mdx`);

  let fullPath: string;
  if (fs.existsSync(mdPath)) {
    fullPath = mdPath;
  } else if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath;
  } else {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug: realSlug,
    title: data.title ?? "",
    excerpt: data.excerpt ?? "",
    category: data.category ?? "",
    tags: data.tags ?? [],
    date: data.date ?? "",
    author: data.author ?? "",
    readTime: stats.text,
    lastModified: data.lastModified,
    featured: data.featured,
    faqs: data.faqs,
  };
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => parsePost(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPostWithContent | null> {
  const post = parsePost(slug);
  if (!post) return null;

  const mdPath = path.join(contentDirectory, `${slug}.md`);
  const mdxPath = path.join(contentDirectory, `${slug}.mdx`);

  let fullPath: string;
  if (fs.existsSync(mdPath)) {
    fullPath = mdPath;
  } else if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath;
  } else {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(fileContents);

  const result = await remark().use(html).process(content);

  return {
    ...post,
    content: result.toString(),
  };
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getRelatedPosts(
  slug: string,
  category: string,
  limit: number = 3
): BlogPost[] {
  return getAllPosts()
    .filter((post) => post.slug !== slug && post.category === category)
    .slice(0, limit);
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories);
}

export function generateTableOfContents(content: string): TOCItem[] {
  const headingRegex = /<h([23])\s*(?:id="([^"]*)")?\s*[^>]*>(.*?)<\/h[23]>/gi;
  const toc: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1], 10);
    const existingId = match[2];
    const title = match[3].replace(/<[^>]*>/g, "").trim();
    const id =
      existingId ||
      title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

    toc.push({ id, title, level });
  }

  return toc;
}
