import {getTodos} from '../api/todos'
import { useEffect , useState } from 'react';

function Todos(){
    const [todos , setTodos] = useState([]);
    useEffect(() => {
        // 不在之前（）那里写async
        // 写个立即函数 即可
        (async () => {
            const data = await getTodos();
            setTodos(data);
            console.log(data);
            
        })()
    } , []);
    return (
        <>
        Todos
        </>
    )

}
export default Todos;