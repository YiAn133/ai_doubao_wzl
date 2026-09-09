export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  content: string[];
};

// 博客文章 mock 数据：详情页通过 slug 在此查找文章
export const posts: Post[] = [
  {
    slug: "app-router-guide",
    title: "快速上手 Next.js App Router",
    excerpt:
      "从零认识 App Router 的文件路由约定，理解 page、layout 与 not-found 等特殊文件如何协作，搭建你的第一个页面。",
    date: "2026-09-01",
    tags: ["Next.js", "入门"],
    content: [
      "App Router 是 Next.js 面向未来的路由方案，它用文件系统来定义路由：在 app 目录下新建文件夹，就能得到一个对应的 URL 路径。",
      "以 app/blog/page.tsx 为例，page.tsx 是这个路由的页面组件；app/layout.tsx 则是全局布局，会被所有子页面共享，用来放导航栏等公共 UI。",
      "当用户访问一个不存在的地址时，app/not-found.tsx 会负责渲染 404 页面。理解这几个特殊文件名（page、layout、not-found），就掌握了 App Router 的骨架。",
    ],
  },
  {
    slug: "server-client-components",
    title: "理解服务端组件与客户端组件",
    excerpt:
      "为什么默认是服务端组件？何时需要 'use client'？通过数据获取与交互需求的对比，理清两者的边界。",
    date: "2026-08-20",
    tags: ["React", "原理"],
    content: [
      "在 App Router 中，组件默认是服务端组件（Server Component）：它们在服务端运行，直接访问数据库或 API，渲染成 HTML 后发送给浏览器。这减少了客户端下载的 JavaScript 体积。",
      "只有当组件需要交互——比如 useState、事件监听、浏览器 API——才需要在文件顶部声明 'use client'，把它标记为客户端组件（Client Component）。",
      "一个常见的边界判断：数据获取尽量放在服务端组件里；交互逻辑放在客户端组件里。两者可以自由组合，父组件在服务端取数，把结果作为 props 传给子客户端组件。",
    ],
  },
];

// 格式化日期为中文显示
export function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

// 按 slug 查找文章，找不到返回 undefined
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
