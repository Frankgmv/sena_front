import { createContext, useContext, useState } from "react"
import { deleteGaleriaRequest, deleteSliderRequest, getAllGaleriaRequest, getAllSliderRequest, getGaleriaRequest, getSliderRequest, postGaleriaRequest, postSliderRequest, putGaleriaRequest, getAllVideosRequest ,getVideoRequest ,postVideoRequest ,putVideoRequest ,deleteVideoRequest} from "../../api/multimedia"
import { getAllEventosRequest, getEventoRequest, postEventoRequest, putEventoRequest, deleteEventoRequest } from "../../api/data" 


import { registerActionHistorial } from "../../assets/includes/historial"
import { handlerMessages } from "../../assets/includes/funciones"

const MultimediaContext = createContext({
    errorsR: [],
    success: [],

    // ! galeria 
    galeria: [],  setErrorsR: () => { },  getGalerias: () => { },  postGaleria: () => { },  getGaleria: () => { },  putGaleria: () => { },  deleteGaleria: () => { },
    
    // ! slider
    slider: [], getSlider: () => { }, getSliderOne: () => { }, postSlider: () => { }, deleteSlider: () => { },

    // ! eventos
    eventos: [], putEvento: () => { }, getEvento: () => { }, getEventos: () => { }, deleteEvento: () => { }, createEvento: () => { },

    // ! videos 
    videos: [], getVideos: () => { }, postVideo: () => { }, getVideo: () => { }, putVideo: () => { }, deleteVideo: () => { }
})

export const useMultimediaContext = () => {
    const context = useContext(MultimediaContext)
    if(!context) throw new Error("Multimedia Context isn't working")
    return context
}

