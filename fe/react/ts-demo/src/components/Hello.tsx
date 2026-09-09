import * as React from 'react';
interface Props{
    // props 需要满足的接口约束
    username:string 
    
  
}

// 类型别名
// type Props = {
//     username:string,
//     age:number
// }
// 大白话：写一个接口Props，定义Props这个类型约束
// 再通过泛型把上面的接口引入Props，告诉Ts 这个组件的props要遵守Props规则
const Hello:React.FC<Props> =  (props) => {
    
    return(
        <h2>
            Hello  {props.username}
     
        </h2>
    )
}

export default Hello;