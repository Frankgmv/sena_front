// TODO implementar variable de entorno

const URL = import.meta.env.VITE_API

export const URL_CREADORES = 'https://senadevsportafolio.netlify.app/'

export const BASE_URL_API = `${URL}/api/v1`

export const MOSTRAR_ARCHIVO = (path) => `${BASE_URL_API}/recursos/${path}`
