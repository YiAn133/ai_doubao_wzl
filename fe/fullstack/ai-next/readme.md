# Next.js + AI

基于React 的全栈开发框架，最好的AI全栈框架，为全栈开发叠加了上下文bueff。

## 什么是框架？
不需要从0开始盖房子。
而是提供了地基，墙壁和房屋的一个基本架构。
以前是为开发者所有，现在AI也可以用。
我们只需要关注组装和装修这个房子，关注业务。

# React
返回jsx的函数  响应式状态
把开发者从低级的前端API 命令式流水线编程，
通过现代前端库React/Vue MVVM，直接写业务就好。

## Next.js 基于React的最好的面向AI的全栈框架
AI 上下文 = 组件 + 响应式业务 + 服务器端渲染 + api

- 图片放在哪里？ /public
- 页面文件放在哪里  /app
- 组件放在哪里？ /components

使用框架  提供了一系列的约束最近实践，和AI SDD 文档上下文不谋而合。

开发效率大大提高，常见功能内置好，文件放在哪里，请求方法放哪里？
框架提供基础结构，开发者专注于**业务**逻辑。AI FDE harness 落地。
使用框架，也给AI一套约束，一套上下文。AI能够更高效的基于约束开发。

## 为什么选择next.JS
- 传统的前后端全栈开发 react + Java/Python 两种语言，上下文切换成本

- claude code/codex 支持最好 约束， 简化（csr, ssr）开箱即用
- 生态超级丰富
- shadcn/ui 组件库 ElementUI ANTD ... vibe coding 写组件，引入组件
- tailwindcss 原子类名 自带语义， 特别适合ai 学习 AI 语义理解能力
- vercel 公司 全球唯一一家JS栈  AI coding Agent 以及AI生态的技术公司 快捷发布 域名二级， 绑定域名。

## 创建项目


3. Link组件
- 它是客服端导航，无需刷新页面。（前端路由）
Hash，HistoryRouter 局部刷新
还是要请求后端的，只是不整页刷新（白一下）。
前端导航时，next.js 会自动发一个RSC payload（React Server Component序列化），数据是后端拿的，只是走Ajax请求，不是浏览器传统的导航

总结：就是说next.js中的Link跳转，地址栏变、页面不整页刷新，但仍要请求后端拿 RSC 组件数据，不是纯前端本地路由。


# 预加载可能链接的页面，提升速度
- `link rel="prefetch"` 是浏览器原生，
- 空闲时提前下载资源缓存，提升后续打开速度；Next Link 的预加载是框架自己实现，拉取 RSC payload。






- **重要**前端路由分 hash 和 history 两种。hash 带 #，# 后内容不传给服务端，刷新不会 404；history 无 #，刷新会向服务端请求该路径，需要 Nginx 配置，找不到文件时返回 index.html，让前端 JS 接管路由。