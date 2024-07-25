import { TOKEN,LOGIN,LOGOUT } from '../../constants/constantTypes'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'universal-cookie'


const cookies = new Cookies()

export const decodeToken = () => {



}

export const verifyLogout =()=>{
    cookies.remove("jwt_authorization")


    return {
        type:LOGOUT,

    }

}

export const verifyLogin =(jwt_token)=>{
    const decodeToken = jwtDecode(jwt_token)

    //put the decoded data to the store

    cookies.set("jwt_authorization",jwt_token,{
        expires:new Date(decodeToken.exp * 1000)
    })
    return {
        type:LOGIN,
        payload:decodeToken

        
    }
}