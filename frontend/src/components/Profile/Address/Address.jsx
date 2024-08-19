import React from 'react'
import ProfileSideBar from '../ProfileSideBar'
import { Container } from '@mui/material'
import { useAppSelector } from '../../../react-redux/hooks/reduxHooks'
import AdddressCard from './AdddressCard'
import AddressForm from './AddressForm'

const Address = () => {
  const {profile} = useAppSelector(state=>state.profile)
  return (
    <div style={{display:"flex"}}>
        <ProfileSideBar/>
        <Container sx={{display:"flex",justifyContent:"space-around",flexWrap:"wrap"}}>
          {profile?.address ? <>
            {profile.addresses.map((address)=>(
              <AdddressCard key={address._id} {...address}/>
            ))}
            </> 
             : 
            <>
              {
                (!profile.address || profile.address.length <= 3) && <AddressForm/>
              }
            </>

            
          }

        </Container>

     
    </div>
  )
}

export default Address
