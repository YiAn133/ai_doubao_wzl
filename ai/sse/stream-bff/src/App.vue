<script setup>

fetch('/api/stream')
.then(res => res.json())
.then(data => {
  console.log(data);
})

</script>
<template>
 <div class="container">
    <div>
      <label>输入：</label><input class="input" v-model="question" />
      <button @click="update">提交</button>
    </div>
    <div class="output"> 
      <div class="a"><label>Streaming</label><input type="checkbox" v-model="stream"/></div>
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
*{
  margin: 0;
  padding: 0;
}
.output .a{
  text-align: center;

}


</style>