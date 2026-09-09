import{
  useRef,
  useState,
  useEffect
}from 'react'

const App = () => {
  const [result , setResult] = useState(null);
  const [loading , setLoading] = useState(false);
  const workerRef = useRef(null);//可持久化的可变对象，再次渲染不会重新创建
  useEffect(() => {
    workerRef.current = new Worker(new URL("./worker.js" , import.meta.url));
    // 监听worker线程，有没有消息到达
    workerRef.current.onmessage = (e) => {
      console.log(e);
      const {result} = e.data;
      setResult(result);
      setLoading(false);
    }
    return () => {
      // 销毁线程
      workerRef.current.terminate();
      // 手动回收内存
      workerRef.current = null;
    }
  }, [])
  // 计算复杂任务
  const startHeavyCalc = function(){
    setLoading(true);
    // 传递消息
    // 向worker传递指令
    workerRef.current.postMessage({
      num:88,
    })
  }
  return(
    <div style={{padding:"30px"}}>
      <h2>useRef + WebWorker 耗时运算</h2>
      <p>开启web worker 线程 执行5亿次循环</p>
      <button onClick={startHeavyCalc} disabled={loading}>{loading ? "正在后台计算..." : "启动繁重计算任务"}</button>
      {result && <h3>计算结果：{result}</h3>}
    </div>
  )
}

export default App;