import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, perfilRequest, registroRequest, verificarTokenRequest } from "../api/auth";
import { getRolRequest, getRolesRequest } from "../api/data";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../assets/includes/localStorage";
import { registerActionHistorial } from "../assets/includes/historial";

const CredentialContext = createContext({
    isAuthenticate: null,
    login: () => { },
    logoutFn: () => { },
    verificarToken: () => { }
});

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
        }, 3000);
        return () => clearTimeout(timer);
    }, [errors])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (responseMessage.length != 0) {
                setResponseMessage([]);
            }
        }, 3000);
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

    const logoutFn = () => {
        setLocalStorage('token', '')
        removeLocalStorage('token')
        setIsAuthenticate(false)
        setToken(null)
    }

    const login = async (dataLogin) => {
        try {
            const response = await loginRequest(dataLogin)
            const data = await response.data
            if (data.ok && response.status === 200) {

                if (!data.token) {
                    setErrors((prevent) => {
                        let errorSesion = 'Error al iniciar sesión'
                        if (!errors.includes(errorSesion)) {
                            return [
                                ...prevent,
                                errorSesion
                            ]
                        }
                        return prevent
                    })
                } else {
                    setToken(data.token)
                    if (!getLocalStorage('token')) {
                        setLocalStorage('token', data.token)
                    } else {
                        removeLocalStorage('token')
                        setLocalStorage('token', data.token)
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

                    await verificarToken()
                }
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

    const verifyAuth = async () => {
        try {
            const response = await perfilRequest()
            const data = await response.data
            if (data.ok) {
                setIsAuthenticate(true)
            }
        } catch (error) {

        }
    }

    const register = async (dataRegister) => {
        try {
            const response = await registroRequest(dataRegister)
            const data = await response.data
            if (data.ok) {
                removeLocalStorage('token')
                setResponseMessage((prevent) => {
                    if (!prevent.includes(data.message)) {
                        return [
                            ...prevent,
                            data.message
                        ];
                    }
                });
                await registerActionHistorial(`Nuevo Usuario`, `Usuario '${dataRegister.nombre}'`)
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

    const verificarToken = async () => {
        try {
            const response = await verificarTokenRequest()
            if (response.data.ok) {
                setIsAuthenticate(true);
            }
        } catch (error) {
            if (error.response.data.message) {
                setErrors((prevent) => {
                    if (!prevent.includes(error.response.data.message)) {
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
        verificarToken,
        errors,
        setErrors,
        isAuthenticate,
        login,
        responseMessage,
        roles,
        register,
        token,
        logoutFn,
        getRoles,
        rolName,
        verifyAuth
    }

    return (
        <CredentialContext.Provider value={allMethods}>
            {children}
        </CredentialContext.Provider>
    )
}