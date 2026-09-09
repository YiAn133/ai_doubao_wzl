## SSE Server Sent Event 服务器发送事件
## BFF层
Backend For Frontend 作用是：为前端服务的后端
 

 Backend： 后端，由java/go/node 语言进行开发 MVC（后端的设计模式）

 js前端 后端 有很多需求，接口改一下。
 大前端工程师，自己写常见的node服务，来达成自身的需求，
前端（Vue/React） -> Node（BFF） -> 后端(java)
 ## 流式输出中
 前端业务非常复杂，如二进制流对象...解码...解析data...
 抽象一下，放到大前端BFF层，node里面，使得前端简洁，降低难度

 vite 创建的 vue 项目 有package.json，node_modules 文件夹
 vite 工程化 ， 是node 后端服务，方便的用于BFF开发一下。

 ## node 框架开发
 - 安装并引入后端开发框架 express
 - 实例app，并监听3000端口
 - 定义路由

 vue 前端可以通过 fetch 发送请求，访问bff路由


 ## 跨域问题
 - 只要域名,端口,协议（http/https）不同