# 远程MCP

MCP本质还是tool，只不过还包了一层进程，可以通过stdio和http来访问。

## 应用场景
高德地图 Chrome DevTool FileSystem


有了MCP协议后，有个巨大的好处。
任何人都可以开发基于这个协议的MCP Server,然后可以直接复用。

- 高德MCP  可以做位置查询，路线规划等
    https://developer.amap.com/
- chromeDevTools    MCP 控制浏览器，打开关闭网页，点击元素，截图等。
- File  SytemMCP 读写文件，创建目录
