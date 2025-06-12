import React from 'react'
import ProfileSideBar from './../components/Profile/ProfileSideBar'
import { useAppSelector } from '../react-redux/hooks/reduxHooks'
import { Container } from '@mui/material'
import OrderCard from '../components/Orders/OrderCard'



const Orders = () => {

  const orders = useAppSelector((state)=>state?.profile?.profile?.orders)
  React.useEffect(()=>{

  },[])
  console.log(orders)
  return (
    <div style={{display:"flex"}}> 
        <ProfileSideBar/>
        <Container>


            {orders?.length > 0 ?<> {orders.map((order)=>(
                <div style={{display:"flex",flexDirection:"column",flexWrap:"wrap"}}>
                    <OrderCard key={order?._id} {...order} />
                </div>
            ))}</> : <h1>Buy your first Product </h1>}

        </Container>
    </div>
  )
}

export default Orders
