import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, CATEGORIES } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";

export const metadata: Metadata = {
  title: "Blog | Backup Solutions",
  description:
    "Insights, tutorials, and resources on web development, cloud infrastructure, AI, and software engineering from the Backup Solutions team.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category } = await searchParams;
  const activeCategory = typeof category === "string" ? category : undefined;

  const allPosts = getAllPosts();
  const posts = activeCategory
    ? allPosts.filter((post) => post.category === activeCategory)
    : allPosts;

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber via-amber/80 to-amber/60 bg-clip-text text-transparent mb-4">
            Insights &amp; Resources
          </h1>
          <p className="text-warm-gray text-lg max-w-2xl mx-auto">
            Expert perspectives on technology, engineering, and digital strategy
            from our team.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Link
            href="/blog"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !activeCategory
                ? "bg-amber text-black"
                : "bg-surface-secondary text-warm-gray hover:text-amber"
            }`}
          >
            All
          </Link>
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <Link
              key={key}
              href={`/blog?category=${key}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === key
                  ? "bg-amber text-black"
                  : "bg-surface-secondary text-warm-gray hover:text-amber"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-warm-gray text-lg">
              No posts found in this category yet.
            </p>
            <Link
              href="/blog"
              className="inline-block mt-4 text-amber hover:underline"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
