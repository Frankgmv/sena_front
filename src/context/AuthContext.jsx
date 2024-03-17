import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, perfilRequest, registroRequest } from "../api/auth";
import { getRolRequest, getRolesRequest} from "../api/data";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../assets/includes/localStorage";
import { registerActionHistorial } from "../assets/includes/historial";

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
    const [rolName, setRolName] = useState([]);
    const [roles, setRoles] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        getRoles();
        getRolName();
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

    const getRolName = async () => {
        try {
            const infoUser = await perfilRequest()
            const response = await getRolRequest(infoUser.data.data.RolId)
            const data = await response.data
            if (data.ok) {
                setRolName(data.data)
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

            if(data.ok){   
                setResponseMessage((prevent) => {
                    if (!prevent.includes(data.message)) {
                        return [
                            ...prevent,
                            data.message
                        ];
                    }
                    return prevent
                });
                await registerActionHistorial(`Nuevo Usuario`,`Usuario '${dataRegister.nombre}'`)
            }
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
        getRoles,
        rolName
    }

    return (
        <CredentialContext.Provider value={allMethods}>
            {children}
        </CredentialContext.Provider>
    )
}