export const MultimediaProvider = ({children}) =>{
    const [errorsR, setErrorsR] = useState([])
    const [success, setSuccess] = useState([])
    
    // ! Galeria

    const [galeria, setGaleria] = useState([])

    const getGalerias = async () => {
        try {
            const response = await getAllGaleriaRequest()
            const data = await response.data
            if (data.ok) setGaleria(data.data)
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.message) handlerMessages(setErrorsR, datos?.message)
            if (error?.message) handlerMessages(setErrorsR, error?.message)
        }
    }

    const getGaleria = async (id) => {
        try {
            const response = await getGaleriaRequest(id)
            const data = await response.data
            if (data.ok) handlerMessages(setSuccess, data?.message)
            return data
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.message) handlerMessages(setErrorsR, datos?.message)
            if (error?.message) handlerMessages(setErrorsR, error?.message)
        }
    }

    const postGaleria = async (dataNoticia, perfil_id) => {
        try {
            const datosNoticia = dataNoticia
            datosNoticia.set('UsuarioId', perfil_id)
            const response = await postGaleriaRequest(datosNoticia)
            const data = await response.data
            if (data.ok) {
                handlerMessages(setSuccess, data?.message)
                await registerActionHistorial(`Creó imagen en galeria`, `Imagen con titulo '${dataNoticia.get('titulo')}'`)
                getGalerias()
            } else handlerMessages(setErrorsR, datos?.message)
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrorsR, error?.message)
                })
            }
            if (datos?.message) handlerMessages(setErrorsR, datos?.message)
            if (error?.message) handlerMessages(setErrorsR, error?.message)
        }
    }


    const putGaleria = async (id, dataNoticia, perfil_id) => {
        try {
            const infoGaleria = await getGaleriaRequest(id)
            const response = await putGaleriaRequest(id, dataNoticia)
            const data = await response.data
            if (data.ok) {
                handlerMessages(setSuccess, data?.message)
                await registerActionHistorial(`Actualizó imagen en galeria`, ` [usuario id, ${perfil_id}] actualizó imagen con titulo '${infoGaleria?.data?.data?.titulo}'`)
                getGalerias()
            } else handlerMessages(setErrorsR, datos?.message)
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrorsR, error?.message)
                })
            }
            if (error?.message) handlerMessages(setErrorsR, error?.message)
            if (datos?.message) handlerMessages(setErrorsR, datos?.message)
        }
    }

    const deleteGaleria = async (id) => {
        try {
            const infoGaleria = await getGaleriaRequest(id)
            const response = await deleteGaleriaRequest(id)
            const data = await response.data
            if (data.ok) {
                handlerMessages(setSuccess, data?.message)
                await registerActionHistorial(`Eliminó imagen en galeria`, `Imagen con titulo '${infoGaleria?.data?.data?.titulo}'`)
                getGalerias()
            }
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.message) handlerMessages(setErrorsR, datos?.message)
            if (error?.message) handlerMessages(setErrorsR, error?.message)
        }
    }

    // ! Slider

    const [slider, setSlider] = useState([]);

    const getSlider = async () => {
        try {
            const response = await getAllSliderRequest()
            const data = await response.data
            if (data.ok) setSlider(data.data)
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.message) handlerMessages(setErrorsR, datos?.message)
            if (error?.message) handlerMessages(setErrorsR, error?.message)
        }
    }

    const getSliderOne = async (id) => {
        try {
            const response = await getSliderRequest(id)
            const data = await response.data
            return data
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.message) handlerMessages(setErrorsR, datos?.message)
            if (error?.message) handlerMessages(setErrorsR, error?.message)
        }
    }

    const postSlider = async (dataSlider, perfil_id) => {
        try {
            const response = await postSliderRequest(dataSlider)
            const data = await response.data
            if (data.ok) {
                handlerMessages(setSuccess, data?.message)
                await registerActionHistorial(`Asignó imagen a Slider`, `Imagen en slider por [usuario id, ${perfil_id}]`)
            } else handlerMessages(setErrorsR, datos?.message)
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrorsR, error?.message)
                })
            }
            if (datos?.message) handlerMessages(setErrorsR, datos?.message)
            if (error?.message) handlerMessages(setErrorsR, error?.message)
        }
    }


    const deleteSlider = async (id, perfil_id) => {
        try {
            const response = await deleteSliderRequest(id)
            const data = await response.data
            if (data.ok) {
                handlerMessages(setSuccess, data?.message)
                getSlider()
                await registerActionHistorial(`Eliminó imagen a Slider`, `Imagen bajada del slider por [usuario id, ${perfil_id}]`)
            }
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.message) handlerMessages(setErrorsR, datos?.message)
            if (error?.message) handlerMessages(setErrorsR, error?.message)
        }
    }

    // ! Eventos

    const [eventos, setEventos] = useState([]);

    const getEventos = async () => {
        try {
            const response = await getAllEventosRequest()
            const data = await response.data
            setEventos(data.data)
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.message) handlerMessages(setErrorsR, datos?.message)
            if (error?.message) handlerMessages(setErrorsR, error?.message)
        }
    }

    const getEvento = async (id) => {
        try {
            const response = await getEventoRequest(id)
            const data = await response.data
            if (data.ok && data.message) handlerMessages(setSuccess, data?.message)
            return data.data
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.message) handlerMessages(setErrorsR, datos?.message)
            if (error?.message) handlerMessages(setErrorsR, error?.message)
        }
    }
    
    const createEvento = async (dataEvent, perfil_id) => {
        try {
            const response = await postEventoRequest(dataEvent)
            const data = await response.data
            if (data.ok) {
                getEventos()
                await registerActionHistorial(`Creó Evento`, `[usuario id, ${perfil_id}] creó evento '${dataEvent.evento}'`)
                if(data?.message) handlerMessages(setSuccess, data?.message)
            } else handlerMessages(setErrorsR, data?.message)
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrorsR, error?.message)
                })
            }
            if (datos?.message) handlerMessages(setErrorsR, datos?.message)
            if (error?.message) handlerMessages(setErrorsR, error?.message)
        }
    }

    const putEvento = async (id, dataEvent, perfil_id) => {
        try {

            const infoEvento = await getEventoRequest(id)
            const response = await putEventoRequest(id, dataEvent)
            const data = await response.data
            if (data.ok) {
                getEventos()
                await registerActionHistorial(`Modificó Evento`, `[usuario id, ${perfil_id}] actualizó evento '${infoEvento.data.data.evento} - ${formateFecha(infoEvento?.data?.data?.fecha)}' a '${dataEvent.evento} - ${dataEvent.fecha}'`)
                if(data?.message) handlerMessages(setSuccess, data?.message)
            } else handlerMessages(setErrorsR, data?.message)
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrorsR, error?.message)
                })
            }
            if (datos?.message) handlerMessages(setErrorsR, datos?.message)
            if (error?.message) handlerMessages(setErrorsR, error?.message)
        }
    }

    const deleteEvento = async (id) => {
        try {
            const infoEvento = await getEventoRequest(id)
            const response = await deleteEventoRequest(id)
            const data = await response.data
            if (data.ok) {
                getEventos()
                await registerActionHistorial(`Eliminó Evento`, `Evento  '${infoEvento.data.data.evento}'`)
                if (data.message) handlerMessages(setSuccess, data?.message)
            }
            return data
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.message) handlerMessages(setErrorsR, datos?.message)
            if (error?.message) handlerMessages(setErrorsR, error?.message)
        }
    }

    // ! videos

    const [videos, setVideos] = useState([])

    const getVideos = async () => {
        try {
            const response = await getAllVideosRequest()
            const data = await response.data
            if (data.ok) setVideos(data.data)
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.message) handlerMessages(setErrorsR, datos?.message)
            if (error?.message) handlerMessages(setErrorsR, error?.message)
        }
    }

    const getVideo = async (id) => {
        try {
            const response = await getVideoRequest(id)
            const data = await response.data
            if (data.ok) handlerMessages(setSuccess, data?.message)
            return data
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.message) handlerMessages(setErrorsR, datos?.message)
            if (error?.message) handlerMessages(setErrorsR, error?.message)
        }
    }

    const postVideo = async (dataVideo, perfil_id) => {
        try {
            const datosNoticia = dataVideo
            datosNoticia.set('UsuarioId', perfil_id)
            const response = await postVideoRequest(datosNoticia)
            const data = await response.data
            if (data.ok) {
                getVideos()
                handlerMessages(setSuccess, data?.message)
                await registerActionHistorial(`Creo un video`, `Video publicado por [usuario id, ${perfil_id}]`)
            } else handlerMessages(setErrorsR, data?.message)
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrorsR, error?.message)
                })
            }
            if (datos?.message) handlerMessages(setErrorsR, datos?.message)
            if (error?.message) handlerMessages(setErrorsR, error?.message)
        }
    }

    const putVideo = async (id, dataVideo, perfil_id) => {
        try {
            const response = await putVideoRequest(id, dataVideo)
            const data = await response.data
            if (data.ok) {
                getVideos()
                handlerMessages(setSuccess, data?.message)
                await registerActionHistorial(`Modifico un video`, `Modifico un video por [usuario id, ${perfil_id}]`)
            } else handlerMessages(setErrorsR, data?.message)
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrorsR, error?.message)
                })
            }
            if (datos?.message) handlerMessages(setErrorsR, datos?.message)
            if (error?.message) handlerMessages(setErrorsR, error?.message)
        }
    }

    const deleteVideo = async (id, perfil_id) => {
        try {
            const response = await deleteVideoRequest(id)
            const data = await response.data
            if (data.ok) {
                await registerActionHistorial(`Eliminó un video`, `video eliminado por [usuario id, ${perfil_id}]`)
                getVideos()
                handlerMessages(setSuccess, data?.message)
            }
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.message) handlerMessages(setErrorsR, datos?.message)
            if (error?.message) handlerMessages(setErrorsR, error?.message)
        }
    }

    const content = {
        errorsR, success,
        galeria, getGalerias, getGaleria, postGaleria, putGaleria, deleteGaleria,
        slider ,getSlider ,getSliderOne ,postSlider ,deleteSlider,
        eventos, createEvento, getEventos, deleteEvento, getEvento, putEvento,
        videos, getVideos, getVideo, postVideo, putVideo, deleteVideo
    }

    return (<MultimediaContext.Provider value={content}>
            {children}
        </MultimediaContext.Provider>)
}