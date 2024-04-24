// TODO implementar variable de entorno

// const URL = import.meta.env.VITE_API
const URL = import.meta.env.VITE_API || 'https://sena-project.onrender.com'

export const URL_CREADORES = 'https://senadevsportafolio.netlify.app/'

export const BASE_URL_API = `${URL}/api/v1`

export const MOSTRAR_ARCHIVO = (path) => `${BASE_URL_API}/recursos/${path}`
