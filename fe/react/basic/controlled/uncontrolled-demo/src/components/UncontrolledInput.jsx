import {
    useRef
}from 'react'


function UncontrolledInput(){
    const inputRef = useRef(null);
    const handleCilck = () => {
        console.log(inputRef.current.value);
        
    }
    return (
        <>
        UncontrolledInput
        <input type="text" ref={inputRef} />
        <button onClick={handleCilck}>获取输入值</button>
        </>
    )
}
export default UncontrolledInput;