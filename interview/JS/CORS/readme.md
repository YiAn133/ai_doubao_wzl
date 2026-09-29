# 跨域

最开始是
- Nginx 反向代理
    - 前端项目 index.html nginx
    - 发出请求 /api
    - 然后转发
- vite 是通过修改vite.config配置文件 前端代码依旧写 `/api/xxx`，浏览器请求 `localhost:5173/api/xxx`；
Vite Node 服务**收到这个 http 请求，再帮它转发到真实后端地址**。



接下来介绍新的
Socket 适合实时通信，聊天，直播
当它来到web端 那么就有了webSocket

-  websocket：是一种全双工通信协议，浏览器和服务器之间只建立一次连接，之后双方可以随时互相发消息，不用每次都新建请求。
- 连接的时候， url  ws://localhost:8080/ws
    ws://localhost:8080/ws   分两步
    1. http://localhost:8080  http 连接服务器 Web Server 找到  只需要一次
    2. 101 status code switch protocol  切换协议， socket协议 
    基于http web server 的 socker 服务 双向通信建立了。 
    1XX 还在通信中，没有完成
    2XX 成功
    3XX 跳转
    4XX 用户错误
    5XX 服务器错误
  - 基于事件机制 双向通信


- 安装ws库：**Node.js 生态最标准、轻量的 WebSocket 实现库，用来在 Node 写 WebSocket 服务端 / Node 端 WebSocket 客户端；浏览器不能用 ws 库，浏览器用原生 `new WebSocket()`**npm>

- 前端连接服务器端 直接实例化webSocket 然后添加进服务器端的url就好


webSocket 协议可以跨域

http(s)协议：有跨域问题：不同域名，不同端口，不同协议，浏览器因安全问题，同源策略，拦截了跨域请求。
webSocket协议：不需要遵守同源策略 使用与常规的跨域解决

## webSocket 双工，为何不用llm的流式输出？
webSocket开销过大，也不是一直要相互交流