import axios from 'axios'
import { getLocalStorage } from '../assets/includes/localStorage';
const getCredential = () => {
    const token = getLocalStorage('token');
    return token ? `Bearer ${token}` : '';
}

const api = axios.create({
    baseURL: 'http://localhost:9000/api/v1'
})

api.interceptors.request.use((request) =>{
    let token = getCredential();
    request.headers.Authorization  = token
    return request
})

export default api