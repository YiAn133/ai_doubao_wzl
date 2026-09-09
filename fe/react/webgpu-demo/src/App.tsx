// 现代前端开发框架
// 组件化  响应式 数据绑定
// tsx == typescript + jsx
import { 
  useState,//react 函数式思想
  useEffect, //生命周期钩子函数，组件挂载时执行
  Fragment
} from "react"
import Progress from "./components/Progress";
function App(){
  // count 数据状态
  // 如果想修改count 必须用setCount
  // const [count , setCount]  = useState(0);//响应式 等于vue 的ref
  // 返回 jsx  是react的UI表现形式（就是html）

  // status 有以下值：null，loading，ready
  const [status , setStatus] = useState("ready");//响应式数据状态
  const[input ,setInput] = useState("");
  const[error ,setError] = useState(null);
  // 加载信息
  const [loadingMessage , setLoadingMessage] = useState("开始加载");
  const [progressItems , setProgressItems] = useState([])
  // const [progressItems , setProgressItems] = useState([{
  //   file:'model.onnx',
  //   progress:0,
  //   total:34000000
  // },{
  //   file:'model2.onnx',
  //   progress:10000000,
  //   total:14000000
  // }])

  const IS_WEBGPU_AVALABLE = !!navigator;


  // llm处理
  const onEnter = () => {
    console.log(input)

  }
    






  // 副作用
  useEffect( () => {
    console.log('组件已经挂载完成');
    
    
    
  },[])
  console.log('组件函数执行');
  
  return (
    // flex-col 按照主轴为竖着的
    // h-screen 100vh
    // mx-atuo == margin x
   IS_WEBGPU_AVALABLE?(
   <div className="flex flex-col h-screen mx-auto items-center justify-end text-gray-800 bg-white">
    <div className="h-full overflow-auto flex justify-center items-center flex-col relative">
      {/* 一个像素为4px 
      1rem = 4像素
      1像素 = 4px
      []代表指定样式大小
      */}
       <div className="flex flex-col items-center mb-1 max-w-[400px] text-center">
        <h1 className="text-4xl font-bold mb-1">DeepSeek-R1 WebGPU</h1>
        <h2 className="font-semibold">
          A next generation reasoning model that runs locally
          in your browser with WebGPU acceleration
        </h2>
       </div>
       <div className="flex flex-col items-center px-4">
        <p className="mx-w-[510] mb-4">
          <br />
          <a
              href="https://huggingface.co/onnx-community/DeepSeek-R1-Distill-Qwen-1.5B-ONNX"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline"
            >
              {/* DeepSeek-R1 的 15 亿参数量蒸馏版，用 Qwen 架构，适合本地轻量推理。
                蒸馏Qwen
              */}
              DeepSeek-R1-Distill-Qwen-1.5B
            </a>
            , a 1.5B parameter reasoning LLM optimized for in-browser
              inference. Everything runs entirely in your browser with
              <a
              href="https://huggingface.co/docs/transformers.js"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              🤗&nbsp;Transformers.js
            </a>{" "}
            {/* Open Neural Network Exchange */}
            and ONNX Runtime Web, meaning no data is sent to a server. Once
            loaded, it can even be used offline. The source code for the demo
            is available on{" "}
        </p>
        {
          error && (
            <div className="text-red-500 text-center mb-2">
              <p className="mb-1">
                Unable to load mode due to the following error:
              </p>
              <p className="text-sm">{error}</p>
            </div>
          )
        }
        {/* 
        vue中添加事件是用@click
        react 中添加事件是 onClick
         */}
        <button 
        className="border px-4 py-2 rounded-lg bg-blue-400 text-white 
        hover:bg-blue-500 disabled:cursor-not-allowed select-none"
        disabled={status !== null || error !== null}
        onClick={() => {
          setStatus('loading')
        }}>Load Model</button>
       </div>
    </div>
    {
      //load状态 页面要显示 llm下载，文件数组，驱动下载进度条
      status === "loading" && (
        <div className="w-full max-w-[500px] text-left mx-auto p-4 bottom-0 mt-auto">
          <p className="text-center mb-1">{loadingMessage}</p>
          {progressItems.map(({file , progress , total},i) => (
             <Progress
             key={i}  
             text={file} 
             percentage={progress} 
             total={total}/>
          
          ))}
        </div>
      )
    }
    {/* 聊天输入框 */}
    <div className="mt-2 border border-gray-300 rounded-lg 
    w-[600px] max-w-[80%] max-h-[200px] mx-auto relative mb-3 flex">
      <textarea className="w-[550px] dark-gray-700 px-3 py-4 rounded-lg 
      bg-transparent border-none outline-hidden
      disabled:text-gray-400 disabled:placeholder-gray-200" placeholder="Type-gray-200"
      rows={1} disabled={status !== 'ready'} value={input} 
      onInput={(e) => {
        // e是任意事件对象，e.target是Dom对象  
        // 这里是直接断言Dom对象是文本域对象，故而才有value
        const target = e.target as HTMLTextAreaElement;
        setInput(target.value);
      }}
      onKeyDown={(e) => {
        if(input.length > 0 && e.key === 'Enter' && !e.shiftKey){
          e.preventDefault();
          onEnter();
        }
      }}></textarea>
      {/* react中不支持双向绑定 */}
    </div>

    </div>):(
      <div>您的浏览器还不支持webGPU</div>
    )
  )

}
export default App