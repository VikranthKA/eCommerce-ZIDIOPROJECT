import {TOKEN} from "../../constants/constantTypes"



const initialState = {
    userToken : " ",
}


const countReducers =(state=initialState,action)=>{
    switch(action.type){
        case TOKEN:
            return{
                ...state,
                userToken:action.payload
            }
        default:
            return state;
    }

}

export default countReducers