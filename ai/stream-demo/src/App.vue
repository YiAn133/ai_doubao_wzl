<script setup>
// setup 是vue3的语法糖，能把script里面的数据放在template中能使用
import HelloWorld from './components/HelloWorld.vue'
import {ref} from 'vue'
const count = ref(0);
const username = ref('')
const increment = () => {
  count.value++;
}

const question = ref('讲一个中国龙的故事')
const content = ref('');
const stream = ref(true);

const update = async () =>{
  if(!question.value){
    return;
  }
  content.value = '思考中....'//开始llm调用
  const endpoint = 'https://api.deepseek.com/chat/completions'; 
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}` };

  const response = await fetch(endpoint , {
    method:'POST',
    headers,
    body:JSON.stringify({
      model:'deepseek-v4-flash',
      messages:[
        {role:'user',content:question.value}
      ],
      stream:stream.value
    })
  });

  if(stream.value){
    content.value = '';
    // llm 服务器 ReadableStream对象
    // stream对象 水流 服务器流向浏览桥
    // response.body 服务器响应体 二进制流 是一个ReadableStream对象
    console.log(response.body);
    // reader是一个读取器
    const reader = response.body?.getReader();
    // 二进制解码器
    const decoder = new TextDecoder('utf-8');//为二进制服务的
    let done = false;//开关变量
    // done 改变有俩个情况，一个是llm在预测下一个Token 就设置了done:true
    //还有一个是单独发送一条data: [DONE]
    let buffer = '';//缓存，//上一次JSON.parse（）不完整的json completion

    while(!done){
      // 嘬一口  ，嘬到了就reslove，没有嘬到，就继续等待
      const {value,done:doneReading} = await reader?.read();
      done = doneReading;//1.修改done
      // 把读取出来的二进制  进行编码
      // 除了把本轮的value 要处理外。之前的可能会残留东西，也要处理
      const chunkValue = buffer +  decoder.decode(value);
      const allChunks= chunkValue.split('\n');
      buffer = allChunks.pop();
      // json 字符串 多行数据
      // 一次发送一行 ， 也可能发送多行 与llm计算速度有关
      // 可能出现data：{}/ndata：{}
      // 数组.filter方法是按照后面的规则筛选，返回符合条件的数组
      const lines = allChunks.filter((line) => line.startsWith('data: '));

      // 遍历一下，看看是否结尾了
      for(const line of lines){
        // 切掉data: 
        const incoming = line.slice(6);
        if(incoming === '[DONE]'){//2.修改done
          done = true;
          break;
        }
         //处理incoming 处理这个json字符串 变为JSON数组
      try{
        const data = JSON.parse(incoming);
        if(!data.choices?.length){
          continue;
        }
        const delta = data.choices[0].delta.content;
        if(delta){
          content.value += delta;
        }
      }catch(err){
        // 会到这里说明数据切割中有不完整的JSON格式，存入buffer，并且恢复之前被切割的data：
        buffer = `data: ${incoming}`;
      }
      }
     

    
    }
  }else{
    const data = await response.json();
    content.value = data.choices[0].message.content;
  }
}

</script>

<template>
 <div class="container">
    <div>
      <label>输入：</label><input class="input" v-model="question" />
      <button @click="update">提交</button>
    </div>
    <div class="output"> 
      <div><label>Streaming</label><input type="checkbox" v-model="stream"/></div>
      <div>{{ content }}</div>
    </div>
  </div>
</template>
<style>
.container{
  display: flex;
  flex-direction: column;
  justify-content: start;
  /* 浏览器覆盖全部 */
  height: 100vh;
  font-size: 0.85rem;

  background-color: pink;
}
.output{
  margin-top: 10px;
  width: 100%;
  min-height: 300px;
  text-align: left;
}
button{
  padding: 0 10px;
  margin-left: 6px;
}


</style>