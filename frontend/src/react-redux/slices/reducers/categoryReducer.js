import {GET_ALL_CATEGORY,CREATE_CATEGORY} from "../../constants/constantTypes"



const initialState ={
    category : []
}


const categoryReducers =(state=initialState,action)=>{
    switch(action.type){
        case GET_ALL_CATEGORY:
            return{
                ...state,
                category:action.payload
            }

        default:
            return state;
    }

}

export default categoryReducers