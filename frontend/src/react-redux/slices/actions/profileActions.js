import { ERROR_IN_USER_PROFILE, GET_LOGINED_PROFILE_SAGA, SET_USER_PROFILE } from "../../constants/constantTypes"


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

