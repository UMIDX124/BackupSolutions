import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  generateTableOfContents,
  AUTHORS,
  CATEGORIES,
} from "@/lib/blog";
import AuthorBox from "@/components/blog/AuthorBox";
import BlogCard from "@/components/blog/BlogCard";
import TableOfContents from "@/components/blog/TableOfContents";

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

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found | Backup Solutions" };
  }

  return {
    title: `${post.title} | Backup Solutions Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.lastModified,
      authors: [AUTHORS[post.author]?.name ?? post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const toc = generateTableOfContents(post.content);
  const relatedPosts = getRelatedPosts(post.slug, post.category, 3);
  const author = AUTHORS[post.author];
  const categoryInfo = CATEGORIES[post.category];

  return (
    <article className="py-24 px-6">
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

        {/* Header */}
        <header className="mb-12 max-w-3xl">
          {categoryInfo && (
            <span
              className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-4 ${getCategoryBadgeClasses(post.category)}`}
            >
              {categoryInfo.label}
            </span>
          )}

          <div className="flex items-center gap-3 text-sm text-warm-gray mb-4">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>&middot;</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-warm-white mb-6">
            {post.title}
          </h1>

          {author && (
            <div className="flex items-center gap-3">
              <div className="bg-amber/10 text-amber w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm">
                {author.initials}
              </div>
              <div>
                <p className="text-warm-white text-sm font-medium">
                  {author.name}
                </p>
                <p className="text-warm-gray text-xs">{author.title}</p>
              </div>
            </div>
          )}
        </header>

        {/* Two-Column Layout */}
        <div className="flex gap-12">
          {/* Main Content */}
          <div className="w-full lg:w-8/12">
            <div
              className="prose prose-invert prose-amber max-w-none prose-headings:font-display prose-headings:text-warm-white prose-p:text-warm-gray prose-a:text-amber prose-strong:text-warm-white prose-li:text-warm-gray prose-code:text-amber prose-pre:bg-surface-secondary prose-pre:border prose-pre:border-border"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* FAQs Accordion */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="mt-16">
                <h2 className="font-display text-2xl font-bold text-warm-white mb-8">
                  Frequently Asked Questions
                </h2>
                <div className="flex flex-col gap-4">
                  {post.faqs.map((faq, index) => (
                    <details
                      key={index}
                      className="group bg-surface rounded-xl border border-border overflow-hidden"
                    >
                      <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-warm-white font-medium hover:text-amber transition-colors">
                        {faq.question}
                        <svg
                          className="w-5 h-5 text-warm-gray group-open:rotate-180 transition-transform shrink-0 ml-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </summary>
                      <div className="px-6 pb-4 text-warm-gray text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>

                {/* FAQ JSON-LD Schema */}
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "FAQPage",
                      mainEntity: post.faqs.map((faq) => ({
                        "@type": "Question",
                        name: faq.question,
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: faq.answer,
                        },
                      })),
                    }),
                  }}
                />
              </section>
            )}

            {/* Author Box */}
            <div className="mt-16">
              <AuthorBox authorId={post.author} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block lg:w-4/12">
            <TableOfContents toc={toc} />
          </aside>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-24 border-t border-border pt-16">
            <h2 className="font-display text-2xl font-bold text-warm-white mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <BlogCard key={related.slug} post={related} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
