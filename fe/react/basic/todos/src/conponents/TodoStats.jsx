// 表示状态的
const TodoStats = ({total,active,completed,onClearComplete}) => {
    return (
        <div className="todo-stats">
            <p>total:{total} | Active:{active} | completed:{completed}</p>
            {
                completed > 0 && (<button onClick={onClearComplete} className="clear-btn">Clear Completed</button>) 
            }
        </div>
    )
}
export default TodoStats;