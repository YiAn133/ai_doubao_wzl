import{
  useState
} from 'react';


export default function App(){
  const [count, setCount] = useState(0);
  const addCount = () => {
    setCount(pre => pre+1)
    console.log(count);
    
  }
    return(
      <>
      <p>当前计数：{count}</p>
      <button onClick={addCount}>+1</button>
      </>

    )
}