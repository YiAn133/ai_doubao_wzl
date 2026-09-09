import 'dotenv/config'
import 'cheerio'
// 从url 加载文档
import{ 
    // loader 按url加载
    CheerioWebBaseLoader 
} from '@langchain/community/document_loaders/web/cheerio'

import{
    // 递归
    RecursiveCharacterTextSplitter
} from '@langchain/textsplitters'

import { 
  MemoryVectorStore 
} from '@langchain/classic/vectorstores/memory'
import {
  ChatOpenAI,
  OpenAIEmbeddings
} from '@langchain/openai';


const model = new ChatOpenAI({
  temperature: 0,
  model: process.env.MODEL_NAME,
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,

});

const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
  model: process.env.EMBEDDINGS_MODEL_NAME,
  baseURL: process.env.OPENAI_BASE_URL
});




// 爬取指定内容 + Document标准
const cheerioLoader = new CheerioWebBaseLoader(
    'https://juejin.cn/post/7660707431753678854',
    {
        selector:'.main-area p'
    }
);

// 这里得到的是巨大的Document 故而要细化
// 按照chunk 的大小 划分
const documents = await cheerioLoader.load();
// 切片
// 语义排第一
// 如果是按大小来切割。chunkSize 就够了
// 为了语义完整。可能不会完全按照chunkSize切割
// 可能会递归调用，看看当前切割的部分里面还能不能“？”  “!”切割,找到最优的分隔符，让每个chunk都有语义
// 不完美的地方，直接硬切 用chunkOverlap 来补救 重叠
const textsplitter = new RecursiveCharacterTextSplitter({
    chunkSize:400,//每个chunk   大小
    separators:["。","！","？"],
    chunkOverlap:100
})

// 向量数组
const splitDocuments = await textsplitter.splitDocuments(documents);
console.log(splitDocuments);

console.log(`文档分割完成， 共${splitDocuments.length}个chunks`);
console.log("创建向量存储");
// 创建内存存储
const vectorStore = await MemoryVectorStore.fromDocuments(
  splitDocuments,
  embeddings
);
console.log("向量存储完成");
const retriever = vectorStore.asRetriever({k: 3});

const question = "fs模块有哪些api";
console.log('='.repeat(80));
console.log(question);
console.log('='.repeat(80));
// 检索 相关文档
// invoke 执行 
// 内部逻辑， 将question 转为向量 
// 在向量数据库中计算距离 返回K 个Document对象
// 工作流编排
const docs = await retriever.invoke(question);
console.log(docs);
// 还想要打分 本来没有必要
// 向量的距离 越小就越相似
const scoredResults = 
  await vectorStore.similaritySearchWithScore(question, 3);
console.log(scoredResults);

console.log("\n [检索到的文档及相似度评分]");
docs.forEach((doc, i) => {
  const scoredResult = scoredResults.find(([scoredDoc]) => 
    scoredDoc.pageContent === doc.pageContent
  )
  // retriever 过滤， rerank 
  // 1- 值越大越相似，cosine 
  const score = scoredResult? scoredResult[1]: null;
  // 获得余弦距离
  const similarity = score != null ? (1 - score).toFixed(4):
  "N/A"

  console.log(`\n[文档 ${i + 1}] 相似度指标: ${similarity} (原始分: ${score})`);
  console.log(`内容: ${doc.pageContent.substring(0, 50)}...`); // 只打印前50字避免刷屏
  console.log(`元数据：章节=${doc.metadata.chapter}, 角色=${doc.metadata.character}, 类型=${doc.metadata.type}`);
});

// Augmented
const context = docs
  .map((doc, i) => `[片段${i}]\n ${doc.pageContent}`)
  .join("\n\n-----\n\n");

const prompt = `
你是一个文章辅助阅读助手，根据文章内容来解答：
文章内容:
${context}
问题：${question}
你的回答:`;

const response = await model.invoke(prompt);
console.log(response.content);