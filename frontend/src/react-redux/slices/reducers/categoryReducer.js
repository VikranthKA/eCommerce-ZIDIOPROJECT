import {GET_ALL_CATEGORY,FETCH_CATEGORIES_FAILURE,SET_CATEGORIES,CREATE_CATEGORY, EDIT_CATEGORY_ID, REMOVE_CATEGORY_EDIT_ID} from "../../constants/constantTypes"

const initialState ={
    editId:"",
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
        case EDIT_CATEGORY_ID:
            return {
                ...state,
                editId:action.payload
            }
        case REMOVE_CATEGORY_EDIT_ID:
            return {
                ...state,
                editId:null
            }

        default:
            return state;
    }

}

export default categoryReducers