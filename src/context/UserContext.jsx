import { createContext, useContext, useEffect, useState } from "react";
import { getRolesRequest, getUsuarioRequest, getUsuariosRequest, postUsuarioRequest } from "../api/data";

const UserContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("Error en el credential context");
    }

    return context;
}

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
    const [errorsUser, setErrorsUser] = useState([]);
    const [responseMessageUser, setResponseMessageUser] = useState([]);
    const [roles, setRoles] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        getRoles();
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (errorsUser.length != 0) {
                setErrorsUser([]);
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, [errorsUser])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (responseMessageUser.length != 0) {
                setResponseMessageUser([]);
            }
        }, 5000);
        return () => { clearTimeout(timer) }
    }, [responseMessageUser])

    const getRoles = async () => {
        try {
            const response = await getRolesRequest()
            const data = await response.data
            if (data.ok) {
                setRoles(data.data)
            }
        } catch (error) {
            if (error.response.message) {
                setErrorsUser((prevent) => {
                    return [
                        ...prevent,
                        error.message
                    ]
                })
            }
        }
    }

    const getUsers = async () => {
        try {
            const response = await getUsuariosRequest()
            const data = await response.data
            if (data.ok) {
                setUsuarios(data.data)
            }
        } catch (error) {
            if (error.message) {
                setErrorsUser((prevent) => {
                    if (!errorsUser.includes(error.message)) {
                        return [
                            ...prevent,
                            error.message
                        ]
                    }
                    return prevent
                })
            }

            if (error.response.data.message) {
                setErrorsUser((prevent) => {
                    if (!errorsUser.includes(error.response.data.message)) {
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
    const getUsuario = async (id) => {
        try {
            const response = await getUsuarioRequest(id)
            const data = await response.data
            if (data.ok) {
                setResponseMessageUser((prevent) => {
                    if (!errorsUser.includes(data.message)) {
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
                setErrorsUser((prevent) => {
                    if (!errorsUser.includes(error.message)) {
                        return [
                            ...prevent,
                            error.message
                        ]
                    }
                    return prevent
                })
            }

            if (error.response.data.message) {
                setErrorsUser((prevent) => {
                    if (!errorsUser.includes(error.response.data.message)) {
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
    const registrarUsuario = async (dataUsuario) => {
        try {
            const response = await postUsuarioRequest(dataUsuario)
            const data = await response.data
            if (data.ok) {
                setResponseMessageUser([...responseMessageUser, data.message])
            }else{
                setErrorsUser((prevent) => {
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
                    setErrorsUser((prevent) => {
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

                setErrorsUser((prevent) => {
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

    const allMethods = {
        errorsUser,
        setErrorsUser,
        responseMessageUser,
        roles,
        getUsers,
        usuarios,
        registrarUsuario,
        getUsuario
    }

    return (
        <UserContext.Provider value={allMethods}>
            {children}
        </UserContext.Provider>
    )
}