import { ERROR_IN_USER_PROFILE, SET_USER_PROFILE } from "../../constants/constantTypes"



const initialState ={
    profile:null,
    profileError:null
}


const profileReducers =(state=initialState,action)=>{
    switch(action.type){
        case SET_USER_PROFILE:
            return{
                ...state,
                profile:action.payload
            }
        case ERROR_IN_USER_PROFILE:
            return {
                ...state,
                profileError:action.payload
            }

        default:
            return state;
    }

}

export default profileReducers