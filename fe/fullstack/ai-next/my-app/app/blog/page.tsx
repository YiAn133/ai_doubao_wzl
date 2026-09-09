import Link from "next/link";
import type { Metadata } from "next";
import { posts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "博客",
  description: "关于 Next.js 与 Web 开发的文章列表。",
};

export default function BlogPage() {
  return (
    <div className="flex flex-1 justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col gap-10 bg-white px-8 py-20 dark:bg-black sm:px-16">
        <header className="flex flex-col gap-4">
          <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
            Blog
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl dark:text-zinc-50">
            博客
          </h1>
          <p className="text-base leading-8 text-zinc-600 dark:text-zinc-400">
            记录我在构建 Web 应用过程中的实践与思考。
          </p>
        </header>

        <section className="flex flex-col gap-4">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="flex flex-col gap-3 rounded-2xl border border-solid border-black/[.08] p-6 transition-colors hover:bg-black/[.02] dark:border-white/[.145] dark:hover:bg-white/[.03]">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {formatDate(post.date)}
                  </span>
                  <span className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-black/[.06] px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-white/[.08] dark:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                </div>
                <h2 className="text-lg font-semibold tracking-tight text-black dark:text-zinc-50">
                  {post.title}
                </h2>
                <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  {post.excerpt}
                </p>
              </article>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
