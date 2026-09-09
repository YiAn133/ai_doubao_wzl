# 路由 Routs
- 前端中navigator对象 去往下一页,上一页
- 浏览器 url
    - url 浏览器 访问代理
    - http 协议 向server 发起请求
    - server 伺服状态 给予响应 text/html
    - 浏览器渲染页面

## 链接
传统的，每次都要重新渲染，整个页面。PC时代
慢，没有必要重新渲染整个页面
移动时代，单页应用  SPA

传统的多页面 每次都要重新渲染 移动端时代没有必要

如何一个页面显示多个内容？
DOM编程（一个组件）
根据相应的url 去访问得到对应的html中的content DOM放到挂载点上

## 单页应用
- 点击链接跳转
    - url 和资源 一一对应关系
怎么改变url
hash方式可以做到
改变hash，url改变了，不会跳转

## Hash 路由
url：https://www.baidu.com/u/123?a=a&b=2#/page1
        protocol   host    path queryString  hash
url中，hash 部分 # 开始
- url 一定要变，不同的url对应不同的资源
- 监听变化，根据hash 部分渲染不同的内容
优点是url 改变了（局部），页面不会刷新。

锚链接
hash 作为url一部分，标记传统的PC长页面某一部分，坐电梯一样直达。
做前端路由 #/  #/about不会重新渲染，又能满足url和资源的一一对应关系，叫前端路由

当hash部分改变的时候  发生hashchange事件，我们可以进行dom或组件替换。

总结：前端路由hash 在#后面的就是hash，当hash改变的时候，会触发hashchange事件，如果浏览器中有这个id
那么浏览器会滑到那个id标签那里。如果没有hash对应的id，那么就是只是触发hashchange事件
