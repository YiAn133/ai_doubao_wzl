import { ChatPromptTemplate } from '@langchain/core/prompts';
// 在一个AI系统里， 最核心就是几个prompt 模块
import * as z from 'zod';


// 这个类主要实现的功能是：
// 1.把用户问题进行多角度拆解,分成3个问题，并且进行返回

// 定义增强的问题结构
export const QueryAugmentSchema = z.object({
  queries:z
    .array(z.string())
    .length(3)
    .describe('恰好3条中文检索问句：不同角度改写或扩写;保留订单号、品牌等字面信息;不要编造事实'),
})
//定义大模型的基础说明：
// 两种定义大模型的基础说明的方法；第一种是大模型使用的 用消息数组定义System
//第二种就是用langchain 包装的方法ChatPromptTemplate.fromMessages它会生成一个消息数组
//我们常用的是第一种，但是这里modle是外部传进来的，我们习惯一个llm，如果system不同，我们就用ChatPromptTemplate.fromMessages来定义
//这个方法其实就是组装message消息数组
const AUGMENT_PROMPT = ChatPromptTemplate.fromMessages([
  [
    "system",
    `用户会给出一句中文问题。请另外写出恰好3条检索用的问句（与原意一致，角度尽量不同）
     便于搜索引擎或向量库分别召回：
     可改写说法、换提问角度、或略加限定词；专有名词、型号、订单号等必须保留原样。
     只输出结构化字段 queries(长度为3的字符串数组)
    `
  ],
  ["human", "{query}"]
]);
                                                               
function normalizeThreeQueries(original, list) {
  const out = (list ?? [])
    .map((s) => (typeof s === "string")?s.trim():"")
    .filter(Boolean)
  while(out.length < 3) out.push(original)
  return out.slice(0, 3)

}

export async function augmentQuery(chatModel, query) {
  // queries [] : 3
  const structured = chatModel.withStructuredOutput(QueryAugmentSchema);
  const chain = AUGMENT_PROMPT.pipe(structured); // 工作节点的编排
  try {
    const raw = await chain.invoke({query});
    return { queries: normalizeThreeQueries(query, raw.queries) }
  } catch(error) {
    return { queries: normalizeThreeQueries(query, [])}
  }
}

export function retrievalQueryString(original, augmentation) {
  return [original, ...(augmentation.queries ?? [])]
    .map(s => typeof s === "string"?s.trim():"")
    .filter(Boolean)
}