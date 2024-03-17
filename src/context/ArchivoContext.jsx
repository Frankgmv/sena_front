import { createContext, useContext, useEffect, useState } from "react";
import { perfilRequest } from "../api/auth";
import { deleteArchivoRequest, getArchivoRequest, postArchivoRequest } from "../api/multimedia";
import { registerActionHistorial } from "../assets/includes/historial";

const ArchivoContext = createContext();

export const useArchivoContext = () => {
    const context = useContext(ArchivoContext);
    if (!context) {
        throw new Error("Error en el ArchivoContext Context");
    }

    return context;
};

// eslint-disable-next-line react/prop-types
export const ArchivoProvider = ({ children }) => {
    const [errorsData, setErrorsData] = useState([]);
    const [responseMessageData, setResponseMessageData] = useState([]);
    const [archivo, setArchivo] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (errorsData.length != 0) {
                setErrorsData([]);
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, [errorsData])

    useEffect(() => {
        getArchivo()
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (responseMessageData.length != 0) {
                setResponseMessageData([]);
            }
        }, 5000);
        return () => { clearTimeout(timer) }
    }, [responseMessageData])

    const getArchivo = async () => {
        try {
            const response = await getArchivoRequest()
            const data = await response.data
            if (data.ok) {
                setArchivo([data.data])
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

    const postArchivo = async (dataNoticia) => {
        try {
            const perfilUsuario = await perfilRequest()
            const datosNoticia = dataNoticia
            datosNoticia.set('UsuarioId', perfilUsuario.data.data.id)
            const response = await postArchivoRequest(datosNoticia)
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
                await registerActionHistorial(`Creó Archivo PDF`,`Archivo con titulo '${datosNoticia.get('titulo')}'`)
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


    const deleteArchivo = async () => {
        try {
            const response = await deleteArchivoRequest()
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
                await registerActionHistorial(`Eliminó Archivo PDF`,`Archivo con titulo '${archivo[0].titulo}'`)
                setArchivo([])
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
        getArchivo,
        archivo,
        postArchivo,
        deleteArchivo
    }

    return (
        <ArchivoContext.Provider value={allMethods}>
            {children}
        </ArchivoContext.Provider>
    )
}