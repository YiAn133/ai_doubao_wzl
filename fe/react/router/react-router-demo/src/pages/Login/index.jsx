import { 
    // 在事件回调中进行页面跳转
    // <Navigate>是写在 JSX 里渲染就跳转；useNavigate是函数调用跳转。
    useNavigate,
    useLocation,
   
    // 获取当前URL的信息对象
    // 包括：pathname（当前路径）
    // search（查询字符串）
    // hash：路由
    // state:路由跳转附带的内存级数据，不在URL显示，默认是null

}from 'react-router-dom'


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || "/";
    function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get("username");
        const password = formData.get("password");
        if(!username || !password){
            alert("请输入用户名或者密码")
            return;
        }
        if(username === 'admin' && password === '123456'){
            localStorage.setItem('isLogin' , 'true');
            // navigate(from);
            navigate(from ,{replace : true});//replace:不留下历史记录，不能回退
        }else{
            alert("用户名或者密码错误")
        }


    }
    
    return (
        <>
            <h1>登录</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name='username' placeholder='请输入姓名' required />
                <input type="password" name='password' placeholder='请输入密码' required />
                <button type='submit'>登录</button>
            </form>
        
        </>
    
    )
}

export default Login;