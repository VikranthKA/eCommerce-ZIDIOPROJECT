import Cookies from "universal-cookie";

const cookies = new Cookies()

export const cookieConfig={
    headers:{
        Authorization:cookies.get("jwt_authorization"),
        'Content-Type':'application/json'
    },
}


