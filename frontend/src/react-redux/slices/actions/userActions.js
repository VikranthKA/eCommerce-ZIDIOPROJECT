import { TOKEN } from '../../constants/constantTypes'
import { jwtDecode } from 'jwt-decode'


export const decodeToken = () => {
    const decode = jwtDecode(document.getCookie)//wrong

    return {
        type: TOKEN,
        payload: decode
    }
}