# Generative AI
英伟达证书

- apiKey 
    - gitignore + .env
- npm init -y
    在终端里输入
    作用：快速创建node项目
    结果：多出一个 package.json 文件(给项目进行说明的作用)
- npm i openai
    安装openai模块 

- 为什么进行这俩个操作？
    - npm init -y
        这个是给项目创建一个户口，必须先进性这个操作，才能安装各种插件
    - npm i openai
        这是给项目安装了插件，让你代码能连接llm
- 现在最新用pnpm 指令：npm install -g pnpm
- 为什么用？
    1.省磁盘（最关键）
        npm：每个项目单独复制一份依赖，10 个项目都装 openai，硬盘存 10 份文件，越装 C 盘越满。
        pnpm：同一个版本的包，全电脑只存 1 份在全局仓库，所有项目靠「快捷方式（链接）」引用，硬盘省 60%~80% 空间。
    ② 安装速度快 2~3 倍
        第一次下载包存全局，第二次再装同版本直接秒装，不用重新下载；npm 每次还要复制文件，慢很多。
    ③ 杜绝幽灵依赖（少 bug）
        npm 扁平化后：没在 package.json 写的包，代码也能直接引用，后续升级容易报错；
        pnpm 严格管控，只能导入你显式安装的包，项目稳定性更高。

- node_modules
    是第三方库，内存很大，不需要提交到gitee中
    如何不会提交到gitee中？
    新建项目 → 先建.gitignore 写 node_modules/ → 再 pnpm 安装依赖 → 再 git 提交。

-   .gitignore？
    用来告诉gitee 可以忽略的文件声明

- .env 的作用是什么？
用来单独放 API 密钥、私密配置，不再把 key 硬写在index.js里。
- 在提交到gitee的时候可能会泄露你的api，这个时候可以在.gitignore文件中写.env文件

dotenv库 可以读取根目录下的.env文件
    .env存的格式有要求
    KEY(大写) = value 
    把数据读取到process 进程对象中
    process 是进程的全局对象！！！
    .mjs和.js的区别是什么？
        .mjs后缀要求import引入

- nodemon
    监听文件变化，自动重启进程
    npm install -g nodemon
    modemon index.mjs
- async/await
    放在函数前面，让这个函数是异步的

    async = 我这个函数要等东西
    await = 等一下，拿到结果再往下走

## AIGC 工程化开发流程总结
-AI项目/Agent项目  几乎都是后端项目
- npm init -y 初始化为后端项目
- pnpm i openai/dotenv
- 实例化client
- main 单点入口函数
    - main.mjs 单点入口文件
    - main 单点入口函数
- 调用chat completion api
    - 异步代码  执行慢/等下执行
    - 如何控制异步代码的执行顺序？
        用async await   让代码的可读性更好，控制执行流程