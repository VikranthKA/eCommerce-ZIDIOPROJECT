import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import OrderCard from '../../Orders/OrderCard'
import { useDispatch, useSelector } from 'react-redux'
import AdminOrderCard from './adminOrderCard'
import { fetchAllOrdersforAdmin } from '../../../react-redux/slices/actions/adminActions'

const AdminOrder = () => {

    const orders = useSelector(state=>state.admin.orders)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchAllOrdersforAdmin())
    },[])
  return (
    <>
<Container>
                {orders?.length > 0 &&
                <>
                 {orders.map((order)=>(
                <div style={{display:"flex",flexDirection:"column",flexWrap:"wrap"}}>
                    <AdminOrderCard key={order?._id} {...order} />
                </div>
            ))}
            </>
}
</Container>
</>
  )
}

export default AdminOrder
