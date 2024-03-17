import { createContext, useContext, useEffect, useState } from "react";
import { getPermisosRequest, getPermisoRequest, postPermisoRequest, putPermisoRequest, deletePermisoRequest } from "../api/data";

// eslint-disable-next-line react-refresh/only-export-components
const PermisosContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const usePermisosContext = () => {
    const context = useContext(PermisosContext);
    if (!context) {
        throw new Error("Error en el credential context"); 
    }

    return context;
};

// eslint-disable-next-line react/prop-types
export const dataProvider = ({ children }) => {
    const [errorsData, setErrorsData] = useState([]);
    const [responseMessageData, setResponseMessageData] = useState([]);
    const [permisos, setPermisos] = useState([]);

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

    const getPermisos = async () => {
        try {
            const response = await getPermisosRequest()
            const data = await response.data
            if (data.ok) {
                setPermisos(data.data)
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
    const getPermiso = async (id) => {
        try {
            const response = await getPermisoRequest(id)
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

    const postPermiso = async (dataPermiso) => {
        try {
            const response = await postPermisoRequest(dataPermiso)
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

    const putPermiso = async (id, dataPermiso) => {
        try {
            const response = await putPermisoRequest(id, dataPermiso)
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
            getPermisosRequest()
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

    const deletePermiso = async (id) => {
        try {
            const response = await deletePermisoRequest(id)
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
                getPermisos()
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
        getPermisos,
        permisos,
        postPermiso,
        getPermiso,
        putPermiso,
        deletePermiso
    }

    return (
        <PermisosContext.Provider value={allMethods}>
            {children}
        </PermisosContext.Provider>
    )
}