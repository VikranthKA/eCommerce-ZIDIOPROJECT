import React from 'react'
import Header from './components/Layout/Header'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import AboutUs from "./pages/AboutUS"
import ContactUs from "./pages/ContactUs"
import Products from './pages/Products'
import Profile from './pages/Profile/Profile'
import {STL,GLB} from './components/3D/Three'
// import Spline from '@splinetool/react-spline/next';



const App = () => {
  return (
    <div >
      {/* <STL/> */}
      <GLB/>


      <div style={{ width: '100vw', height: '100vh' }}>
      <iframe 
        src="https://prod.spline.design/rdEVDYY84JWdk8pO/scene.splinecode" 
        frameBorder="0" 
        width="100%" 
        height="100%" 
        style={{ display: 'block' }}
        title="Spline Scene"
      ></iframe>
    </div>
 

      {/* <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/aboutUS" element={<AboutUs/>}/>
        <Route path="/contactUS" element={<ContactUs/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/3d" element={<ThreeDScene/>}/>





      </Routes> */}
    </div>
  )
}



export default App