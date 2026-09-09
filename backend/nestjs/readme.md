# nestjs
nestjs 就是node运行环境下 的纯后端企业级开发框架
默认是typescript，全面模块化思想，适合构建企业级服务
## 后端开发做些什么事情？
- 提供api 接口（web开发）
- 系统集成 ，并发 底层服务
- 微服务
## 安装
npm i -g @nestjs/cli

## 目录架构
- src
    main.js
    app.module.ts 模块
## 高度模块化
    APP -> Modules
            -> @nestjs/common Module类
                    -> import 依赖项
                    -> controller 控制器
                    -> service 服务
## 装饰器模式
不修改原有类代码，动态给对象增加额外功能。包装原有对象，在前后加逻辑。

## 开发流程
AppModule import 里面植入我们的Module
Module 是nest,js的独立业务模块
`@Param()`是 Nest 装饰器，用于提取 URL 路径参数，如`/todos/1`中的 id，注入到方法参数，获取的值为字符串类型。