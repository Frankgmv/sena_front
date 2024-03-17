
import axios from "./instance";

// ! PQRS

export const getAllPQRSRequest = () => axios.get(`/informacion/pqrs`);

export const getPQRSRequest = (id) => axios.get(`/informacion/pqrs/${id}`);

export const putPQRSRequest = (id, PQRS) => axios.put(`/informacion/pqrs/${id}`, PQRS);

export const deletePQRSRequest = (id) => axios.delete(`/informacion/pqrs/${id}`);

// ! Notificaciones

export const getAllNotificacionesRequest = () => axios.get(`/informacion/notificaciones`);

export const getNotificacionRequest = (id) => axios.get(`/informacion/notificaciones/${id}`);

export const postNotificacionRequest = (notificacion) => axios.post(`/informacion/notificaciones`, notificacion);

export const putNotificacionRequest = (id, notificacion) => axios.put(`/informacion/notificaciones/${id}`, notificacion);

export const deleteNotificacionRequest = (id) => axios.delete(`/informacion/notificaciones/${id}`);

// ! Historial

export const getHistorialRequest = () => axios.get(`/informacion/historial`);

export const postHistorialRequest = (historial) => axios.post(`/informacion/historial`, historial);

export const deleteHistorialRequest = () => axios.delete(`/informacion/historial-all`);
