# Docker
除了代码，依托一堆的，有版本要求的，运行环境，docker 帮我们打包成一个整体的容器，非常方便
的部署在任何设备上。

Agent = LLM + Harness(tool+mcp+rag+skill+...)
Docker = 应用 + 运行环境


## 举例
你到公司接收一个n年前的vue2 的项目 要求 node16 + npm 8
你的电脑装的是node 22 ， 跑不起来
需要docker 将各个依赖 隔离开来

## Docker 基本概念


## nginx 服务器
高并发，代理转发 需要nginx
比如 www.juejin.cn  我们通常不加端口，是因为不输入默认是：80端口，再通过nginx把请求从：80端口转接
到真正的端口上
Nginx 自己**占用 80 端口**，请求先完整到达 Nginx；Nginx 再新建一个内部请求，发给后端服务端口

## 启动 nginx image
    docker run 
    启动一个镜像，成为可运行的容器
    --name my-nginx-demo
    容器的名字
    -p 80:80
    第一个80是主机的监视端口 第二个是docker-nginx端口是80（任意端口，这里举例80）
    访问一个默认端口的时候，会映射到docker80端口中，再到docker中的nginx进行转接到别的端口上
    -v
    配置nginx.conf 文件，让80代理1314端口
    - d nginx
    后台运行nginx
## 运维考点
- nginx
    用户访问intent -> browser（正向代理）浏览器代替用户发送请求和接收
    反向代理：nginx：80 <- :1314（反向代理）