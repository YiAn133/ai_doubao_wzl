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

const COLLECTION_NAME = 'ai_dairy';
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

async function retrievedDiary(question , k) {
    try{
          // 把问题向量化
    const queryVector = await getEmbedding(question);
    // 去数据库中寻找
    const searchResult =  await client.search({
        // 要查询数据库的名称
        collection_name: COLLECTION_NAME,
        // 要查询的向量
        vector:queryVector,
        limit:k,
        metric_type:MetricType.COSINE,//向量计算为cos
        output_fields:['id' , 'content' , 'date' , 'mood' , 'tags']
    });
    return searchResult.results;
    }catch(err){
        console.log('检索日记出错',err);
        return [];
    }
}


async function  answerDiaryQuestion(question , k = 2) {
        try{
            console.log('='.repeat(80));
            console.log(`Question${question}`);
            console.log('='.repeat(80));
            console.log('开始检索相关日记');
            const retrievedDiaries = await retrievedDiary(question , k);
            if(retrievedDiaries.length === 0){
                console.log('未找到相关内容');
                return;
            }
             retrievedDiaries.forEach((diary , i) => {
                console.log(`日记${ i + 1} 相似度:${diary.score.toFixed(4)}\n
                内容${diary.content}`);
             });
             const context = retrievedDiaries.map((diary , i) => {
                return `
                【日记${i + 1}】
                日期：${diary.date}
                心情：${diary.mood}
                标签：${diary.tags?.join(', ')}
                内容：${diary.content}
                `
             }).join('\n\n-------------\n\n')

             const prompt = `你是一个温柔贴心的AI日记助手，基于用户的日记内容回答问题，用亲切自然的语言。
             请根据以下日记内容回答问题：
             ${context}
             
            用户问题: ${question}
            回答要求：
            1.如果日记中有相关信息，请结合日记内容给出详细，温柔的回答。
            2.开源总结多篇日记内容，找出共同点或趋势。
            3.如果日记中没有相关信息，请温和告知用户。
            4.用第一人称“你”来称呼日记的作者。
            5.回答要有同理心，让用户感到理解的关心
             `
             console.log('【AI回答】');
             const response = await model.invoke(prompt);
             console.log(response.content);
        }catch(err){
            console.log(err);
            
        }
}

async function  main() {
    try{
        console.log('连接到Milvus...');
        await client.connectPromise;//等待与Milvus握手
        console.log('已连接');
        await answerDiaryQuestion('我是谁',2);


    }catch(err){

    }
    
}

main().catch(console.error);