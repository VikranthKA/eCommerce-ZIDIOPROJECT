import React, { useEffect } from 'react'
import Header from './components/Layout/Header'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import AboutUs from "./pages/AboutUS"
import ContactUs from "./pages/ContactUs"
import Products from './pages/Products'
import Profile from './pages/Profile/Profile'
// import {STL,GLB} from './components/3D/Three'
import Dashboard from './components/Admin/Dashboard/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
// import Spline from '@splinetool/react-spline/next';
import axios from './Utils/api_resources/axios'
import {verifyLogin} from "./react-redux/slices/actions/userActions" 
import { useAppDispatch, useAppSelector } from './react-redux/hooks/reduxHooks'



const App = () => {
  const dispatch = useAppDispatch()
  const userData = useAppSelector(state=>state.user)

  useEffect(()=>{
    (async()=>{
      // dispatch(verifyLogin())
    })()
    },[])
  return (
    <div >

 

      <Header/>
      <Routes>
        <Route path="/" element={userData.isLogin && userData.decodedData.role==="Customer" && <Home/> || userData.decodedData==="Admin" || "SuperAdmin" && <Dashboard/> }/>
        <Route path="/aboutUS" element={<AboutUs/>}/>
        <Route path="/contactUS" element={<ContactUs/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>






      </Routes>
    </div>
  )
}



export default App