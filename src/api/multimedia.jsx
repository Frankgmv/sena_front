import axios from "./instance";

export const postVideoRequest = (form) => axios.post(`/multimedia/videos`, form, {
    headers: { 'Content-Type': 'multipart/form-data' }
});