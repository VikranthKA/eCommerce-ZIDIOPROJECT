import {GET_ALL_CATEGORY,FETCH_CATEGORIES_FAILURE,SET_CATEGORIES,CREATE_CATEGORY} from "../../constants/constantTypes"

const initialState ={
    category : [],
    error:null
}

const categoryReducers =(state=initialState,action)=>{
    switch(action.type){
        case SET_CATEGORIES:
            console.log(action,"cat reducer")
            return{
                ...state,
                category:action.payload,
                error:null
            }
        case FETCH_CATEGORIES_FAILURE:
            return {
                ...state,
                error:action.payload
            }

        default:
            return state;
    }

}

export default categoryReducers