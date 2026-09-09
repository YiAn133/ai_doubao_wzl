# 全栈项目：Todos
## 前后端职责和功能分离
- react + react-router + zustand（状态管理）
前端项目独立开发的三驾马车
    组件（响应式）+ 路由 + 状态管理

- 后端 node koa mysql

前端如何不用等后端的接口，先把界面写完 利用mockJS
但是我们之前学习过利用BFF层，专门服务于前端的后端
区别是：mockJS是拦截 网络请求，发送假数据
BFF层 是接收 网络请求，可以选择返回假数据，也可以选择 把网络请求发送给后端


- Context：把数据挂在组件树，靠组件层级传递共享，必须 Provider 包裹。
- Zustand：store 是**组件外部的全局对象**，组件直接 import 读取，不走组件树，不需要 Provider、不需要 Context。

### 对比

1. Context
要套 `<Provider>`，所有消费组件都可能重渲染。
2. Zustand
无 Provider，组件按需挑选状态，只有自己关心的数据变了才重渲染。

> 
> 注意：
> Zustand 干掉的是**用于全局状态共享的 Context**。
> 如果是组件树局部需要传 UI 配置等，Context 依旧可以用，两者不冲突。

一句话：**跨组件全局共享状态，Zustand 替代 Context+useReducer 那套方案**

## hashRouter 和 BrowserRouter 的区别
- **BrowserRouter**：history 模式，无 #，需要后端配合，正式项目常用。
- **HashRouter**：hash 模式，带 #，不用后端配置，静态部署省事。
都是react-router-dom中的


## 前端接口
前端可以独立路由
前端也可以独立做数据接口（mock ， 开发阶段）

/api 目录 所有的前端接口统一管理
- axios 标准请求库
    fetch/xhr App应用升级到axios

## 当前我们没有写 /api/todos  
- 但是没有报错，因为走的是/ 即首页
- 如今我们需要在前端里面 写这个 营造虚假数据

## mockjs
1. 安装依赖pnpm i -D vite-plugin-mocPS
2. 修改vite.config.js
3. 在根目录下写mock目录
4. 在mock 中写 你的返回消息，规定是默认导出数组[]

## 流程
前端需要数组状态， 由数据接口提供， 不能直接走后端数据接口，前后端分离，步调不一致。 前端也需要独立完备真个应用开发工程系统，纳入了前端接口工程

api/ 目录 配置 axios baseURL /api 前端一类路由是页面级别路由 pages/。。。。 现在还有前端接口路由 /api 不是react-router-dom 处理的范围

mockjs vite 配置 mock 目录 export default [ { mockjs url: '/api/todos', method: 'get|post', response:} ]

开始 /todos 页面 响应式的状态 todos 接口 url http://localhost:5173/api/todos http://localhost:3000/todos axios baseURL