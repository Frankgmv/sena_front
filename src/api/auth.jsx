import axios from "./instance";

export const registroRequest = data => axios.post(`/validacion/registro`, data);

export const loginRequest = data => axios.post('/validacion/login', data);

export const logoutRequest = () => axios.post(`/validacion/logout`);

export const verificarTokenRequest = () => axios.get(`/validacion/verificar`)

export const perfil = () => axios.get(`/validacion/perfil`)