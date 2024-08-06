import {GET_ALL_CATEGORY,FETCH_CATEGORIES_FAILURE,SET_CATEGORIES,CREATE_CATEGORY, EDIT_CATEGORY_ID, REMOVE_CATEGORY_EDIT_ID, SET_CREATED_CATEGORIES, SET_UPDATED_CATEGORIES, SET_DELETED_CATEGORIES} from "../../constants/constantTypes"

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
        case SET_CREATED_CATEGORIES:
            return {
                ...state,
                category:[action.payload,...state.category]
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
        case SET_UPDATED_CATEGORIES:
            console.log(action.payload,"cat update")
            return{
                ...state,
                category:state.category.map((cat)=>{
                    if(cat._id===action.payload.data._id){
                        return action.payload.data
                    }else{
                        return cat
                    }

                }),
                editId:null
            }
        case SET_DELETED_CATEGORIES:
            return{
                ...state,
                category:state.category.filter((cat)=>cat._id!==action.payload.data._id)
            }

        default:
            return state;
    }

}

export default categoryReducers