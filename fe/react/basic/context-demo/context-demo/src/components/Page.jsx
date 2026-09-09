import Child from './Child.jsx'
import{
    useTheme
}from '../hooks/useTheme.js'
const Page = () => {
    const thme = useTheme();
    return(
        <>
        Page {thme}
        <Child/>
        </>
    )
}

export default Page;