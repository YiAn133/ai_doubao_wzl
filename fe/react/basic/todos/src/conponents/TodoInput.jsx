// 表单交互组件
import{
    useState
}from 'react'
export default function TodoInput ({ onAdd }) {
    console.log(onAdd);
    // 私有的
    const [inputValue , setInputValue] = useState(""); 
    // 进行渲染的时候不会执行
    // 当点击提交的时候才执行
    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(inputValue);
        setInputValue('');
    }



    return (
        <form className="todo-input" onSubmit={handleSubmit}>
            <input type="text"  value={inputValue} onChange={(e) => setInputValue(e.target.value)} 
            placeholder="What needs to be done?"
            autoFocus/>
            <button type="submit">ADD</button>
        </form>
    )
}