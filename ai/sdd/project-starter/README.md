# project-starter — SDD 项目启动模板

> 从实战（Chrome 英文网页翻译插件，`md-wx-chrome-extensions`）中沉淀出的**文档先行（Spec-Driven Development）启动模板**。目标：让任何新业务需求都能像完成这个插件一样，先写清楚，再让 AI 可靠地实现。

## 核心心法（先记住这一条）

> **一件事情要经过两次创造**（《高效能人士的七个习惯》· 以终为始）：
> 第一次是**心智创造**——用文档把系统"是什么、怎么做、怎么一步步做"想清楚；
> 第二次是**物理创造**——让 AI 按文档把代码写出来。

Vibe Coding（直接让 AI 写）之所以返工，是因为**跳过了第一次创造**，把所有决策都抛给了上下文不足的 AI → AI 猜 → 幻觉 → 返工。
SDD 不消灭 vibe，只是把"决定先做出来"，用文档固化，作为 AI 的上下文。**文档即代码的上下文。**

## 模板目录

```
project-starter/
├── README.md                  # 本说明书：方法论 + 启动步骤
├── docs/
│   ├── proposal.md            # 需求文档（做什么、为什么做、不做什么）← 第一步
│   ├── design.md              # 技术架构（怎么做：选型/模块/目录/规范）← 第二步
│   ├── tasks.md               # 任务拆分（先做什么后做什么、含验收标准）← 第三步
│   └── layouts/
│       ├── 示意图-页面A.md      # 页面布局示意（界面长什么样，先画出来）
│       └── 实现步骤.md         # （可选）页面→模块→分阶段实现步骤
└── trae/
    └── rules/
        └── project_rules.md   # AI 项目规则（约束 AI 怎么配合你干活）
```

## 启动一个新业务的标准步骤

```powershell
# 1. 建目录 + git init（先有后悔药）
mkdir my-business ; cd my-business ; git init
# 2. 复制模板
copy /Y <本模板路径>\README.md .
xcopy <本模板路径>\docs docs /E /I /Y
xcopy <本模板路径>\trae trae /E /I /Y
```

然后按顺序填写/演进以下文档，**每完成一份就 git 提交一次**：

| 步骤 | 产出 | 核心问题 | 关键词 |
| --- | --- | --- | --- |
| 0 | `git init` | 先建版本控制，任何一步都能回退 | 后悔药 |
| 1 | `docs/proposal.md` | 做什么？不做什么？MVP 长什么样？ | **是什么 / MVP / 边界 / 例子** |
| 2 | `docs/design.md` | 用什么技术？难点怎么解？ | 选型对比 / 架构图 / 数据流 |
| 3 | `docs/layouts/` | 界面/交互长什么样？ | ASCII 草图先行 |
| 4 | `docs/tasks.md` | 先干什么？后干什么？什么能并行？ | 依赖图 + **每个任务带验收标准** |
| 5 | `trae/rules/project_rules.md` | AI 该守什么规矩？ | 单任务 / 验收 / 等确认 |
| 6 | 逐个执行 | 一次一个任务，完成即验证 + 提交 | 验收要点对照 |

## 与 AI 协作的三句关键指令（可复制）

在 project_rules.md 与 tasks.md 里写清楚后，向 AI 下达任务时使用固定句式：

1. **限定范围**：「请只执行 docs/tasks.md 中的任务 X：[名称]，不要超出范围。」
2. **限定步骤**：「一次只做一个任务，完成后对照验收标准自检并总结，等待我确认后再做下一个。」
3. **触发验收**：「请先阅读 docs/design.md、docs/layouts/示意图-xxx.md 再实现，保证与文档一致。」

> 核心思想：**节奏由你控制，不由 AI 控制。** 你负责定义、拆分、验收、回退；AI 负责快速执行。

## Git 使用要点（vibe coding 的后悔药）

- 每完成一个任务/一个文档阶段，立即 `git add -A && git commit`（Conventional Commits，如 `feat: 新增 xxx`）。
- 代码与文档同步提交，git 同时跟踪两份版本，保持一致性。
- 出错回退三板斧：
  - 未 add：`git restore .`（丢弃本次修改）
  - 已 add 未 commit：先 `git restore --staged .` 再 `git restore .`
  - 已 commit：`git reset --hard HEAD^`（回退到上一个提交）

## 新需求/迭代怎么加

1. 先改文档（proposal/design/tasks/layouts），**再改代码**。
2. 让 AI 以"新增一个小任务"的方式实现，而不是推翻重写。
3. 用 git diff 核对改动是否与文档一致。

## 参考实战（可回看成品长什么样）

- 完整参考工程：`../actions/md-wx-chrome-extensions/chorme-extension-en-translation/`
- 对应本模板的角色：
  - `docs/proposal.md` ↔ 需求文档
  - `docs/design.md` ↔ 技术架构设计
  - `docs/tasks.md` ↔ 任务拆分
  - `docs/layouts/示意图-侧边栏.md` ↔ 页面布局示意
  - `trae/rules/project_rules.md` ↔ AI 项目规则
