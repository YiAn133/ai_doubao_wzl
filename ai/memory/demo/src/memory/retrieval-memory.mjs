import 'dotenv/config';

import {
    ChatOpenAI,
    OpenAIEmbeddings
} from '@langchain/openai'
import { InMemoryChatMessageHistory } from '@langchain/core/chat_history';
import { MilvusClient, MetricType } from '@zilliz/milvus2-sdk-node'
import {
    HumanMessage,
    AIMessage,
    SystemMessage
} from '@langchain/core/messages'
import E from 'dotenv';

const COLLECTION_NAME = 'conversations';//集合
const VECTOR_DIM = 1024;//维度

const embeddings = new OpenAIEmbeddings({
    model: 'text-embedding-v3',
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
    dimensions: VECTOR_DIM
})

const model = new ChatOpenAI({
    modelName: process.env.MODEL_NAME,
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
    }
});

const client = new MilvusClient({
    address: 'localhost:19530'
})

const getEmbedding = async function (query) {
    return await embeddings.embedQuery(query)
}


async function retrievalMemoryDemo() {
    try {
        console.log('连接 Milvus...');
        await client.connectPromise;
        console.log('已连接 \n');
        const history = new InMemoryChatMessageHistory();
        const conversations = [
            { input: "我之前提到的机器学习项目进展如何了" },
            { input: "我周末进场做什么" },
            { input: "我的职业是什么？" }
        ]

        for (let i = 0; i < conversations.length; i++) {
            const { input } = conversations[i];
            const userMessage = new HumanMessage(input);
            console.log(`第${i + 1}轮对话`);
            console.log(`用户：${input}`);
            console.log(`\n[检索相关历史对话]`);
            const retrievedConversation = await retrievedConversations(input, 2);
            let relevanHistory = '';
            if (retrievedConversation.length > 0) {
                relevanHistory = retrievedConversation.map((conv, idx) => {
                    return `[历史对话]${idx + 1}
                        轮次:${conv.round}
                        ${conv.content}
                    `
                }).join('/n')
                // console.log(retrievedConversation);
            } else {
                console.log('未找到相关历史对话')
            }

            // console.log(relevanHistory , '------------');
            const contextMessages = relevanHistory ? [new HumanMessage(`相关历史对话：\n ${relevanHistory}\n\n
                用户问题：${input}`)] : [userMessage]
            const response = await model.invoke(contextMessages)
            console.log(response.content);
            await history.addAIMessage(userMessage)
            await history.addAIMessage(response)
            // 会话，持久化到milvus
            const conversationText = `用户：${input}\n助手：${response.content}`
            const convId = `conv_${Date.now()}_${i+1}`//时间 + i 唯一ID
            const convVector = await getEmbedding(conversationText)
            try {
                await client.insert({
                    collection_name:COLLECTION_NAME,
                    data:[{
                        id:convId,
                        content:conversationText,
                        vector:convVector,
                        round:i+1,
                        timestamp:new Date().toISOString()
                    }]
                })
            } catch (error) {
                console.error(error);
                
            }


        }

    } catch (err) {
        console.error('无法连接到Milvus');
        return;
    }
}

async function retrievedConversations(query, k = 2) {
    try {
        const queryVector = await getEmbedding(query)
        const searchResult = await client.search({
            collection_name: COLLECTION_NAME,
            vector: queryVector,
            limit: k,
            metric_type: MetricType.COSINE,
            output_fields: ['id', 'content', 'round', 'timestamp']
        })
        return searchResult.results;
    } catch (err) {
        console.error(err);
        return [];

    }
}






retrievalMemoryDemo().catch(console.error)