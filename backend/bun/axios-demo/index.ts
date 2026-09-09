import axios  from "axios";
import dotenv from "dotenv"
dotenv.config();

async function chat() {
    try{

        const response = await axios.post(`${process.env.DEEPSEEK_BASE_URL}`,{
            model:'deepseek-v4-flash',
            messages:[{
                'role':"user",
                'content':'您好,请介绍一下Bun'
            }]
        },{
            headers:{
                'content-Type':'application/json',
                Authorization:`Bearer ${process.env.DEEPSEEK_API}`
            }
        });
        console.log(response.data.choices[0].message.content);
        
    }catch(error){
        console.log(error);
        

    }
}

chat();