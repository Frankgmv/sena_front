import { createContext, useContext, useEffect, useState } from "react";
import { getAllAnunciosRequest, getAnuncioRequest, postAnuncioRequest, putAnuncioRequest, deleteAnuncioRequest } from "../api/data";
import { perfilRequest } from "../api/auth";
import { registerActionHistorial } from "../assets/includes/historial";

const AnunciosContext = createContext();

export const useAnunciosContext = () => {
    const context = useContext(AnunciosContext);
    if (!context) {
        throw new Error("Error en el Anuncios context");
    }

    return context;
};

// eslint-disable-next-line react/prop-types
export const DataProvider = ({ children }) => {
    const [errorsData, setErrorsData] = useState([]);
    const [responseMessageData, setResponseMessageData] = useState([]);
    const [anuncios, setAnuncios] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (errorsData.length != 0) {
                setErrorsData([]);
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, [errorsData])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (responseMessageData.length != 0) {
                setResponseMessageData([]);
            }
        }, 5000);
        return () => { clearTimeout(timer) }
    }, [responseMessageData])

    const getAnuncios = async () => {
        try {
            const response = await getAllAnunciosRequest()
            const data = await response.data
            if (data.ok) {
                setAnuncios(data.data)
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
    const getAnuncio = async (id) => {
        try {
            const response = await getAnuncioRequest(id)
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

    const postAnuncio = async (dataAnuncio) => {
        try {
            const perfilUsuario = await perfilRequest()
            const datosAnuncio = dataAnuncio
            datosAnuncio.set('UsuarioId', parseInt(perfilUsuario.data.data.id))
            const response = await postAnuncioRequest(datosAnuncio)
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
                await registerActionHistorial(`Creó anuncio`,`con titulo '${datosAnuncio.get('titulo')}'`)
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
            getAnuncios()
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

    const putAnuncio = async (id, dataAnuncio) => {
        try {
            const response = await putAnuncioRequest(id, dataAnuncio)
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
                const anuncioInfo = await getAnuncioRequest(id)
                await registerActionHistorial(`Actualizó anuncio`,`Anuncio con titulo '${anuncioInfo?.data?.data.titulo}'`)
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
            getAnuncios()
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

    const deleteAnuncio = async (id) => {
        try {
            const anuncioInfo = await getAnuncioRequest(id)
            const response = await deleteAnuncioRequest(id)
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
                getAnuncios()
                await registerActionHistorial(`Eliminó anuncio`,`Anuncio con titulo '${anuncioInfo?.data?.data?.titulo}'`)
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
        getAnuncios,
        anuncios,
        postAnuncio,
        getAnuncio,
        putAnuncio,
        deleteAnuncio
    }

    return (
        <AnunciosContext.Provider value={allMethods}>
            {children}
        </AnunciosContext.Provider>
    )
}