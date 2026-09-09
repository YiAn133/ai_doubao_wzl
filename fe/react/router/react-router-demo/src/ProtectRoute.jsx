
import{
    Navigate,
    useLocation
}from 'react-router-dom'

const ProtectRoute = ({children}) => {//解构得到双标签内部里面的子组件
    // 拦截请求，鉴权
    const location = useLocation();
    const isLogin = localStorage.getItem('isLogin') === 'true';
    console.log(isLogin);
    if(!isLogin){
        // 没有登录,跳转到登录页面
        return <Navigate to="/login" replace state={{from : location.pathname}} />
    }
    console.log(children , '-----');
    return(
        <>
        {children}
        </>
    )
}

export default ProtectRoute;