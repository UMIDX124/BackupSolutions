import Link from "next/link";
import { CATEGORIES, type BlogPost } from "@/lib/blog";

const CATEGORY_COLORS: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-400",
  green: "bg-green-500/10 text-green-400",
  purple: "bg-purple-500/10 text-purple-400",
  orange: "bg-orange-500/10 text-orange-400",
  amber: "bg-amber-500/10 text-amber-400",
  red: "bg-red-500/10 text-red-400",
};

function getCategoryBadgeClasses(category: string): string {
  const cat = CATEGORIES[category];
  if (!cat) return "bg-warm-gray/10 text-warm-gray";
  return CATEGORY_COLORS[cat.color] ?? "bg-warm-gray/10 text-warm-gray";
}

function getCategoryLabel(category: string): string {
  return CATEGORIES[category]?.label ?? category;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-surface rounded-xl overflow-hidden border border-border hover:border-amber/30 transition-colors"
    >
      <div className="p-6 flex flex-col gap-3">
        {/* Category Badge */}
        <span
          className={`inline-block w-fit text-xs font-medium px-3 py-1 rounded-full ${getCategoryBadgeClasses(post.category)}`}
        >
          {getCategoryLabel(post.category)}
        </span>

        {/* Title */}
        <h3 className="font-display text-lg font-semibold text-warm-white group-hover:text-amber transition-colors">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-warm-gray line-clamp-2">{post.excerpt}</p>

        {/* Footer */}
        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-border">
          <span className="text-xs text-warm-gray font-mono">
            {formatDate(post.date)}
          </span>
          <span className="text-xs text-warm-gray">&middot;</span>
          <span className="text-xs text-warm-gray font-mono">
            {post.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
