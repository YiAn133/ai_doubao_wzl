# 全栈项目部署全流程
- 运维工程师
加分项
- vercel 云端部署
    - 比较固定 ：只能限定nextjs + supabase
    无法支持java ， go ， python
- 目标腾讯云 平台

# 部署的全流程
- nginx 用**宝塔**面板搭建生成环境
- 前后端分离项目
    - 前端： react + ts 产出
        组件
        npm run duild dist/ 静态资源文件
- 后端
    - /api接口 返回json
## 部署全流程
- 得花钱买服务器
- 买域名 还有备案
- 配置HTTPS 在http的基础上更安全 加上了SSL
- nginx
- 反向代理
    前后端通信 会出现跨域
    通过nginx 反向代理 就可以了

## 购买服务器
轻量云服务器
全量服务器linux 命令行成本有点高
宝塔
可视化的 ， 点击操作 ， 就可完成服务器部署


## 用户访问网站发送了什么？
1. Browser -> DNS查询 得到IP地址
    DNS 返回 服务器公网IP
    DNS 查询后会缓存到本地
        - browser
        - 局域网
        - 上网设备系统
        - 城域网
        - 根服务器
- 安全组 防火墙
    - 只限定访问几个IP地址
    - 尽量少开放端口
    80 http 默认端口
    443 https 默认端口
    3306 Mysql 端口 要可选择访问

- Nginx （分流）
- 静态资源
    react + ts打包的
    route，static route，返回静态资源
- 动态资源
    走服务器路由
Nginx做3个事情：
    接收请求，返回静态文件，或把请求转发给后端。

## 服务器准备
- 安装node项目 版本管理器
- html项目 安装nginx
- 安装Mysql
    - 建立 dev/production 俩个库