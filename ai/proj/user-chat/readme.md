# user chat


## AI 全栈开发
- 前后端模块化分离
    - 前端在：fe 目录下
    - 后端在：backend目录下

### 前端三件套
    html：负责结构 标签
    css： 负责样式 头部引入
    css  用twitter库框架
    js：负责交互 


## 模块化 module
- 设计思想
    代码,功能都放在一个文件中 ,少数文件或目录下
    - 不好维护
    - 不好扩展
    - 不好优化
    每个文件夹都有职责划分
    每个文件都只做一个事情

## html 结构
- box 盒子的概念
    - 先写盒子
## css业务
- container
    中间内容宽度固定,左右留白
- row
- col

## prompt 思考
- 如果要页面好看,直接聊到bootstrap css框架
- 如果结构良好 搜索引擎良好 和它说语义化标签

## html
- **语义**化标签
默认两类标签
    - 块级元素 一般做盒子
        默认占据一行
    - 行级元素 装内容

- 不要div 满天飞
- 语义化标签 
div 用来做盒子    不能一直用div

例如：
table
    thead
        tr
            td*n
    tbody
        tr
            td*n

thead + tbody 非常重要,table语义很关键

## html 文档
- 都是文本类型
    text/plain 纯文本
    text/html html标签 使用 http 超文本传输协议 用browser解析的document
    <!DOCTYPE html> ！是 html 最新版本 html5 用来区别html4的


- dom编程
    DOM 是js的Document Node

    document.querySelector("选择器名称")

    .innerHTML方法是 动态修改DOM 的内容


## 大厂特别注重底层
    利用js DOM模块化编程 动态插入html
    js前端 准备好了document对象 是一个树状结构
    document.documentElement 根节点
    document.body 是页面
    利用document.querySelector 去查询 这个树得到对象 查看节点 孩子节点 兄弟节点 挂载节点


## 后端准备

- 输入npm init -y(npm:node package management)
    package.json **后端**项目描述文件
- 再输入npm i json-server
    可以把对象字面量 作为http server提供
