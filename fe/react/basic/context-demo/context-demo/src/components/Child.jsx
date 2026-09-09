
import{
    useTheme
}from '../hooks/useTheme'

export default function Child(){
    const theme = useTheme();
    console.log(theme);
    
    return(
        <>
        <div>Child</div>
        <button className={theme}>按钮{theme}</button>
        </>
    )
}