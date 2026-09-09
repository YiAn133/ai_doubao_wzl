# 受控组件 和 非受控组件
受控组件:由useState控制
非受控组件：由useRef控制

**发现一个小点：当对象中{
    key：value
}如果key是个变量如key = "usename"
在修改的时候要加[]
**

组件越来越多，会在Components中创建index.js 上导出所有组件（架构），把index.js作为出口组件
写的时候要注意index.js导出的时候用的是export
