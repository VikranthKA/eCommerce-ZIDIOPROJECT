import React from 'react'
import { useAppSelector } from '../react-redux/hooks/reduxHooks'
import Dashboard from "../components/Admin/Dashboard/Dashboard"
import HomeCard from "../components/Customer/HomeCard"


const Home = () => {
  const decodedData = useAppSelector((state)=>state?.user?.decodedData)
  console.log(decodedData,"home")
  return (
    <>
      {
        (decodedData && Object?.entries(decodedData)?.length>=0 || decodedData===null && <HomeCard/>) && (decodedData?.role==="Admin" || decodedData?.role==="SuperAdmin") ? <Dashboard/> : <HomeCard/>
      }
    </>
  )
}

export default Home
