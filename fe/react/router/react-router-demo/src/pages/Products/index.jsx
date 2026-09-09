import{
    Outlet
} from 'react-router-dom'
//渲染出子路由

const Products = () => {
    return(
        <>
        <h1>产品列表</h1>
        <Outlet />
        </>
    )
}
export default Products;