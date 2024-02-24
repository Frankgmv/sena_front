
import axios from "./instance";


export const getUsuarioRequest = () => axios.get(`/data/usuarios`);

export const getRolesRequest = () => axios.get(`/data/roles`);