import { createContext, useContext, useEffect, useState } from "react";
import { perfilRequest } from "../api/auth";
import { deleteGaleriaRequest, getAllGaleriaRequest, getGaleriaRequest, postGaleriaRequest, putGaleriaRequest } from "../api/multimedia";
import { registerActionHistorial } from "../assets/includes/historial";

const GaleriaContext = createContext();

export const useGaleriaContext = () => {
    const context = useContext(GaleriaContext);
    if (!context) {
        throw new Error("Error en el Galeria Context");
    }

    return context;
};

// eslint-disable-next-line react/prop-types
export const GaleriaProvider = ({ children }) => {
    const [errorsData, setErrorsData] = useState([]);
    const [responseMessageData, setResponseMessageData] = useState([]);
    const [galeria, setGaleria] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (errorsData.length != 0) {
                setErrorsData([]);
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, [errorsData])

    useEffect(() => {
        getGalerias()
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (responseMessageData.length != 0) {
                setResponseMessageData([]);
            }
        }, 5000);
        return () => { clearTimeout(timer) }
    }, [responseMessageData])

    const getGalerias = async () => {
        try {
            const response = await getAllGaleriaRequest()
            const data = await response.data
            if (data.ok) {
                setGaleria(data.data)
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
    
    const getGaleria = async (id) => {
        try {
            const response = await getGaleriaRequest(id)
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
            }

            return data
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

    const postGaleria = async (dataNoticia) => {
        try {
            const perfilUsuario = await perfilRequest()
            const datosNoticia = dataNoticia
            datosNoticia.set('UsuarioId', perfilUsuario.data.data.id)
            const response = await postGaleriaRequest(datosNoticia)
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
                await registerActionHistorial(`Creó imagen en galeria`,`Imagen con titulo '${dataNoticia.get('titulo')}'`)
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
            getGalerias()
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

    const putGaleria = async (id, dataNoticia) => {
        try {
            const infoGaleria = await getGaleriaRequest(id)
            const response = await putGaleriaRequest(id, dataNoticia)
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
                await registerActionHistorial(`Actualizó imagen en galeria`,`Imagen con titulo '${infoGaleria?.data?.data?.titulo}'`)
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
            getGalerias()
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

    const deleteGaleria = async (id) => {
        try {
            const infoGaleria = await getGaleriaRequest(id)
            const response = await deleteGaleriaRequest(id)
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
                await registerActionHistorial(`Eliminó imagen en galeria`,`Imagen con titulo '${infoGaleria?.data?.data?.titulo}'`)
                getGalerias()
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
        setErrorsData,
        responseMessageData,
        getGalerias,
        galeria,
        postGaleria,
        getGaleria,
        putGaleria,
        deleteGaleria
    }

    return (
        <GaleriaContext.Provider value={allMethods}>
            {children}
        </GaleriaContext.Provider>
    )
}