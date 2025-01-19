import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css' // importing in the root applies to all children
import App9 from './components/landing/App.jsx'
import Login from './components/login/App.jsx'
import Signup from './components/signup/App.jsx'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <h1>Web Tech 2024</h1>
    <BrowserRouter>
    <nav>
        <ul style={{display: "inline-flex"}}>
            <li>
                <Link to="/"> Shop </Link>
            </li>
            <li>
                <Link to="/login"> Login </Link>
            </li>
            <li>
                <Link to="/account"> Account </Link>
            </li>
            <li>
                <Link to="/signup"> Sign up</Link>
            </li>
        </ul>
    </nav>
        <Routes>
            {/*<Route path="/myitems" element={}></Route>
                <Route path="/account/*" element={}></Route>*/}
            <Route path="/signup/*" element={<Signup/>}></Route>
            <Route path='/login/*' element={<Login/>}></Route>
            <Route path='/*' strict element={<App9/>}></Route>
    </Routes>
  </BrowserRouter>
  
  </StrictMode>,
)
