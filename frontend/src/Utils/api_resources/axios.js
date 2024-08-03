import axios from 'axios'

export default axios.create({
    baseURL:"http://localhost:3333",
    withCredentials: true, //cookies are sent with requests

})