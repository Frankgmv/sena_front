
import axios from "./instance";

export const getUsuarioRequest = () => axios.get(`/data/usuarios`);

export const postUsuarioRequest = (usuario) => axios.post(`/data/usuarios`, usuario);

export const getRolesRequest = () => axios.get(`/data/roles`);