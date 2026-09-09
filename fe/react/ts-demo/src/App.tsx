import * as React from 'react';
import HelloComponent from './components/Hello'
import NameEditingComponent from './components/NameEditingComponent';
const App:React.FC = () => {
    const [name , setName] = React.useState<string>("default");
    const [editingName , seteditingName] = React.useState("default")
    
    const loadUsername = () => {
        setTimeout(() => {
            setName("name from async call");
            seteditingName("name from async call")
        } , 2000);
    }
    // 副作用
    // 只在挂载的时候执行
    // 1次
    React.useEffect(() => {
        loadUsername();
    } , [])

    const setUserNameState = () => {
        setName(editingName);
    }
    return (
        <>
        名字：{name}
        <HelloComponent username={editingName} />
        <NameEditingComponent 
        editingName={editingName} //当前加载的name
        onNameUpdated={setName} //更新最后的name
        onEditingNameUpdated={seteditingName}//更新加载的name
        disabled={editingName === "" || editingName === name}//观察每次加载的name是否改变了，只有改变了，按钮才能用
        />
        </>
    )
}

export default App;