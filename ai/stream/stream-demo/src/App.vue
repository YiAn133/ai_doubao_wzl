<template>
  <!-- 会做数据绑定{{}} -->
  <div class = "container">
    <div>
      <label for="">输入：</label>
      <!-- 数据的双向绑定 -->
      <input type="text" class="input" v-model="question">
      <button @click="update">提交</button>
    </div>
    <div class="output">
      <label for="">Streaming</label>
      <input type="checkbox" v-model="stream">
    </div>
    <div>
      {{content}}
    </div>
  </div>
</template>
<script setup>
// 响应式数据
import { ref }  from 'vue';


const question = ref('讲一个关于中国龙的故事');
const stream = ref(false);
const content = ref('');//llm response 内容 | 开始请求




const update = async () => {
  if(!question){//如果问题为空，那么就不调用llm
    return;
  }else{
    content.value = '思考中....';

    const endpoint = '/api/chat/completions';
    const headers = {
      'Content-Type': 'application/json',
      // apiKey令牌的一种标记 Bearer 开始 token
      Authorization:`Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`
    }


    const response = await fetch(endpoint , {
      method:'POST',
      headers,
      body:JSON.stringify({
        model:'deepseek-v4-flash',
        messages:[
          {
            role:'user',
            content:question.value
          }
        ],
        stream:stream.value//llm接受参数，是否开启流式输出
      })
    })

    if(stream.value){
      content.value = '';//流式输出，清除内容
      // 响应体对象，一批批token流式输出
      // 二进制流，可读流 ?.
      const reader = response.body?.getReader();

      // 解码器  二进制流 转换为文本流
      const decoder = new TextDecoder();
      //是否读取完成
      let done = false;
      let buffer = '';

      while(!done){//直到读到【DONE】
        const { value, done: streamDone } = await reader.read();
        done = streamDone;
        // 解码这一块二进制数据
        const chunk = decoder.decode(value, { stream: true });
        // 拼接缓冲区
        buffer += chunk;
        // 按行分割
        const lines = buffer.split('\n');
        // 保留最后一个不完整的行
        buffer = lines.pop() || '';
        for(const line of lines){
          // SSE格式: data: {...}
          if(line.startsWith('data: ')){
            const jsonStr = line.slice(6);
            if(jsonStr === '[DONE]'){
              done = true;
              break;
            }
            try{
              const json = JSON.parse(jsonStr);
              const delta = json.choices?.[0]?.delta?.content;
              if(delta){
                content.value += delta;
              }
            }catch{
              // 忽略解析失败的行
            }
          }
        }
      }
    }else{
      const data = await response.json();
      content.value = data.choices[0].message.content;
    }
  }
  
  
  
}


</script>
<style>
.container{
  height: 100px;
  width: 100px;
  background-color: pink;
}


</style>

