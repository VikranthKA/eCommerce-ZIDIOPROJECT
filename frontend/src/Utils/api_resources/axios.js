import axios from 'axios'

export default axios.create({
    baseURL:"http://localhost:3331",
    withCredentials: true, //cookies are sent with requests

})