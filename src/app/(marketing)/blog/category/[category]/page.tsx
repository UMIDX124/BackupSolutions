import type { Metadata } from "next";
import Link from "next/link";
import { getPostsByCategory, CATEGORIES } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const categoryInfo = CATEGORIES[category];
  const label = categoryInfo?.label ?? category;

  return {
    title: `${label} | Blog | Backup Solutions`,
    description: `Browse our latest articles and insights about ${label.toLowerCase()}.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryInfo = CATEGORIES[category];
  const posts = getPostsByCategory(category);

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-warm-gray hover:text-amber transition-colors mb-8"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </Link>

        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber via-amber/80 to-amber/60 bg-clip-text text-transparent mb-4">
            {categoryInfo?.label ?? category}
          </h1>
          <p className="text-warm-gray text-lg max-w-2xl mx-auto">
            Browse our latest articles and insights about{" "}
            {(categoryInfo?.label ?? category).toLowerCase()}.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Link
            href="/blog"
            className="px-4 py-2 rounded-full text-sm font-medium bg-surface-secondary text-warm-gray hover:text-amber transition-colors"
          >
            All
          </Link>
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <Link
              key={key}
              href={`/blog/category/${key}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === key
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
