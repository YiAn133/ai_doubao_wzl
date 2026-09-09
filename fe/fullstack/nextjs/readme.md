# 大前端手里的next.js
Next 是React全栈框架  Nuxt 是Vue 全栈框架   Nest 是后端框架。
NextJS 适合做全栈项目，可以写页面（前端） ， 也可以写API（后端）
很多AI产品用next.js 做官网
## SEO 搜索引擎优化（因为普通的vite react网站 在搜索引擎中得到的是空白网页，必须点进去后才能获得网页）
- 通过next.js优化可以让搜索引擎得到完整的网页
**SEO** 就是讨好搜索引擎，让别人搜得到你的网页**。


## 创造全栈项目
<!-- 创建next.js项目 @latest是装最新版 -->
npx create-next-app@latest
默认配置
react/react-dom react 界面
typescript
tailwindcss
eslint  代码风格规范

## CSR 和 SSR
组件到底在哪里渲染
CSR 是在Client 浏览器中渲染
SSR 是在Server 服务端

## next.js 语法
- APP Router
    next.js自带路由，不需要引入react‑router‑dom
    App Router：**文件即路由，不需要 react‑router‑dom**，靠文件夹和文件名决定路由地址

- next.js 默认是服务端组件，所有的内容不都是服务端得到的，只有html是在服务端得到，交互逻辑依然是浏览器中

-  App Router规则是：所创建的文件夹中必须有page.tsx

- 当我们有公用的地方 写在layout.tsx（布局文件）中

next.js 是给react 开发者的开箱即用的利器。
    渲染规则：

## SEO 的基本做法
第一层 title：你是谁？  做什么的？ description  有什么价值提供? Keywords(关键词)【HTML的head】
<title>
<meta name="description" content="这是一个描述">
<meta name="keywords" content="这是一个关键词">
第二层
做内容 用户来的原因（就是HTML的body）
第三层
ssr 服务器端渲染（那浏览器得到HTML）

# 全栈开发中api目录下的表示 后端接口，专门返回JSON数据的

## 客服端组件 CSR
next.js 将react server component 带到服务器端渲染，ssr开发模型。
把jsx -> html 完成seo

有些页面 强交互的
'use client'表示客户端渲染的
但是如果是静态文字等，会被服务器端渲染，其他的还是客户端渲染
