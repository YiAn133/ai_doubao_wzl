import "dotenv/config"

import {ChatOpenAI , OpenAIEmbeddings} from '@langchain/openai'

import{Annotation , END , START , StateGraph} from '@langchain/langgraph'

import {Milvus} from '@langchain/community/vectorstores/milvus'

const COLLECTION_NAME = "ebook_collection"

const TOP_K = 5;

const GraphState = Annotation.Root({
    question:Annotation,
    k:Annotation,
    document:Annotation,
    generation:Annotation
})

const model = new ChatOpenAI({
    model:process.env.MODEL_NAME,
    baseUrl:process.env.OPENAI_BASE_URL,
    akiKey:process.env.OPENAI_API_KEY,
    temperature:0
})

const embeddings = new  OpenAIEmbeddings({
    model:"text-embedding-v3",
    dimensions:1024
})

let vectorStore;

// 调用向量数据库进行查找 得到相关问题的上下文
async function retrieve(state){
    const question = state.question;
    const k = state.k;

    const document = await retrieveRelevantContent(state.question , k);

    return {
        question:question,
        k:k,
        document:document,
    }
}

async function retrieveRelevantContent(question,k = TOP_K){
    try {
        const docsWithScores = await vectorStore.similaritySearchWithScore(question, k);
        // 这里得到的是数组
        return docsWithScores.map(([docs, score]) => ({
            score,
            content: docs.pageContent,
            id: docs.metadata?.id ?? "unknown",
            book_id: docs.metadata?.book_id ?? "未知",
            chapter_num: docs.metadata?.chapter_num ?? "未知",
            index: docs.metadata?.index ?? "未知"

        }))
    } catch (error) {
        console.error("检索内容时出错：", error.message);
        return [];
    }
}

// 生出内容，将检索到的document 拼接给prompt中 喂给大模型
async function generate(state) {
    const document = state.document;
    const text = document.map((item , i) => {
        return `[片段${i+1}]章节：第${item.chapter_num}章,内容：${item.content}`
    }).join("\n\n-------\n\n")
    const prompt = `
  你是一个专业的《天龙八部》小说助手。基于小说内容回答问题，用准确，详细的语言。
  请根据以下《天龙八部》小说片段内容回答问题：
  ${context}
  用户问题：${state.question}

  回答要求：
  1. 如果片段中有相关信息，请结合小说内容给出详细、准确的回答
  2. 可以综合多个片段的内容，提供完整的答案
  3. 如果片段中没有相关信息，请如实告知用户
  4. 回答要准确，符合小说的情节和人物设定
  5. 可以引用原文内容来支持你的回答

  AI 助手的回答：`
  process.stdout.write("\n[AI回答（流式）]\n");
  let generation = "";
  const stream = await model.stream(prompt);
  for await (const chunk of stream){
    const text = typeof chunk.content === 'string' ? chunk.content:"";
    if(!text){
        continue;
    }
    generation += text
    process.stdout.write(text);
  }
  process.stdout.write("\n");
  return {
     question: state.question,
    k: state.k,
    documents: state.documents,
    generation
  }
}

const graph = new StateGraph(GraphState).
addNode("retrieve",retrieve).
addNode("generate",generate).
addEdge(START,"retrieve").
addEdge("retrieve","generate").addEdge("generate",END).compile()

// 变成可视化的图
const drawable = await graph.getGraphAsync();
const mermaid = drawable.drawMermaid({withStyles:true})
console.log(mermaid);

process.stdout.write("你好")