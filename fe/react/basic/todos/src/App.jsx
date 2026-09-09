import TodoList from "./conponents/TodoList"
import TodoStats from "./conponents/TodoStats"
import TodoInput from "./conponents/TodoInput"
import './App.css';
import{
  useState,
  useEffect
}from 'react';

const App = () => {
  const [count , setCount] = useState(0);
    const [todos , setTodos] = useState(() => {
      return JSON.parse(localStorage.getItem('todos')) || []
    })
  console.log("组件函数运行，组件开始渲染");
    // 副作用
  useEffect(() => {
    console.log("挂载后执行");
    
  },[count]);//依赖与count改变，就能执行
  useEffect(() => {
    console.log("挂载后执行二");
    
  },[]);//依赖项数组，表示只在挂载1次后执行，之后函数更新后，不会更新
  useEffect(() => {
    console.log("挂载后执行三");//表示每次函数更新，就会执行
    localStorage.setItem('todos' , JSON.stringify(todos))
  },[todos]);//依赖项数组

  
  const countBy = () => {
    setCount(count+1);
  }



  // 添加todo的方法,由父组件管理
  const addTodo = (text) => {
    if(text.trim() === ""){
      return;
    }
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: text,
        completed:false
      }
    ]
      
    )
  }
  const toggleTodo = (id) => {
     setTodos(todos.map((todo) => {
      if(todo.id === id){
        return {...todo , completed : !todo.completed}
      }else{
        return todo;
      }
     }));
  }
  const deleteTodo = (id) => {
    setTodos(
      todos.filter(todo => todo.id !== id)
    )
  }

  const Demo = () => {

    useEffect(() => {
     const Interval =  setInterval(() => {
        console.log('interval , is here');
      }, 2000);
      return () => {
        console.log('组件卸载前执行，做什么内存清理工作');
        clearInterval(Interval)
      }
    }
      , [])

    return (
      <div>
        Demo
      </div>
    )
  }



  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.length - activeCount;

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }
  return(
    <div>
      Count:{count}
      <button onClick={countBy}>count++</button>
      {count % 2 === 0 && <Demo/>}
    <h1>My Todo List</h1>
    {/* 自定义事件 */}
    <TodoInput onAdd={addTodo}/>
    <TodoList  todos={todos} onToggle={toggleTodo} onDelete={deleteTodo}/>
    <TodoStats total={todos.length} active={activeCount} completed={completedCount}
    onClearComplete={clearCompleted}/>
  </div>
  )
  
}
export default App;

