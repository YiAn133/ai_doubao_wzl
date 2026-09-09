# Benchmark

benchmark 是用标准题目给大模型打分的体系。

每次一个新的模型发布，宣传页都有一堆数字。

- MMLU
- GPQA
- HumanEval

benchmark 是llm 在一些测试中得分集合

## 基准测试

- 为什么需要benchmark？
大模型太多了，需要一个客观标准，benchamark就是这个标准。
llm 的能力是多维的
- MMLU 综合知识
57个学科 领域选择题，从初中历史到大学医学，
- GPQA  顶级推理能力
专门出研究生级别的物理，化学，生物难题。
考的是，模型是不是真正能推理，还是背答案
- HumanEval 代码能力
让它去修真实的gitHub项目的bug
- MATH/AIME 数学推理
竞赛级别的数学题
- C-Eval 中文能力
专门针对中文语境

- 厂商怎么用benchmark？
每次模型发布，拿一堆benchamark来说自己很强。

## benchmark的作用
是一个门槛，不是排名
一个模型连benchamark 都差，大概率能力也差。
但是分数高，也不一定好用。

要看具体业务，以及使用的实际效果。

## 总结
Benchmark 是用标准题给大模型打分的体系，

