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
import PrivateRoute from './components/Private/PrivateRoute'
import { ToastContainer } from 'react-toastify'
import { getAllProducts } from './react-redux/slices/actions/productActions'
import ProductInfo from "./components/Products/ProductInfo"
import CreateProduct from "./components/Admin/Products/CreateProduct"
import Address from './components/Profile/Address/Address'
import Orders from './pages/Orders'
import Payments from './components/Profile/Payments'
import Settings from './components/Profile/Settings'
import { getLoginedUserProfile } from './react-redux/slices/actions/profileActions'
import { getAllCartItems } from './react-redux/slices/actions/cartItemsActions'
import Cart from './pages/Cart'
import { getAllCategory } from './react-redux/slices/actions/categoryActions'
import OrderCheckOut from './components/Orders/OrderCheckOut'
import Success from './pages/Payment/Success'
import Cancel from './pages/Payment/Cancel'



const App = () => {
  const dispatch = useAppDispatch()
  const userData = useAppSelector(state=>state.user)

  useEffect(()=>{
    (async()=>{
      dispatch(getAllProducts())
      dispatch(getAllCategory())
    })()
    },[])
  
  useEffect(()=>{
    if(userData?.decodedData?.role){
      dispatch(getLoginedUserProfile())
      dispatch(getAllCartItems())
    }
  },[userData?.decodedData])
  return (
    <div >

 

      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/aboutUS" element={<AboutUs/>}/>
        <Route path="/contactUS" element={<ContactUs/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/product/:productId" element={<ProductInfo/>}/>

        <Route element={<PrivateRoute roles={['Admin','Customer',"SuperAdmin"]}/>}>
          <Route path='/profile' element={<Profile/>} />
          <Route path='/settings' element={<Settings/>} />
        </Route>

        <Route element={<PrivateRoute roles={["SuperAdmin"]}/>}>
          <Route path='/product/edit/:productId' element={<CreateProduct/>} />
          <Route path='/coupon' element={<p>Coupon page yet to create</p>} />
        </Route>

        <Route element={<PrivateRoute roles={["Customer"]}/>}>
          <Route path='/address' element={<Address/>} />
          <Route path='/orders' element={<Orders/>} />
          <Route path='/payment' element={<Payments/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/checkout' element={<OrderCheckOut/>} />
          <Route path='/cancel' element={<Cancel/>}/>
          <Route path='/success' element={<Success/>}/>
        </Route>

      </Routes>
      <ToastContainer/>
    </div>
  )
}



export default App