import React from 'react'
import { useAppSelector } from '../react-redux/hooks/reduxHooks'
import Dashboard from "../components/Admin/Dashboard/Dashboard"
import HomeCard from "../components/Customer/HomeCard" 
import Books from '../components/FakerApi/Books'
import GLBViewer, { GLB, STL } from '../components/3D/Three'


const Home = () => {
  const decodedData = useAppSelector((state)=>state?.user?.decodedData)
  console.log(decodedData,"home")
  return (
    <>
      {
        (decodedData && Object?.entries(decodedData)?.length>=0 || decodedData===null && <HomeCard/>) && (decodedData?.role==="Admin" || decodedData?.role==="SuperAdmin") ? <Dashboard/> : <HomeCard/>
      }
      {/* <STL/> */}
      {/* <GLB/> */}
      {/* <GLBViewer/> */}

      {/* <Books/> */}
    </>
  )
}

export default Home
