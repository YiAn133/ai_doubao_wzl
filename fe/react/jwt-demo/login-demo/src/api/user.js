import axios  from "axios";

export const login = async (data) => {
    // 第二个参数是body，发送给后端
    const res = await axios.post('/api/login' , data);
    console.log(res.data);
    
    return res.data;
}