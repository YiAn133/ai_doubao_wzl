import { Client } from "@elastic/elasticsearch";

const client = new Client({
    node:"http://localhost:9200"
})

const INDEX_NAME = 'travel_journal'


// 搜索功能
async function search_es() {
    const res = await client.search({
        index:INDEX_NAME,
        query:{
            match:{
                note_body:{
                    query:"慢跑",
                }
            }
        }
    })
    console.log(res);
     const rows = res.hits.hits.map((item) => ({
    id: item._id,
    ...item._source
  }))
  console.log(rows);
}

// 增加功能
async function create_es() {
    const now = new Date().toISOString()
    const res = await client.index({
        index: INDEX_NAME,
        document: {
            note_title: '夜跑复盘',
            note_body: '今天夜跑5公里， 配速稳定， 结束后做了拉伸。',
            tags: ['运动', '夜跑'],
            mood: 'focused',
            priority: 2,
            created_at: now,
            updated_at: now
        }
    })
    console.log(`新增 成功，ID=`, res._id);
    return res._id;
}

async function main() {
    // search_es()
    const id = await create_es()
    console.log(id);
    
}

main()