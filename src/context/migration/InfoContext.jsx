import { createContext, useCallback, useContext, useState } from "react"
import { deleteHistorialRequest, deleteNotificacionRequest, deletePQRSRequest, getAllNotificacionesRequest, getAllPQRSRequest, getHistorialRequest, getNotificacionRequest, getPQRSRequest, postPQRSRequest, putNotificacionRequest, putPQRSRequest } from './../../api/informacion';
import { handlerMessages } from './../../assets/includes/funciones'
import { registerActionHistorial } from "../../assets/includes/historial";
const InfoContext = createContext({
    errorsI: [],
    successI: [],

    // ! historial
    historial: [], getHistorial: () => { }, deleteAllHistorial: () => { },

    //  ! Notificaciones
    notificaciones: [], getNotificaciones: () => { }, putNotificacion: () => { }, deleteNotificacion: () => { },

    // ! PQRS
    pqrs: [], getPqrs: () => { }, postPqrs: () => { }, putPqrs: () => { }, deletePqr: () => { }
})

export const useInfoContext = () => {
    const context = useContext(InfoContext)
    if(!context) throw new Error("InfoContext isn't working")
    return context
}

export const InfoContextProvider = ({children}) => {
    const [errorsI, setErrorsI] = useState([])
    const [successI, setSuccessI] = useState([])
    
    // ! historial
    const [historial, setHistorial] = useState([])

    const getHistorial = async () => {
        try {
            const response = await getHistorialRequest()
            const data = await response.data
            setHistorial(data.data)
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.message) handlerMessages(setErrorsI, datos?.message)
            if (error?.message) handlerMessages(setErrorsI, error?.message)
        }
    }

    const deleteAllHistorial = async () => {
        try {
            const response = await deleteHistorialRequest()
            const data = await response.data
            if (data?.ok) {
                if(data?.message) handlerMessages(setSuccessI, data?.message)
                getHistorial()
            }
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.message) handlerMessages(setErrorsI, datos?.message)
            if (error?.message) handlerMessages(setErrorsI, error?.message)
        }
    }

    // ! notificaciones
    const [notificaciones, setnotificaciones] = useState([]);

    const getNotificaciones = async () => {
        try {
            const response = await getAllNotificacionesRequest()
            const data = await response.data
            if (data?.ok) setnotificaciones(data?.data)
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.message) handlerMessages(setErrorsI, datos?.message)
            if (error?.message) handlerMessages(setErrorsI, error?.message)
        }
    }

    const putNotificacion = async (id, dataNotificaciones) => {
        try {
            const infoNotific = await getNotificacionRequest(id)
            const response = await putNotificacionRequest(id, dataNotificaciones)
            const data = await response.data
            if (data.ok) {
                getNotificaciones()
                if (data?.message) handlerMessages(setSuccessI, data?.message)
                if (dataNotificaciones.estado !== infoNotific.data.data.estado) {
                    let estadoInfo = dataNotificaciones.estado ? 'Activo' : 'Inactivo'
                    let estadoDb = !estadoInfo ? 'Activo' : 'Inactivo'
                    await registerActionHistorial(`Actualizó notificación`, `${infoNotific.data.data.titulo} notificación de '${estadoDb}' a '${estadoInfo}'`)
                }
            } else handlerMessages(setErrorsI, data?.message)
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrorsI, error?.message)
                })
            }
            if (datos?.message) handlerMessages(setErrorsI, datos?.message)
            if (error?.message) handlerMessages(setErrorsI, error?.message)
        }
    }

    const deleteNotificacion = async (id) => {
        try {
            const infoNotific = await getNotificacionRequest(id)
            const response = await deleteNotificacionRequest(id)
            const data = await response.data
            if (data.ok) {

                await registerActionHistorial(`Eliminó Notificación`, `Notificación con titulo '${infoNotific?.data?.data?.titulo}'`)
                getNotificaciones()
            }
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.message) handlerMessages(setErrorsI, datos?.message)
            if (error?.message) handlerMessages(setErrorsI, error?.message)
        }
    }

    // ! pqrs
    const [pqrs, setPqrs] = useState([]);

    const getPqrs = useCallback(async () => {
        try {
            const response = await getAllPQRSRequest()
            const data = await response.data
            if (data.ok) setPqrs(data.data)
        } catch (error) {
            const datos = error?.response?.data
            if (error?.message) handlerMessages(setErrorsI, error?.message)
            if (datos?.message) handlerMessages(setErrorsI, datos?.message)
        }
    }, [])

    const postPqrs = async (dataPqrs) => {
        try {
            const response = await postPQRSRequest(dataPqrs)
            const data = await response.data
            if (data.ok) {
                handlerMessages(setSuccessI, data?.message)
            } else handlerMessages(setErrorsI, data?.message)
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrorsI, error?.message)
                })
            }
            if (datos?.message) handlerMessages(setErrorsI, datos?.message)
        }
    }


    const putPqrs = useCallback(async (id, dataPqrs) => {
        try {
            const infoPqrs = await getPQRSRequest(id)
            const response = await putPQRSRequest(id, dataPqrs)
            const data = await response.data
            if (data.ok) {
                getPqrs()
                if (dataPqrs.estado !== infoPqrs.data.data.estado) {
                    let estadoInfo = dataPqrs.estado ? 'Leido' : 'No Leido'
                    let estadoDb = !estadoInfo ? 'Leido' : 'No Leido'
                    await registerActionHistorial(`Actualizó PQRS`, `Remitente [${infoPqrs?.data?.data?.nombre} ${infoPqrs?.data?.data?.apellido}] paso de '${estadoDb}' a '${estadoInfo}'`)
                }
                handlerMessages(setSuccessI, data?.message)
            } else handlerMessages(setErrorsI, data?.message)
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrorsI, error?.message)
                })
            }
            if (error?.message) handlerMessages(setErrorsI, error?.message)
            if (datos?.message) handlerMessages(setErrorsI, datos?.message)
        }
    }, [getPqrs])


    const deletePqrs = useCallback(async (id) => {
        try {
            const infoPqrs = await getPQRSRequest(id)
            const response = await deletePQRSRequest(id)
            const data = await response.data
            if (data.ok) {
                getPqrs()
                handlerMessages(setSuccessI, data?.message)
                await registerActionHistorial(`Eliminó PQRS`, `PQRS de [${infoPqrs?.data?.data?.nombre} ${infoPqrs?.data?.data?.apellido}]'`)
            }
        } catch (error) {
            const datos = error?.response?.data
            if (error?.message) handlerMessages(setErrorsI, error?.message)
            if (datos?.message) handlerMessages(setErrorsI, datos?.message)
        }
    }, [getPqrs])


    const content = {
        errorsI, successI,
        
        // ! historial
        historial, getHistorial, deleteAllHistorial,

        // ! notificaciones
        notificaciones ,getNotificaciones, putNotificacion, deleteNotificacion,
        
        // !
        pqrs ,getPqrs,  postPqrs, putPqrs ,deletePqrs
        
    }

    return (<InfoContext.Provider value={content}>
            {children}
    </InfoContext.Provider>)
}