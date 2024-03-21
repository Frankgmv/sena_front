import { createContext, useContext, useEffect, useState } from "react";
import { perfilRequest } from "../api/auth";
import { deletePQRSRequest, getAllPQRSRequest, getPQRSRequest, putPQRSRequest } from "../api/informacion";
import { registerActionHistorial } from "../assets/includes/historial";

const PqrsContext = createContext();

export const usePqrsContext = () => {
    const context = useContext(PqrsContext);
    if (!context) {
        throw new Error("Error en el Pqrs Context");
    }

    return context;
};

// eslint-disable-next-line react/prop-types
export const PqrsProvider = ({ children }) => {
    const [errorsData, setErrorsData] = useState([]);
    const [responseMessageData, setResponseMessageData] = useState([]);
    const [pqrs, setPqrs] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (errorsData.length != 0) {
                setErrorsData([]);
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, [errorsData])

    useEffect(() => {
        getPqrs()
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (responseMessageData.length != 0) {
                setResponseMessageData([]);
            }
        }, 5000);
        return () => { clearTimeout(timer) }
    }, [responseMessageData])

    const getPqrs = async () => {
        try {
            const response = await getAllPQRSRequest()
            const data = await response.data
            if (data.ok) {
                setPqrs(data.data)
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

    const putPqrs = async (id, dataPqrs) => {
        try {
            const infoPqrs = await getPQRSRequest(id)
            const response = await putPQRSRequest(id, dataPqrs)
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
                if(dataPqrs.estado !== infoPqrs.data.data.estado) {
                    let estadoInfo = dataPqrs.estado ? 'Leido': 'No Leido'
                    let estadoDb = !estadoInfo ? 'Leido': 'No Leido'
                    await registerActionHistorial(`Actualizó PQRS`,`Remitente [${infoPqrs?.data?.data?.nombre} ${infoPqrs?.data?.data?.apellido}] paso de '${estadoDb}' a '${estadoInfo}'`)
                }
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
            getPqrs()
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


    const deletePqrs = async (id) => {
        try {
            const infoPqrs = await getPQRSRequest(id)
            const response = await deletePQRSRequest(id)
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
                await registerActionHistorial(`Eliminó PQRS`,`PQRS de [${infoPqrs?.data?.data?.nombre} ${infoPqrs?.data?.data?.apellido}]'`)
                getPqrs()
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
        getPqrs,
        pqrs,
        putPqrs,
        deletePqrs
    }

    return (
        <PqrsContext.Provider value={allMethods}>
            {children}
        </PqrsContext.Provider>
    )
}