import {Link} from 'react-router-dom'

const  Nav = () => {
    return (
        <>
        <nav style={{padding:10,borderBottom:'1px solid #ccc' }}>
        <Link to="/">Home</Link>
        <br />
         <Link to="/todos">Todos</Link>
        </nav>
        </>
    ) 
}

export default Nav;