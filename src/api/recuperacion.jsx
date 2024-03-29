import axios from "./instance";

export const crearCodigoRequest = data => axios.post(`/recuperacion/crear-codigo`, data);

export const validarCodigoRequest = data => axios.post('/recuperacion/validar-codigo', data);

export const nuevoPasswordRequest = ({ id, password, credential }) => axios.put(`/recuperacion/nuevo-password/${id}`, { password }, {
    headers: {
        'credential-reset': credential ? credential : ''
    }
})