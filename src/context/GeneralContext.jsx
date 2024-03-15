import { createContext, useContext, useEffect, useState } from "react";
import { getAllCategoriasRequest, getAllSeccionesRequest, getRolRequest, putRolRequest } from "../api/data";

const GeneralContext = createContext();

export const useGeneralContext = () => {
    const context = useContext(GeneralContext);
    if (!context) {
        throw new Error("Error en el General Context");
    }

    return context;
}

// eslint-disable-next-line react/prop-types
export const GeneralProvider = ({ children }) => {
    const [categorias, setCategorias] = useState([]);
    const [permisos, setpermisos] = useState([]);
    const [secciones, setSecciones] = useState([]);
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
      getSecciones()
      getCategorias()
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (responseMessage.length != 0) {
                setResponseMessage([]);
            }
        }, 5000);
        return () => { clearTimeout(timer) }
    }, [responseMessage])

    const putRol = async (id, estado) => {
        try {
            const response = await putRolRequest(id, { estado })
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
            }else{
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

    const getRol = async (id) => {
        try {
            const response = await getRolRequest(id)
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
            return data
        } catch (error) {
            if (error.response.data.message) {
                if (!error.includes(error.response.data.message)) {
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
    const getSecciones = async () => {
        try {
            const response = await getAllSeccionesRequest()
            const data = await response.data
           setSecciones(data.data)
        } catch (error) {
            if (error.response.data.message) {
                if (!error.includes(error.response.data.message)) {
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

    const getPermisos = async () => {
        try {
            const response = await getAllSeccionesRequest()
            const data = await response.data
           setSecciones(data.data)
        } catch (error) {
            if (error.response.data.message) {
                if (!error.includes(error.response.data.message)) {
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
    const getCategorias = async () => {
        try {
            const response = await getAllCategoriasRequest()
            const data = await response.data
           setCategorias(data.data)
        } catch (error) {
            if (error.response.data.message) {
                if (!error.includes(error.response.data.message)) {
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
        setErrors,
        responseMessage,
        getRol,
        putRol,
        getSecciones,
        secciones,
        getCategorias,
        categorias
    }

    return (
        <GeneralContext.Provider value={allMethods}>
            {children}
        </GeneralContext.Provider>
    )
}