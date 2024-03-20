import { createContext, useContext, useEffect, useState } from "react";
import { getAllCategoriasRequest, getAllSeccionesRequest, getRolRequest, getSeccionesMenuRequest, putRolRequest } from "../api/data";
import { deleteHistorialRequest, getHistorialRequest } from "../api/informacion";
import { registerActionHistorial } from "../assets/includes/historial";
import { perfilRequest } from "../api/auth";

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
    const [historial, setHistorial] = useState([]);
    const [secciones, setSecciones] = useState([]);
    const [perfil, setPerfil] = useState({});
    const [errors, setErrors] = useState([]);
    const [responseMessage, setResponseMessage] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (errors.length != 0) {
                setErrors([]);
            }
        }, 5800);
        return () => clearTimeout(timer);
    }, [errors])

    useEffect(() => {
        getPerfil()
        getSecciones()
        getCategorias()
        getHistorial()
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (responseMessage.length != 0) {
                setResponseMessage([]);
            }
        }, 5800);
        return () => { clearTimeout(timer) }
    }, [responseMessage])

    const putRol = async (id, estado) => {
        try {
            const inforRol = await getRolRequest(id)
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
                if (estado !== inforRol.data.data.estado) {
                    let estadoInfo = estado ? 'Activo' : 'Inactivo'
                    let estadoDb = !estadoInfo ? 'Activo' : 'Inactivo'
                    await registerActionHistorial(`Actualizó rol`, `Rol de ${inforRol?.data?.data?.rol} paso de '${estadoDb}' a '${estadoInfo}'`)
                }
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
                let message = error.response.data.message
                if (!errors.includes(message)) {
                    setErrors((prevent) => {
                        return [
                            ...prevent,
                            message
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

    const getSeccionesMenu = async (id, RolId) => {
        try {
            const response = await getSeccionesMenuRequest(id, RolId)
            const data = await response.data
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

    const getHistorial = async () => {
        try {
            const response = await getHistorialRequest()
            const data = await response.data
            setHistorial(data.data)
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

    const getPerfil = async () => {
        try {
            const response = await perfilRequest()
            const data = await response.data
            setPerfil(data.data)
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

    const getCategorias = async () => {
        try {
            const response = await getAllCategoriasRequest()
            const data = await response.data
            setCategorias(data.data)
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
    const deleteAllHistorial = async () => {
        try {
            const response = await deleteHistorialRequest()
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
            getHistorial()
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
        setErrors,
        responseMessage,
        getRol,
        putRol,
        deleteAllHistorial,
        getSecciones,
        secciones,
        getCategorias,
        categorias,
        getHistorial,
        historial,
        perfil,
        getPerfil,
        getSeccionesMenu
    }

    return (
        <GeneralContext.Provider value={allMethods}>
            {children}
        </GeneralContext.Provider>
    )
}