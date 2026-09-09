import{
  useRef,
  useEffect,
  useState
}from 'react'

const App = () => {
  const numRef = useRef(0);
  const [,set] = useState(0);
  return(
    <>
    {numRef.current}
    <button onClick={() => {numRef.current+=1;set(numRef.current)}}>点击</button>
    </>
  )
}

export default App;