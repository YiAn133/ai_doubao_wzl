import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center gap-8 px-8 py-20 text-center">
        <p className="font-mono text-7xl font-semibold tracking-tight text-black/10 sm:text-9xl dark:text-white/10">
          404
        </p>
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            页面不存在
          </h1>
          <p className="max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">
            你访问的页面可能已被移除、改名或暂时不可用。
            可以返回首页，或者检查一下地址是否正确。
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm font-medium sm:flex-row">
          <Link
            href="/"
            className="flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            返回首页
          </Link>
          <Link
            href="/about"
            className="flex h-11 items-center justify-center rounded-full border border-solid border-black/[.08] px-6 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
          >
            关于 Next.js
          </Link>
        </div>
      </main>
    </div>
  );
}
