import React from 'react'
import ProfileSideBar from '../ProfileSideBar'
import { Container } from '@mui/material'
import { useAppSelector } from '../../../react-redux/hooks/reduxHooks'
import AdddressCard from './AdddressCard'

const Address = () => {
  const {profile} = useAppSelector(state=>state.profile)
  return (
    <div style={{display:"flex"}}>
        <ProfileSideBar/>
        <Container>
          {
            profile.addresses.map((address)=>(
              <AdddressCard key={address._id} {...address}/>
            ))
            
          }

        </Container>

     
    </div>
  )
}

export default Address
