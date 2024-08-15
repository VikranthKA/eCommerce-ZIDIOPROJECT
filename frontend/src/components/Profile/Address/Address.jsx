import React from 'react'
import ProfileSideBar from '../ProfileSideBar'
import { Container } from '@mui/material'
import AddressForm from './AddressForm'

const Address = () => {
  return (
    <div style={{display:"flex"}}>
        <ProfileSideBar/>
        <Container>
           <AddressForm/>
        </Container>

     
    </div>
  )
}

export default Address
