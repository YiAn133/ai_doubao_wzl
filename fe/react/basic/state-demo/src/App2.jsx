export default function App() {

    const [users] = useState([
    {id:1, name: '陈俊璋'},
    {id:2, name: '胡适'},
  ])
  const [filterText, setFilterText] = useState('');
  const filteredUsers = users.filter(user => 
    user.name.includes(filterText)
  )
  return (
    <div style={{ padding: '20px' }}>
      <h2>用户列表</h2>
      <input 
        type="text" 
        placeholder="输入用户名过滤"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <p>当前显示 {filterdUsers.length} 个用户 </p>
      <ul style={{maxHeight: '300px', overflowY: 'auto'}}>
        {
          filteredUsers.map(user => (
            <li key={user.id}>{user.name}</li>
          ))
        }
      </ul>
    </div>
  )
}