import axios from 'axios';
const instance = axios.create({
    baseURL: '/api',
    timeout:5000
});
// 拦截每个请求
// 每一次发请求出去之前，自动执行这里的代码，统一加工请求配置
instance.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
})

instance.interceptors.response.use(res => {
    return res.data
})
export default instance;