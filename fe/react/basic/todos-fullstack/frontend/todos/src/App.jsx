import React , {lazy , Suspense} from "react";

import { Routes , Route , BrowserRouter as Router } from 'react-router-dom'

import Nav from './components/Nav'

const Home = lazy(() => import('./pages/Home'))
const Todos = lazy(() => import('./pages/Todos'));

function App(){
  return(
    <>
    <Router>
    <Nav />
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/todos" element={<Todos />}></Route>
    </Routes>
    </Router>
   
    </>
  )
}

export default App;