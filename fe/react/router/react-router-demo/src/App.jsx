import{
  //location.hash:获取当前页面的hash
  HashRouter as Router,
  Routes,//路由配置数组
  Route,//路由配置项
  Navigate//重定向组件：渲染这个组件就会跳转到目标地址
}from 'react-router-dom'
import{
  lazy,
  Suspense
}from 'react'
import Navigation from './components/Navigation'
// import Home from './pages/Home'
// import About from './pages/About'
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const UserProfile = lazy(() => import('./pages/UserProfile'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/Products/Detail'))
const NewProduct = lazy(() => import('./pages/Products/New'));
const Login = lazy(() => import('./pages/Login'));
// 保安组件：检查url当前的状态是否满足
const ProtectRoute = lazy(() => import('./ProtectRoute'))
const Pay = lazy(() => import('./pages/Pay'));


// 总结：学的是关于路由的知识：路由存在的意义是，让页面不刷新的情况下，能够切换组件，实现SPA，单页完成多项内容的展示
// 需要引入hashRouter，Routes，Route
// 在处理过程中，发现每次浏览器都要读取一遍Route，这样过于的慢了，执行懒处理，引入lazy，Suspense，需要懒处理的元素都要放在Suspense中
// 并且学习一个可以替代a标签的东西，Link ，它与a标签的区别是，能够在不刷新页面的情况下，更换hash
// 学习了多级路由Route中套着Route，里面有个API，Outlet，显示子路由，还要useParams这个方法，动态的获取路由值
const App = () => {
  return (
    <>
    {/*  */}
    <Router>
      
      <Suspense fallback={<div>Loading....</div>}>
      {/* 导航 */}
      <Navigation />

      <div id="container">
      {/* 动态页面切换部分 ，又是配置，又是页面出现的地方*/}
      <Routes>
        {/* 虽然内部有很多Route，但是只会显示一个，根据location.hash显示组件 */}
        {/* 思考：如果说我有很多Route，那么加载页面会很慢，如果能实现只加载当前页面组件内容，用路由懒加载 */}
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/user/:id" element={<UserProfile/>} />
        {/* 多级路由 */}
        <Route path='/products' element={<Products/>}>
        {/* 这里是相对父级的路由，只要没有/那么就是相对路径，自动拼接父级路径 */}
          <Route path=':productId' element={< ProductDetail/>}></Route>
          <Route path='new' element={<NewProduct/>}></Route>
        </Route>
        <Route path='/old-path' element={<Navigate replace to ="/new-path/"/>}></Route>
        <Route path="/login" element={<Login />} />
           <Route path="/pay" element={
            <ProtectRoute>
              {/* children */}
              <Pay/>
            </ProtectRoute>
           } />
        {/* 贪婪匹配所有，写在最后面，如果前面的url都没有匹配到，那么就404 */}
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      </div>
      </Suspense>
    </Router>
    </>
  )
}



export default App
