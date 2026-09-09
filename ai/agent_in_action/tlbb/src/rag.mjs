import dotenv from 'dotenv';
dotenv.config();
import{
    MilvusClient,
    MetricType,//提供相似度计算方法
    IndexType,//选择索引计算的规则是暴力，还是IVF_FLAT
    DataType//字段数据类型约束
}from '@zilliz/milvus2-sdk-node';

import{
    ChatOpenAI,
    OpenAIEmbeddings
}from '@langchain/openai'


// 云端地址
const ADDRESS = process.env.MILVUS_ADDRESS;
// api key
const TOKEN = process.env.MILVUS_TOKEN;

const COLLECTION_NAME = 'ebook';
const VECTOR_DIM = 1024;

const model = new ChatOpenAI({
    model:process.env.MODEL_NAME,
    apiKey:process.env.OPENAI_API_KEY,
    temperature:0.1,
    configuration:{
        baseURL:process.env.OPENAI_BASE_URL
    }
})

const embeddings = new OpenAIEmbeddings({
    model:process.env.EMBEDDINGS_MODEL_NAME,
    apiKey:process.env.OPENAI_API_KEY,

    configuration:{
        baseURL:process.env.OPENAI_BASE_URL
    },
    dimensions:VECTOR_DIM

})

const client = new MilvusClient({
    address:ADDRESS,
    token:TOKEN
})

const getEmbedding = async (text) => {
    const result = await embeddings.embedQuery(text);
    return result;
}

async function  retrieveRelevanContent(question , k = 3) {
    try{
        const queryVector = await getEmbedding(question);
        const searchResult = await client.search({
            collection_name:COLLECTION_NAME,
            vector:queryVector,
            limit:k,
            metric_type:MetricType.COSINE,
            output_fields:['id' , 'book_id' , 'chapter_num' , 'index' , 'content']
        })

        return searchResult.results;
    }catch(err){
        console.log('查询过程中有问题',err);
        
        return [];
    }
}

async function answerEbookQuestion(question , k = 3) {
    try {
        const retrievedContent = await retrieveRelevanContent(question , k);
        if(retrievedContent.length === 0){
            console.log('未找到相关内容');
            return ;
        }
        const context = retrievedContent.map((item , i) =>
            `[片段${i + 1}]
            章节:第${item.chapter_num}章
            内容：${item.content}`
        ).join('\n\n----\n\n');
        const prompt = `你是一个专业的《天龙八部》小说助手。
        基于小说回答问题，用准确，详细的语言。
        请根据以下小说片段内容回答问题：
        ${context}
        用户问题：${question}
        回答要求：
        1.如果片段中有相关信息，请结合小说内容给出详细准确的回答。
        如果没有请说不知道
        2.可以综合多个片段的内容，提供完整的答案。
        3.如果片段中没有相关信息，请如实告知用户。
        4.回答要准确，符合小说情节和人物设定。
        5.可以引用原文内容来支持你的回答。
        AI助手的回答：`
        const response = await model.invoke(prompt);
        return response.content;
    } catch (error) {

        
    }
}


async function main() {
    try {
        await client.connectPromise;
        try{
            await client.loadCollection({
                collection_name:COLLECTION_NAME
            });
            console.log(`集合加载完成`);
            const result = await answerEbookQuestion('天龙八部讲了什么故事?' , 5);
            console.log(result);
            
        }catch(err){

        }
    } catch (error) {
        
    }
    
}

main();