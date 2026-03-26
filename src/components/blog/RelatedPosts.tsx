import Link from "next/link";
import { BlogPost, CATEGORIES } from "@/lib/blog";

export default function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-display font-semibold mb-8">Related Articles</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => {
          const cat = CATEGORIES[post.category];
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-surface rounded-xl border border-border hover:border-amber/30 transition-all p-6"
            >
              {cat && (
                <span className="text-xs font-mono uppercase tracking-wider text-amber">
                  {cat.label}
                </span>
              )}
              <h3 className="font-display font-semibold mt-2 mb-2 group-hover:text-amber transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-warm-gray text-sm line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-3 mt-4 text-xs text-warm-gray">
                <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
