import * as React from 'react';

interface Props{
  
    editingName: string;
    onNameUpdated: (editingName:string) => void ;
    onEditingNameUpdated: (newEditingName:string) => void;
    disabled: boolean;
}


const NameEditingComponent:React.FC<Props> = (props) => {
    const {editingName , onEditingNameUpdated , onNameUpdated , disabled} = props;
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        onEditingNameUpdated(e.target.value);
    }
    const onNameSubmit = () => {
        // 这里的含义是如果点击了提交按钮，那么就调用传进来的函数（修改name的值）
        onNameUpdated(editingName);
    }


    return (
        <>
        <label htmlFor="">Update name:</label>
        <input type="text" 
        value={editingName}
        onChange={onChange}
        />
        <button onClick={onNameSubmit} disabled={disabled}>change</button>
        </>
    )
}

export default NameEditingComponent;