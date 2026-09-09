# Next.js Blog
## 技术背景
- npx
    npx是npm自带的工具，可以直接运行 node 包，无需全局安装依赖。
    如：npx vite 如果本地没有安装create‑react‑app，会在网上下载简单的，直接跑，后面会自己删除
-  项目里已经配置好脚本，就用 `npm run xxx`；
-  临时想用某个工具、没安装没配置脚本，就用 `npx`。

- create-next-app
React 全栈开发脚手架
SSR（服务器端渲染） SEO（搜索引擎优化） RSC（组件在服务器端渲染）

## 项目需求
目的：笔记系统 CRUD笔记，支持markdown格式。
存在数据库中是markdown，页面显示的是html

1. 界面分为两列 左侧为笔记列表 右侧为笔记内容
2. 点击new 增加一个Note 增加后，左侧笔记列表会同时更新
3. 编辑功能 可以删除一个笔记，左侧同时更新
4. 可以编辑当前的Note 支持markdown
5. 搜索功能

## 技术分析
### 路由
### 组件
需要提前规划需要哪些组件
 组件是工作单元， AI 生成的工作单元
  开发之前不要急的写代码
  分析需求， 技术方案（next.js） 任务细节 路由 + 组件
  Sidebar
    SidebarSearchField EditButton(复用)
    SidebarNoteList
      NoteItem
  Note
    NoteEditor 编辑
    NotePreview 负责笔记的预览界面
### 目录结构

- app 
  页面主目录
  page.js
  layout.js
  [id]
- components 组件
- lib
  数据库操作
  常用的函数
- public 
  静态资源 static server
  如果想在note/[id] 中导入lib中的redis.js？
  - 首先要配置路径在jsconfig中
  paths 就是让你不用写长长的 `../../` 相对路径，用`@/`开头直接定位目录。
   "@/components/*":["components/*"],
    "@/lib/*":["lib/*"]
  1. 相对路径../../../lib/redis.js
  2. 短链接@lib/redis


- layout
   - html 
    head
      title
      meta  keywords description
    body
      page.js 
  - nav 侧边栏， 导航栏
  - section 语义化标签
  - children page.js
  - to be continue  注释大法
    规划未来做的， 有利于团队协作， 记忆， 维护， 注释写好要做的事情

## 数据服务
- redis： 就是高速小数据库，主要用来做缓存、存会话，速度比普通数据库快很多
- lib 目录下redis.js
  next.js 数据业务 逻辑放在lib目录下
- /app/api/route.js
  接口调用 远程调用的

- 注意：redis存的值分俩个string 和 hash
  如果是string 那么直接存
  如果是对象并且方法是set 那么你要进行JSON.string 变成json字符串再进行存放
  如果是对象并且方式hset，那么直接存 就好了
  总结：set存的是字符串 hset存的对象
  存放分俩个方式一个set 和 hset 前者存放后不能修改value（对象）中局部的值 后者可以修改
  - 存的时候用 `hset` → 读必须 `hgetall`
  - 存的时候用 `set` → 读必须 `get`