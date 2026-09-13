#1. 选一个基础镜像
FROM node
#2.在容器里切到app目录下
WORKDIR /app
#3.把本地代码复制到容器中
COPY index.js .

CMD ["node" , "index.js"]