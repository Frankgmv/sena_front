import { createContext, useContext, useEffect, useState } from "react";
import { deleteNotificacionRequest, getAllNotificacionesRequest, putNotificacionRequest } from "../api/informacion";
const NotificacionContext = createContext();

export const useNotificacionContext = () => {
    const context = useContext(NotificacionContext);
    if (!context) {
        throw new Error("Error en el Notificación Context");
    }

    return context;
};

// eslint-disable-next-line react/prop-types
export const NotificacionesProvider = ({ children }) => {
    const [errorsData, setErrorsData] = useState([]);
    const [responseMessageData, setResponseMessageData] = useState([]);
    const [notificaciones, setnotificaciones] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (errorsData.length != 0) {
                setErrorsData([]);
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, [errorsData])

    useEffect(() => {
        getNotificaciones()
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (responseMessageData.length != 0) {
                setResponseMessageData([]);
            }
        }, 5000);
        return () => { clearTimeout(timer) }
    }, [responseMessageData])

    const getNotificaciones = async () => {
        try {
            const response = await getAllNotificacionesRequest()
            const data = await response.data
            if (data.ok) {
                setnotificaciones(data.data)
            }
        } catch (error) {
            if (error.message) {
                setErrorsData((prevent) => {
                    if (!errorsData.includes(error.message)) {
                        return [
                            ...prevent,
                            error.message
                        ]
                    }
                    return prevent
                })
            }

            if (error.response.data.message) {
                setErrorsData((prevent) => {
                    if (!errorsData.includes(error.response.data.message)) {
                        return [
                            ...prevent,
                            error.response.data.message
                        ]
                    }
                    return prevent
                })
            }
        }
    }

    const putNotificacion = async (id, dataNotificaciones) => {
        try {
            const response = await putNotificacionRequest(id, dataNotificaciones)
            const data = await response.data
            if (data.ok) {
                setResponseMessageData([...responseMessageData, data.message])
            } else {
                setErrorsData((prevent) => {
                    if (!prevent.includes(data.message)) {
                        return [
                            ...prevent,
                            data.message
                        ]
                    }
                    return prevent
                })
            }
            getNotificaciones()
        } catch (error) {
            const datos = error.response.data
            if (datos.zodError) {
                error.response.data.zodError.issues.map(error => {
                    setErrorsData((prevent) => {
                        if (!prevent.includes(error.message)) {
                            return [
                                ...prevent,
                                error.message
                            ]
                        }
                        return prevent
                    })
                })
            }

            if (datos.message) {

                setErrorsData((prevent) => {
                    if (!prevent.includes(datos.message)) {
                        return [
                            ...prevent,
                            datos.message
                        ]
                    }
                    return prevent
                })
            }
        }
    }


    const deleteNotificacion = async (id) => {
        try {
            const response = await deleteNotificacionRequest(id)
            const data = await response.data
            if (data.ok) {
                setResponseMessageData((prevent) => {
                    if (!responseMessageData.includes(data.message)) {
                        return [
                            ...prevent,
                            data.message
                        ]
                    }
                    return prevent
                })
                getNotificaciones()
            }
        } catch (error) {
            if (error.message) {
                setErrorsData((prevent) => {
                    if (!errorsData.includes(error.message)) {
                        return [
                            ...prevent,
                            error.message
                        ]
                    }
                    return prevent
                })
            }

            if (error.response.data.message) {
                setErrorsData((prevent) => {
                    if (!errorsData.includes(error.response.data.message)) {
                        return [
                            ...prevent,
                            error.response.data.message
                        ]
                    }
                    return prevent
                })
            }
        }
    }

    const allMethods = {
        errorsData,
        responseMessageData,
        getNotificaciones,
        notificaciones,
        putNotificacion,
        deleteNotificacion
    }

    return (
        <NotificacionContext.Provider value={allMethods}>
            {children}
        </NotificacionContext.Provider>
    )
}