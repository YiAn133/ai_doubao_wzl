# 流式输出

- Agent 开发时代
    - Agent越来越像人，走向AGI
    - 那么如何将工作拆分，将AI擅长的交给Agent，我们审核，不擅长的我们接管
        - 项目工程初始化交给Agent
        1.没有必要从0开始写vue项目
        2.到github拉取一个模板项目

- 热更新hot reload
    开发阶段的利器 vite
    文件修改 -> 刷新页面 -> 丢失页面状态 -> 局部刷新

stream 返回就是二进制流
Unit8Array  8位无符号的比特位 0-255


## server 流式输出
### 后端返回的数据流
- 二进制文本流
- \n 换行符 区分每个数据（data: ）开头 并且1行结束
    兼顾响应速度和传输的效率
    llm 生成token 时 json短一点
    llm 再生成一些token，json格式化
    一次性发送多少个data：不确定的，1行也可能是2-3行
- data: {}里面的{}是json格式文本