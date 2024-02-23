import { createContext, useContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
import { loginRequest, registroRequest } from "../api/auth";
import { getRolesRequest, getUsuarioRequest } from "../api/data";

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

    const getUsers = async () => {
        try {
            const response = await getUsuarioRequest()
            const data = await response.data
            if (data.ok) {
                console.log(data.data)
            }
        } catch (error) {
            if (error.message) {
                setErrors((prevent) => {
                    if (!errors.includes(error.message)) {
                        return [
                            ...prevent,
                            error.message
                        ]
                    }
                    return prevent
                })
            }

            if (error.response.data.message) {
                setErrors((prevent) => {
                    if (!errors.includes(error.response.data.message)) {
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

    const login = async (dataLogin) => {
        try {
            const response = await loginRequest(dataLogin)
            const data = await response.data
            if (data.ok && response.status === 200) {

                if (!data.cookie) {
                    setErrors((prevent) => {
                        if (!errors.includes('Error al obtener cookie')) {
                            return [
                                ...prevent,
                                'Error al obtener cookie'
                            ]
                        }
                        return prevent
                    })

                    setIsAuthenticate(false);
                } else {

                    setIsAuthenticate(true);
                    if (!Cookie.get('accessToken')) {
                        Cookie.set('accessToken', data.cookie)
                    } else {
                        console.log(Cookie.get('accessToken'))
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
        getUsers
    }

    return (
        <CredentialContext.Provider value={allMethods}>
            {children}
        </CredentialContext.Provider>
    )
}