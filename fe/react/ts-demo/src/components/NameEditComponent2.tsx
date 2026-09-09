import * as React from 'react';

// interface Props{
//     username:string,
//     onChange:(e:React.ChangeEvent<HTMLInputElement>) => void//表示传递的是一个函数
// }



// const NameEditComponent:React.FC<Props> = (props) => {
//     return (
//         <div>
//             <label htmlFor="">Update name:</label>
            
//             <input value={props.username} onChange={props.onChange} />
//         </div>
//     )

// }


interface Props{
    // 接口不是json 用;隔开
    initialUserName:string;
    onNameUpdated:(newName:string) => void;
}
// 这里优化点：只用父组件提供原始数据，通过子组件修改，再将修改后的名称交给父组件
// 之前的写法是传递一个函数，那个函数是意义是获得当前表单的内容，再进行修改（父组件中修改），父组件传递函数的参数是事件
// 如今的写法是传递一个函数，但是函数的意义是获得当前表单的内容，再子组件中进行修改，再执行父组件的传递函数
// 那个函数的参数是名字
const NameEditComponent:React.FC<Props> = (props) => {
    const [editing , setediting] = React.useState(props.initialUserName);
    
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setediting(e.target.value);
    }
    const onNameSubmit = () => {
        props.onNameUpdated(editing)
    }
    return (
        <>
        <label htmlFor="">Change name:</label>
        <input  value={editing} onChange={onChange} />
        <button onClick={onNameSubmit}>Change</button>
        </>
    )
}


export default NameEditComponent;