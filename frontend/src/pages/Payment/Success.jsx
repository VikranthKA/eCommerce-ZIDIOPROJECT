import React,{useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import { Button } from '@mui/material'
import { useAppDispatch } from '../../react-redux/hooks/reduxHooks'
import { updatePayment } from '../../react-redux/slices/actions/paymentAction'

function Success() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(updatePayment())
  },[])

  return (
    <div style={{}}>
      <div style={{display:"flex",justifyContent:"space-around"}} >

      <Link to="/"><Button>Home</Button></Link>
      <Link to="/profile"><Button>Profile</Button></Link>
      </div>
      <ToastContainer/>
    </div>
  );

  
  
}

export default Success