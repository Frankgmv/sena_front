import axios from "./instance";

export const getRolesRequest = () => axios.get(`/data/roles`);

export const getUsuarioRequest = () => axios.get(`/data/usuarios`);