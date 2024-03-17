import axios from "./instance";

// ! Archivos

export const getArchivoRequest = (id) => axios.get(`/multimedia/archivos`);

export const postArchivoRequest = (data) => axios.post(`/multimedia/archivos`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const deleteArchivoRequest = () => axios.delete(`/multimedia/archivos`);

// ! Galeria

export const getAllGaleriaRequest = () => axios.get(`/multimedia/galeria`);

export const getGaleriaRequest = (id) => axios.get(`/multimedia/galeria/${id}`);

export const postGaleriaRequest = (data) => axios.post(`/multimedia/galeria`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const putGaleriaRequest = (id, data) => axios.put(`/multimedia/galeria/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const deleteGaleriaRequest = (id) => axios.delete(`/multimedia/galeria/${id}`);

// ! Videos

export const getAllVideosRequest = () => axios.get(`/multimedia/videos`);

export const getVideoRequest = (id) => axios.get(`/multimedia/videos/${id}`);

export const postVideoRequest = (data) => axios.post(`/multimedia/videos`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const putVideoRequest = (id, data) => axios.put(`/multimedia/videos/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const deleteVideoRequest = (id) => axios.delete(`/multimedia/videos/${id}`);

// ! Slider

export const getAllSliderRequest = () => axios.get(`/multimedia/slider`);

export const getSliderRequest = (id) => axios.get(`/multimedia/slider/${id}`);

export const postSliderRequest = (data) => axios.post(`/multimedia/slider`, data);

export const deleteSliderRequest = (id) => axios.delete(`/multimedia/slider/${id}`);