// api下的配置文件
import axios from 'axios';
// 实例化axios，在todos中引用
const instance = axios.create({
    baseURL:'/api',
    timeout:5000
})
export default instance;