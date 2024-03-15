import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registroRequest } from "../api/auth";
import { getRolesRequest} from "../api/data";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../assets/includes/localStorage";

const CredentialContext = createContext();

export const useCredentialContext = () => {
    const context = useContext(CredentialContext);
    if (!context) {
        throw new Error("Error en el credential context");
    }

    return context;
}

// eslint-disable-next-line react/prop-types
export const CredentialProvider = ({ children }) => {
    const [errors, setErrors] = useState([]);
    const [responseMessage, setResponseMessage] = useState([]);
    const [isAuthenticate, setIsAuthenticate] = useState(false);
    const [roles, setRoles] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        getRoles();
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (errors.length != 0) {
                setErrors([]);
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, [errors])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (responseMessage.length != 0) {
                setResponseMessage([]);
            }
        }, 5000);
        return () => { clearTimeout(timer) }
    }, [responseMessage])

    const getRoles = async () => {
        try {
            const response = await getRolesRequest()
            const data = await response.data
            if (data.ok) {
                setRoles(data.data)
            }
        } catch (error) {
            if (error.response.message) {
                setErrors((prevent) => {
                    return [
                        ...prevent,
                        error.message
                    ]
                })
            }
        }
    }

    const logout = async () => {
        setIsAuthenticate(false)
        setToken(null)
        removeLocalStorage('token')
    }

    const login = async (dataLogin) => {
        try {
            const response = await loginRequest(dataLogin)
            const data = await response.data
            if (data.ok && response.status === 200) {

                if (!data.token) {
                    setErrors((prevent) => {
                        if (!errors.includes('Error al obtener cookie')) {
                            return [
                                ...prevent,
                                'Error al obtener cookie'
                            ]
                        }
                        return prevent
                    })
                } else {

                    setIsAuthenticate(true);
                    setToken(data.token)
                    if (!getLocalStorage('token')) {
                        setLocalStorage('token', data.token)
                    } else {
                        removeLocalStorage('token')
                        setLocalStorage('token', data.token)
                    }
                }
            }

            setResponseMessage((prevent) => {
                if (!prevent.includes(data.message)) {
                    return [
                        ...prevent,
                        data.message
                    ];
                }
                return prevent
            });
        } catch (error) {
            const datos = error.response.data
            if (datos.zodError) {
                error.response.data.zodError.issues.map(error => {
                    setErrors((prevent) => {
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

                setErrors((prevent) => {
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

    const register = async (dataRegister) => {
        try {
            const response = await registroRequest(dataRegister)
            const data = await response.data

            setResponseMessage((prevent) => {
                if (!prevent.includes(data.message)) {
                    return [
                        ...prevent,
                        data.message
                    ];
                }
                return prevent
            });

        } catch (error) {
            const datos = error.response.data

            if (datos.zodError) {

                error.response.data.zodError.issues.map(error => {
                    setErrors((prevent) => {
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

                setErrors((prevent) => {
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
        errors,
        setErrors,
        isAuthenticate,
        login,
        responseMessage,
        roles,
        register,
        token,
        setToken,
        logout,
        getRoles
    }

    return (
        <CredentialContext.Provider value={allMethods}>
            {children}
        </CredentialContext.Provider>
    )
}