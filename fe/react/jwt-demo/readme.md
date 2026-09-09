# jwt 登录鉴权
JSON Web Token
- Http 是无状态的 用户身份？ 你是谁？
- Header 中 Authorization

JSON 身份对象 -> 通过JWT组件生成 Token 颁发给登录者
登录者每次带上token -> authorization -> decode -> JSON对象

## zustand
轻量级的状态管理框架 react 全家桶 react + react-router-dom + zustand


## mockjs 大前端
- axios baseURL
- vite mockjs 插件


## JSONWebToken
sign verify俩个动作
sign 把用户的json对象

cookie/session 登录方案

## 拦截器:目的让每次请求都带上Authorzation
1. 后端签发的 token 放在 localStorage
2. axios 配置里添加一个interceptors
    - request
    每个axios 请求拦下来
    config 请求配置对象
    config.header['Authorzation']
    


