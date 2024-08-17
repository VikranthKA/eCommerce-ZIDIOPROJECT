import { ADD_NEW_PROFILE_ADDRESS_SAGA, ERROR_IN_USER_PROFILE, GET_LOGINED_PROFILE_SAGA, SET_CREATED_ADDRESS_USER_PROFILE, SET_USER_PROFILE, UPDATE_ADDRESS_USER_PROFILE_SAGA, UPDATE_USER_PROFILE_SAGA } from "../../constants/constantTypes"


export const getLoginedUserProfile = () => {
    return {
        type: GET_LOGINED_PROFILE_SAGA,
    }
}

export const setFoundUserProfile = (profileData) => {
    return {
        type: SET_USER_PROFILE,
        payload: profileData
    }
}

export const setErrorInUserProfile = (error) => {
    return {
        type: ERROR_IN_USER_PROFILE,
        payload: error
    }
}

export const updateUserProfile = (formData)=>({
    type:UPDATE_USER_PROFILE_SAGA,
    payload:formData
})


export const addNewAddressForUserProfile = (formData)=>({
    type:ADD_NEW_PROFILE_ADDRESS_SAGA,
    payload:formData
})

export const setCreatedAddressForUserProfile = (data)=>({
    type:SET_CREATED_ADDRESS_USER_PROFILE,
    payload:data
})

export const updateTheUserProfileAddress = (formData,addressId)=>({ 
    type:UPDATE_ADDRESS_USER_PROFILE_SAGA,
    payload:{formData,addressId}
})




