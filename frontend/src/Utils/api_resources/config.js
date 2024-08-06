import Cookies from "universal-cookie";

const cookies = new Cookies()

export const config={
    headers:{
        Authorization:cookies.get("jwt_authorization"),
        'Content-Type':'application/json',
        withCredentials: true,

    },
}

export const fileConfig = {
    headers: {
        Authorization: cookies.get("jwt_authorization"),
        'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
}






