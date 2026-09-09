# 路由
- restful 一切都是资源
- 前端路由负责，切换页面。
以前是要后端路由支持，但是慢，体验不好
用到了hashRouter
改变url的hash 部分不会刷新页面 触发hashchange事件

## React 集成前端路由
react 开发全家桶
- react 组件开发，响应等，实现UI界面
- react-router-dom 给应用添加路由 搭建SPA（单页应用）
    所有用到路由相关的组件，必须包在Router中
- zustand pinia 状态管理
hashRouter

a标签（不带路由的情况下）点击后跳转，在制作SPA的时候要二次处理
故而不直接用a标签，react-router-dom 提供了靠谱的Link组件
适合SPA 路由跳转的组件功能
Link底层也是渲染成a标签，只是阻止了页面跳转，只改变url的hash||hisory ，只切换前端组件

在制作SPA的时候，通过会创建pages文件夹，用来存放单个页面要显示的不同状态，这个状态如Home，里面如果要存css，也可以创建成文件夹存放css和jsx

- 路由懒加载（Route只加载当前页面的组件，其他的不加载）
    有lazy和Suspense包要导入

## 各种路由
- 基本配置
- 动态路由:useParams获取params，进行结构
- 路由懒加载
- 404 Not Found:   useNavigate//路由跳转
- 鉴权路由
    - http 无状态的
    - 如何表示有状态呢？
        - 请求头 token Authorization
        - Cookie 小饼干
        - localStorage 存储 login 状态
- 组件内部的子组件
    通过props.children 拿到组件声明的内部所有的子节点。

## 路由对象
    - SPA 需要前端路由，
    - url改变，对应不同的资源
    hash 路由 
    - navigator 导航栏
    - location 
    - replace
## 路由两种选型
- hashRouter
    让url局部改变 hash部分
    但是url有点为了前端路由，与后端路由不同，后端不会识别这个路由

- BrowserRouter 不用hash方案实现SPA，后端可以识别
    

