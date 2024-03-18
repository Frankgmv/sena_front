import { createContext, useContext, useEffect, useState } from "react";
import { deleteUsuarioRequest, getUsuarioRequest, getUsuariosRequest, postUsuarioRequest, putUsuarioPerfilRequest, putUsuarioRequest } from "../api/data";
import { registerActionHistorial } from "../assets/includes/historial";
import { perfilRequest } from "../api/auth";

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
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (errorsUser.length != 0) {
                setErrorsUser([]);
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, [errorsUser])

    useEffect(()=>{
        getUsers()
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (responseMessageUser.length != 0) {
                setResponseMessageUser([]);
            }
        }, 5000);
        return () => { clearTimeout(timer) }
    }, [responseMessageUser])

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
                    if (!responseMessageUser.includes(data.message)) {
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
                setResponseMessageUser((prevent) => {
                    if (!prevent.includes(data.message)) {
                        return [
                            ...prevent,
                            data.message
                        ]
                    }
                    return prevent
                })
                getUsers()
                await registerActionHistorial(`Insertó usuario`,`Usuario con id ${dataUsuario.id} y nombre ${dataUsuario.nombre} ${dataUsuario.apellido}`)
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

    const updateUsuario = async (id, dataUsuario) => {
        try {
            const infoUsuario = await getUsuarioRequest(id)
            const response = await putUsuarioRequest(id, dataUsuario)
            const data = await response.data
            if (data.ok) {
                setResponseMessageUser((prevent) => {
                    if (!prevent.includes(data.message)) {
                        return [
                            ...prevent,
                            data.message
                        ]
                    }
                    return prevent
                })
                getUsers()
                await registerActionHistorial(`Actualizó usuario`,`Actualizó usuario con id ${infoUsuario?.data?.data?.id} y nombre ${infoUsuario?.data?.data?.nombre} ${infoUsuario?.data?.data?.apellido}`)
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
            getUsers()
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
    const updatePerfil = async (dataUsuario) => {
        try {
            const infoUsuario = await perfilRequest()
            const response = await putUsuarioPerfilRequest(infoUsuario?.data?.data?.id, dataUsuario)
            const data = await response.data
            if (data.ok) {
                setResponseMessageUser((prevent) => {
                    if (!prevent.includes(data.message)) {
                        return [
                            ...prevent,
                            data.message
                        ]
                    }
                    return prevent
                })
                getUsers()
                await registerActionHistorial(`Actualizó su perfil`,`Usuario con id ${infoUsuario?.data?.data?.id} y nombre ${infoUsuario?.data?.data?.nombre} ${infoUsuario?.data?.data?.apellido} actualizo su perfil`)
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
            getUsers()
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

    const deleteUsuario = async (id) => {
        try {
            const infoUsuario = await getUsuarioRequest(id)
            const response = await deleteUsuarioRequest(id)
            const data = await response.data
            if (data.ok) {
                setResponseMessageUser((prevent) => {
                    if (!prevent.includes(data.message)) {
                        return [
                            ...prevent,
                            data.message
                        ]
                    }
                    return prevent
                })
                getUsers()
                await registerActionHistorial(`Eliminó usuario`,`Eliminó usuario con id ${infoUsuario?.data?.data?.id} y nombre ${infoUsuario?.data?.data?.nombre} ${infoUsuario?.data?.data?.apellido}`)
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

    const allMethods = {
        errorsUser,
        setErrorsUser,
        responseMessageUser,
        getUsers,
        usuarios,
        registrarUsuario,
        getUsuario,
        updateUsuario,
        deleteUsuario,
        updatePerfil
    }

    return (
        <UserContext.Provider value={allMethods}>
            {children}
        </UserContext.Provider>
    )
}