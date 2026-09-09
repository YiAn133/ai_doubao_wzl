import dotenv from 'dotenv';
dotenv.config();
import{
    MilvusClient,
    MetricType,//提供相似度计算方法
    IndexType,//选择索引计算的规则是暴力，还是IVF_FLAT
    DataType//字段数据类型约束
}from '@zilliz/milvus2-sdk-node';

import{
    OpenAIEmbeddings
}from '@langchain/openai'


// 云端地址
const ADDRESS = process.env.MILVUS_ADDRESS;
// api key
const TOKEN = process.env.MILVUS_TOKEN;

const COLLECTION_NAME = 'ebook';
const VECTOR_DIM = 1024;

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

async function main() {

    try{
        console.log('Connecting to Milvus');
        await client.connectPromise;
        console.log('connected\n');

        await client.loadCollection({
            collection_name:COLLECTION_NAME
        });
        const query = '这本书说什么故事';
        const queryVector = await getEmbedding(query);
        const searchResult = await client.search({
            collection_name:COLLECTION_NAME,
            vector:queryVector,
            limit:3,
            metric_type:MetricType.COSINE,
            output_fields:['id' , 'book_id' , 'chapter_num' , 'index' , 'content']
        })
        searchResult.results.forEach((item , index) => {
            console.log(`
                ${index + 1}.[Score:${item.score.toFixed(4)}]\n
                ID：${item.id}\n
                BookId: ${item.book_id}\n
                Content:${item.content}\n
                `);
        })
    }catch(err){
        console.log(err);
        throw err;
        
    }
}

main().catch(err => {
    console.log(err);
    
})