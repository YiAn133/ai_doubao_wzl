export default [
    {
        url:'/api/todos',
        method:'get',
        timeout:2000,
        response:(req,res) => {
            return {
                code:0,//没有问题
                todos:[
                    {
                        id:1,
                        title:'学习前端接口工程',
                        completed:true
                    },
                    {
                         id:2,
                        title:'学习后端',
                        completed:false
                    }
                ]
            }
        }
    }
]