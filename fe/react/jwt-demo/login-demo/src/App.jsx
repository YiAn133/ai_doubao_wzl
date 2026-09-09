import{
  useAuthStore
} from './store/user'
import React,{lazy , Suspense,useEffect} from 'react';
import {Routes , Route , BrowserRouter as Router} from 'react-router-dom'
import Nav from './component/Nav'
import { getRepo } from './api/repo';

// 路由守卫组件
import RequireAuth from './component/RequireAuth'
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Pay = lazy(() => import('./pages/Pay'));

function App(){
  // 组件状态几乎都不放在component中 而是放在store
  const token = useAuthStore(state => state.token);
    console.log(token);
    // useEffect(() => {
    //   (async () => {const res = await getRepo();console.log(res);
    //   })()

    // } , []);
  return (
    <>
    <Router>
      <Nav/>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Login' element={<Login/>}></Route>
           <Route path='/pay' element={<RequireAuth><Pay/></RequireAuth>}></Route>
        </Routes>
      </Suspense>
    </Router>
  
    
    </>
  )

}

export default App;