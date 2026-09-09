import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, posts, formatDate } from "@/lib/posts";

// 预先生成两篇文章的静态路径，构建时渲染为静态页面
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "文章不存在" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  // slug 不存在时渲染全局 404 页面
  if (!post) notFound();

  return (
    <div className="flex flex-1 justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col gap-8 bg-white px-8 py-20 dark:bg-black sm:px-16">
        <Link
          href="/blog"
          className="w-fit text-sm font-medium text-zinc-500 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          ← 返回博客列表
        </Link>

        <header className="flex flex-col gap-4">
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
          <h1 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl dark:text-zinc-50">
            {post.title}
          </h1>
          <p className="text-base leading-8 text-zinc-600 dark:text-zinc-400">
            {post.excerpt}
          </p>
        </header>

        <article className="flex flex-col gap-4 border-t border-black/[.08] pt-8 dark:border-white/[.145]">
          {post.content.map((paragraph, index) => (
            <p
              key={index}
              className="text-base leading-8 text-zinc-700 dark:text-zinc-300"
            >
              {paragraph}
            </p>
          ))}
        </article>
      </main>
    </div>
  );
}
