# Git 开发必备技能


- ysw_ai 目录是什么？
项目开发目录

git的作用?
- gitee/gitHub/gitlab 中央仓库,可以分享共享仓库的代码(remote)
- 团队共享仓库代码
- 分布式 distribute
- 当文件损坏的时候 可以找到 版本迭代之后的文档
- 一个文件 不同版本 即 专业名词:快照
- 可以工程化


## git init
- 初始化
- 本地的代码项目目录升级为带有版本控制能力的代码仓库
- 目录下多了一个.git的文件夹(隐藏)
- 如何去查看   一.通过在文件夹中找到隐藏项目  二.Windows通过打开git bash 拿到最简版Linux 
- 输入ls -all


## git add 文件名
- 将readme.md 添加进入暂存区

## git status
任何你需要清楚当前仓库的状态的时候
任何关键时刻先git status
这个指令会告诉你哪些文件被修改了，哪些还没有被git追踪


2 insertions 2行新增

## git commit -m "desc"
-m 后面表示这次提交的说明,方便查看
最终添加进入仓库中


## 为什么要用两行指令把文件添加到仓库？
    - 完成某项功能 可以把index.html common.css common.js等全部先git add 放到暂存区 不会带来仓库的改变   
    - 最后项目结束了 一个git commit 一齐提交


## 文件状态
- untracted 未跟踪状态
- to be commit 待提交


- add a repo 远程仓库