import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于 Next.js",
  description: "认识 Next.js：一个基于 React 的全栈 Web 开发框架。",
};

const features = [
  {
    title: "文件路由",
    description:
      "基于文件系统的路由约定，在 app 目录下用文件夹和 page.tsx 即可快速组织页面结构，无需额外配置路由表。",
  },
  {
    title: "服务端与客户端组件",
    description:
      "页面默认在服务端渲染，可按需标注 'use client' 切换到客户端组件，数据获取与交互逻辑清晰分层。",
  },
  {
    title: "内建性能优化",
    description:
      "自带预取与客户端过渡导航、静态预渲染、流式渲染等能力，默认实现较优的加载体验与核心 Web 指标。",
  },
  {
    title: "全栈能力",
    description:
      "通过 Route Handlers、Server Actions 等机制，可以在同一框架内处理后端逻辑与数据变更，简化全栈开发。",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-1 justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col gap-10 bg-white px-8 py-20 dark:bg-black sm:px-16">
        <header className="flex flex-col gap-4">
          <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
            About
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl dark:text-zinc-50">
            关于 Next.js
          </h1>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Next.js 是一个基于 React 的<b>全栈 Web 框架</b>，由 Vercel 团队维护。
            它把路由、数据获取、渲染策略与部署能力整合在一起，让开发者能更专注于业务本身，
            既能构建静态官网，也能承载复杂、高并发的动态应用。
          </p>
        </header>

        <section className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold tracking-tight text-black dark:text-zinc-50">
            为什么选择 Next.js
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="flex flex-col gap-2 rounded-2xl border border-solid border-black/[.08] p-5 dark:border-white/[.145]"
              >
                <h3 className="text-base font-semibold text-black dark:text-zinc-50">
                  {feature.title}
                </h3>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-black dark:text-zinc-50">
            版本与学习
          </h2>
          <p className="text-base leading-8 text-zinc-600 dark:text-zinc-400">
            本项目使用的是 Next.js 16 + React 19。想进一步了解框架能力，
            可以访问官方文档与学习中心：
          </p>
          <div className="flex flex-col gap-3 text-sm font-medium sm:flex-row">
            <a
              className="flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              官方文档
            </a>
            <a
              className="flex h-11 items-center justify-center rounded-full border border-solid border-black/[.08] px-6 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
              href="https://nextjs.org/learn"
              target="_blank"
              rel="noopener noreferrer"
            >
              学习中心
            </a>
            <a
              className="flex h-11 items-center justify-center rounded-full border border-solid border-black/[.08] px-6 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
              href="/"
            >
              返回首页
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
