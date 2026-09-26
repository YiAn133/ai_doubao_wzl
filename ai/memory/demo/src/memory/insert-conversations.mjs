// 这里是在进行向量存储，长久存储
// Verctor store
// milvus 本地安装
import 'dotenv/config';
import {
    DataType,
    IndexType,
    MetricType,
} from '@zilliz/milvus2-sdk-node';

import pkg from '@zilliz/milvus2-sdk-node';
const { MilvusClient } = pkg;

import {
    OpenAIEmbeddings
} from '@langchain/openai';

//- `COLLECTION_NAME`：向量表名叫`conversations`，专门存对话片段向量；
//- `VECTOR_DIM=1024`：你用的 Embedding 模型输出 1024 维向量，创建集合时告诉 Milvus 向量数组长度。
const COLLECTION_NAME = 'conversations';//集合
const VECTOR_DIM = 1024;//维度

const embeddings = new OpenAIEmbeddings({
    model: 'text-embedding-v3',
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
    dimensions: VECTOR_DIM
})

async function getEmbedding(text) {
    const result = await embeddings.embedQuery(text);
    return result;
}

const client = new MilvusClient({
    address: 'localhost:19530'
})

async function main() {
    try {
        console.log('连接Milvus....');
        await client.connectPromise;
        console.log('连接成功');

        const existRres = await client.hasCollection({ collection_name: COLLECTION_NAME })
        if (!existRres.value) {
            console.log('集合不存在，开始创建集合');
            
            console.log('创建集合');
            await client.createCollection({
                collection_name: COLLECTION_NAME,
                fields: [
                    {
                        // 让ID不再是自增的，能更安全
                        name: "id",
                        data_type: DataType.VarChar,
                        max_length: 50,
                        is_primary_key: true
                    },
                    {
                        name: 'vector',
                        data_type: DataType.FloatVector,
                        dim: VECTOR_DIM
                    },
                    {
                        name: 'content',
                        data_type: DataType.VarChar,
                        max_length: 5000
                    },
                    {
                        name: 'round',
                        data_type: DataType.Int64
                    },
                    {
                        name: 'timestamp',
                        data_type: DataType.VarChar,
                        max_length: 100
                    }
                ]
            })

            console.log('集合已经创建，开始创建索引');
            
            // 给向量字段加索引 加快查询速度
            await client.createIndex({
                collection_name: COLLECTION_NAME,
                field_name: 'vector',
                index_type: IndexType.AUTOINDEX,
                metric_type: MetricType.COSINE
            })

            
        }else{
            console.log('集合已经创建');
        }

        await client.loadCollection({ collection_name: COLLECTION_NAME })

            console.log('索引已经创建');

            const conversations = [
                {
                    id: 'conv_001',
                    content: '用户：我叫赵六，是一名数据科学家\n助手：很高兴认识你，赵六！数据科学是一个很有趣的领域。',
                    round: 1,
                    timestamp: new Date().toISOString()
                },
                {
                    id: 'conv_002',
                    content: '用户：我最近在研究机器学习算法\n助手：机器学习确实很有意思，你在研究哪些算法呢？',
                    round: 2,
                    timestamp: new Date().toISOString()
                },
                {
                    id: 'conv_003',
                    content: '用户：我喜欢打篮球和看电影\n助手：运动和文化娱乐都是很好的爱好！',
                    round: 3,
                    timestamp: new Date().toISOString()
                },
                {
                    id: 'conv_004',
                    content: '用户：我周末经常去电影院\n助手：看电影是很好的放松方式。',
                    round: 4,
                    timestamp: new Date().toISOString()
                },
                {
                    id: 'conv_005',
                    content: '用户：我的职业是软件工程师\n助手：软件工程师是个很有前景的职业！',
                    round: 5,
                    timestamp: new Date().toISOString()
                }
            ];

            const conversationData = await Promise.all(
                conversations.map(async (conv) => ({
                    ...conv,
                    vector: await getEmbedding(conv.content)
                }))
            )

            const insertResult = await client.insert({
                collection_name: COLLECTION_NAME,
                data: conversationData
            })
            console.log(insertResult);




    } catch(err) {
        console.error('❌捕获到错误：', err)
    }
}

main().catch(console.error)