import {CREATE_CATEGORY, DELETE_CATEGORY_SAGA, EDIT_CATEGORY_ID, FETCH_CATEGORIES_FAILURE, GET_ALL_CATEGORY, REMOVE_CATEGORY_EDIT_ID, SET_CATEGORIES, SET_CREATED_CATEGORIES, SET_DELETED_CATEGORIES, SET_UPDATED_CATEGORIES, UPDATE_CATEGORY_SAGA } from "../../constants/constantTypes";

export const getAllCategory = () => {
    return {
        type: GET_ALL_CATEGORY
    };
};


export const setCategories=(categories)=>{
    console.log("in set Category",categories)
   return {
    type:SET_CATEGORIES,
    payload:categories
}
}


export const createCategory = (data,_id) => {
    console.log("createCategory",...data)
    return {
        type: CREATE_CATEGORY,
        payload:data
    }
}

export const updatedCategorySaga=(data,_id)=>{
    console.log("updateCategory")
    return {
        type: UPDATE_CATEGORY_SAGA,
        payload:{
            data,
            _id
        }
    }
}

export const setCreatedCategoryData = (data)=>{
    console.log("setCreatedData",data)
    return{
        type:SET_CREATED_CATEGORIES,
        payload:data
    }
}

export const setUpdatedCategoryData = (data)=>{
    console.log("setCreatedData",data)
    return{
        type:SET_UPDATED_CATEGORIES,
        payload:data
    }
}

export const  fetchCategoriesFailure=(error)=>{
    console.log(error,"error")
return{    type:FETCH_CATEGORIES_FAILURE,
    payload:error}
}

export const getCategoryIdForEdit = (_id)=>({
    type:EDIT_CATEGORY_ID,
    payload:_id
})

export const removeCategoryIdForEdit =(_id)=>{
    console.log("in action r")
    return{
    type:REMOVE_CATEGORY_EDIT_ID,
    payload:_id
    }
    
}

export const removeCategory=(_id)=>{
    console.log("in Action")
    return{
        type:DELETE_CATEGORY_SAGA,
        payload:{
            _id
        }

    }


}

export const setRemovedCategory =(data)=>({
    type:SET_DELETED_CATEGORIES,
    payload:data
})


