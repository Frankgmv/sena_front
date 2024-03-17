import { createContext, useContext, useEffect, useState } from "react";
import { deleteEventoRequest, getAllEventosRequest, getEventoRequest, postEventoRequest, putEventoRequest } from "../api/data";
import { registerActionHistorial } from "../assets/includes/historial";
import { formateFechaGuion } from "../assets/includes/funciones";

const EventContext = createContext();

export const useEventContext = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error("Error en el General Context");
    }

    return context;
}

// eslint-disable-next-line react/prop-types
export const EventProvider = ({ children }) => {
    const [eventos, setEventos] = useState([]);

    const [errors, setErrors] = useState([]);
    const [responseMessage, setResponseMessage] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (errors.length != 0) {
                setErrors([]);
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, [errors])

    useEffect(() => {
        getEventos()
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (responseMessage.length != 0) {
                setResponseMessage([]);
            }
        }, 5000);
        return () => { clearTimeout(timer) }
    }, [responseMessage])

    const createEvento = async (dataEvent) => {
        try {
            const response = await postEventoRequest(dataEvent)
            const data = await response.data
            if (data.ok) {
                if (data.message) {
                    if (!responseMessage.includes(data.message)) {
                        setResponseMessage((prevent) => {
                            return [
                                ...prevent,
                                data.message
                            ]
                        })
                    }
                }
                await registerActionHistorial(`Creó Evento`,`Evento '${dataEvent.evento}'`)
            } else {
                if (!errors.includes(data.message)) {
                    setErrors((prevent) => {
                        return [
                            ...prevent,
                            data.message
                        ]
                    })
                }
            }
        } catch (error) {
            if (error.response.message) {
                if (!errors.includes(error.data.message)) {
                    setErrors((prevent) => {
                        return [
                            ...prevent,
                            error.message
                        ]
                    })
                }
            }

            if (error.response.data.zodError.issues) {
                error.response.data.zodError.issues.map((error => {
                    if (!errors.includes(error.message)) {
                        setErrors((prevent) => {
                            return [
                                ...prevent,
                                error.message
                            ]
                        })
                    }
                }))
            }
        }
    }

    const putEvento = async (id, dataEvent) => {
        try {

            const infoEvento = await getEventoRequest(id)
            const response = await putEventoRequest(id, dataEvent)
            const data = await response.data
            if (data.ok) {
                if (data.message) {
                    if (!responseMessage.includes(data.message)) {
                        setResponseMessage((prevent) => {
                            return [
                                ...prevent,
                                data.message
                            ]
                        })
                    }
                }
                await registerActionHistorial(`Modificó Evento`,`Evento '${infoEvento.data.data.evento} - ${formateFechaGuion(infoEvento?.data?.data?.fecha)}' a '${dataEvent.evento} - ${dataEvent.fecha}'`)
            } else {
                if (!errors.includes(data.message)) {
                    setErrors((prevent) => {
                        return [
                            ...prevent,
                            data.message
                        ]
                    })
                }
            }
        } catch (error) {
            if (error.response.message) {
                if (!errors.includes(error.data.message)) {
                    setErrors((prevent) => {
                        return [
                            ...prevent,
                            error.message
                        ]
                    })
                }
            }
        }
    }

    const getEvento = async (id) => {
        try {
            const response = await getEventoRequest(id)
            const data = await response.data
            if (data.ok) {
                if (data.message) {
                    if (!responseMessage.includes(data.message)) {
                        setResponseMessage((prevent) => {
                            return [
                                ...prevent,
                                data.message
                            ]
                        })
                    }
                }
            }
            return data.data
        } catch (error) {
            if (error.response.data.message) {
                if (!errors.includes(error.response.data.message)) {
                    setErrors((prevent) => {
                        return [
                            ...prevent,
                            error.response.data.message
                        ]
                    })
                }
            }
        }
    }

    const deleteEvento = async (id) => {
        try {
            const infoEvento = await getEventoRequest(id)
            const response = await deleteEventoRequest(id)
            const data = await response.data
            if (data.ok) {
                if (data.message) {
                    if (!responseMessage.includes(data.message)) {
                        setResponseMessage((prevent) => {
                            return [
                                ...prevent,
                                data.message
                            ]
                        })
                    }
                }
                await registerActionHistorial(`Eliminó Evento`,`Evento  '${infoEvento.data.data.evento}'`)
            }
            return data
        } catch (error) {
            if (error.response.data.message) {
                if (!errors.includes(error.response.data.message)) {
                    setErrors((prevent) => {
                        return [
                            ...prevent,
                            error.response.data.message
                        ]
                    })
                }
            }
        }
    }

    const getEventos = async () => {
        try {
            const response = await getAllEventosRequest()
            const data = await response.data
            setEventos(data.data)
        } catch (error) {
            if (error.response.data.message) {
                if (!errors.includes(error.response.data.message)) {
                    setErrors((prevent) => {
                        return [
                            ...prevent,
                            error.response.data.message
                        ]
                    })
                }
            }
        }
    }

    const allMethods = {
        errors,
        responseMessage,
        eventos,
        putEvento,
        getEvento,
        getEventos,
        deleteEvento,
        createEvento

    }

    return (
        <EventContext.Provider value={allMethods}>
            {children}
        </EventContext.Provider>
    )
}