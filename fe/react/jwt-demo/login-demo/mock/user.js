import  jwt  from "jsonwebtoken";

const secret = 'secret819!$'
export default [
    {
        url:'/api/repo',
        method:'get',
        response:req => {
            // req.headers 获得的是对象
            // 这里之所以是直接[key]是获取对象中key的值
            // JS 对象有两种读取属性的写法：点 `.` 和方括号 `[]`。
            // 又因为authorization：Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.xxxx
            // 中间有空格，我们用split切割空格，然后获取下标为1的即可获得真正的token
            const token = req.headers['authorization'].split(' ')[1];
            console.log(token);
            try {
                let decoded = jwt.verify(token , secret);
                console.log(decoded);
                return {
                    code: 0,
                    data:decoded.user
                }
            } catch (error) {
                return {
                    code:401,
                    msg:'Invalid token'
                }
            }
           
        }
    },
    {
        url:'/api/login',
        method:'post',
        timeout:2000,
        response:(req , res) => {
            const body = req.body;
            console.log(body);
            
            const token = jwt.sign(
                {
                    user:body.username,
                    role:'admin'
                },
                secret,
                {
                    expiresIn:86400
                }
            )
            return {
                code:0,
                user:{
                    username:body.username
                },
                token:token
            }
        }
    }
]