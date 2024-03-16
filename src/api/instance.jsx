import axios from 'axios'
import { getLocalStorage } from '../assets/includes/localStorage';
import { BASE_URL_API } from '../assets/includes/variables';
const getCredential = () => {
    const token = getLocalStorage('token');
    return token ? `Bearer ${token}` : '';
}

const api = axios.create({
    baseURL: BASE_URL_API
})

api.interceptors.request.use((request) =>{
    let token = getCredential();
    request.headers.Authorization  = token
    return request
})

export default api