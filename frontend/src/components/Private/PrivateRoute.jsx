import React from 'react'
import {Route,redirect, useNavigate} from 'react-router-dom'
import { useAppSelector } from '../../react-redux/hooks/reduxHooks'


const PrivateRoute = ({component:Component,roles,...rest}) => {
    const {user} = useAppSelector(state=>state)
    const navigate = useNavigate()
  return (
    <Route
        {...rest}
        render={props =>{
            if(!user.isLogin){
                return navigate("/login")
            }

            const userRole = user.decodedData.role
            if(userRole && !userRole.includes(userRole)){
                return navigate("/")
            }

            return <Component {...props} />
        }}
    />
  )
}

export default PrivateRoute
