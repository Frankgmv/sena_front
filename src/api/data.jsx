
import axios from "./instance";

export const getUsuariosRequest = () => axios.get(`/data/usuarios`);

export const getUsuarioRequest = (id) => axios.get(`/data/usuarios/${id}`);

export const postUsuarioRequest = (usuario) => axios.post(`/data/usuarios`, usuario);

export const putUsuarioRequest = (id, usuario) => axios.put(`/data/usuarios/${id}`, usuario);

export const deleteUsuarioRequest = (id) => axios.delete(`/data/usuarios/${id}`);

export const getRolesRequest = () => axios.get(`/data/roles`);