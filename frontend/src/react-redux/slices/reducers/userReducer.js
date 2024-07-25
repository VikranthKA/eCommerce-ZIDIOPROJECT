import {TOKEN,LOGIN,LOGOUT} from "../../constants/constantTypes"



const initialState = {
    userToken : null,
    isLogin : false,
    isLogout : true,
    decodedData :null
}


const userReducers =(state=initialState,action)=>{
    switch(action.type){
        case TOKEN:
            return{
                ...state,
                userToken:action.payload
            }
        case LOGIN:
            return {
                ...state,
                isLogin:true,
                isLogout:false,
                decodedData:action.payload.decodeToken,
                userToken:action.payload.jwt_token
            }

        
        case LOGOUT:
            return {
                ...state,
                isLogin:false,
                isLogout:true,
                userToken:null,
                decodedData:null
            }
        default:
            return state;
    }

}

export default userReducers