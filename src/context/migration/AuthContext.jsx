import { Logout } from "@mui/icons-material";
import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, perfilRequest, registroRequest, verificarTokenRequest } from "../../api/auth";
import { handlerMessages } from "../../assets/includes/funciones";
import { registerActionHistorial } from "../../assets/includes/historial";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../../assets/includes/localStorage";
import { getRolRequest, getSeccionesMenuRequest } from "../../api/data";



const AuthContext = createContext({
    errors: [],
    message: [],
    setErrors: () => { },
    setMessages: () => { },

    login: () => { },
    Logout: () => { },
    verificarToken: () => { },
    getPerfil: () => { },
    perfil: [],
    isAuthenticate: false,

    getSeccionesMenu: () => { },
    verifyAuth: () => { }
})


export const useAuthContext = () => {

    const context = useContext(AuthContext)

    if (!context) throw new Error("Error trying authenticating the user")

    return context
}

export const AuthProvider = ({ children }) => {

    const [perfil, setPerfil] = useState({})
    const [perfilData, setPerfilData] = useState({})
    const [isAuthenticate, setisAuthenticate] = useState({})

    const [errors, setErrors] = useState([])
    const [message, setMessages] = useState([])

    useEffect(() => {
        if (perfilData) getRolName()
    }, [perfilData])

    const getSeccionesMenu = async (id, RolId) => {
        try {
            const response = await getSeccionesMenuRequest(id, RolId)
            const data = await response.data
            return data
        } catch (error) {
            let msg = error?.response?.data?.message
            if (msg) {
                handlerMessages(setErrors, msg)
            }
        }
    }

    const login = async (dataLogin) => {
        try {
            const response = await loginRequest(dataLogin)
            const data = await response.data
            if (data.ok && response.status === 200) {

                if (!data.token) {
                    handlerMessages("Error al iniciar sesión", setErrors)
                } else {

                    if (!getLocalStorage('token')) setLocalStorage('token', data?.token)
                    else {
                        removeLocalStorage('token')
                        setLocalStorage('token', data?.token)
                    }

                    handlerMessages(setMessages, data?.message)

                    await verificarToken()
                }
            }
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.zodError) {
                datos?.zodError?.issues.map(error => {
                    handlerMessages(setErrors, error?.message)
                })
            }

            if (datos?.message) handlerMessages(setErrors, datos?.message)
        }
    }

    const verificarToken = async () => {
        try {
            const response = await verificarTokenRequest()
            if (response.data.ok) setisAuthenticate(true)
            else {
                setisAuthenticate(false)
                handlerMessages(setMessages, response.data.message)
            }
        } catch (error) {
            let msg = error?.response?.data?.message
            if (msg) handlerMessages(setErrors, msg)
        }
    }

    const Logout = () => {
        setLocalStorage('token', 'vacio')
        removeLocalStorage('token')
        setisAuthenticate(false)
    }

    const register = async (dataRegister) => {
        try {
            const response = await registroRequest(dataRegister)
            const data = await response.data
            if (data.ok) {
                removeLocalStorage('token')
                handlerMessages(setMessages, data.message)
                await registerActionHistorial(`Nuevo Usuario`, `Usuario '${dataRegister.nombre}'`)
            }
        } catch (error) {
            const datos = error.response.data
            if (datos.zodError) {
                error.response.data.zodError.issues.map(error => {
                    handlerMessages(setErrors, error.message)
                })
            }
        }
    }

    const getPerfil = async () => {
        try {
            const response = await perfilRequest()
            const data = await response.data
            setPerfilData(data.data)
        } catch (error) {
            let err = error?.response?.data?.message
            if (err) handlerMessages(setErrors, err)
        }
    }

    const getRolName = async () => {
        try {
            if (perfilData.RolId) {
                const response = await getRolRequest(perfilData.RolId)
                const data = response.data
                if (data.ok) {
                    setPerfil({ ...perfilData, rol: data.data.rol })
                }
            }
        } catch (error) {
            // if (error?.message) handlerMessages(setErrors, error.message)
            if (error?.response?.data?.message) handlerMessages(setErrors, error?.response?.data?.message)
        }
    }

    const verifyAuth = async () => {
        // TODO revisar si sirve.
        try {
            let datoLocal = getLocalStorage('token')
            if ([...datoLocal].length > 10) {
                // await verificarToken()
                // todo // console.log([...datoLocal].length > 10)
            }
        } catch (error) {
            if (error?.response?.data?.message) handlerMessages(setErrors, error?.response?.data?.message)
        }
    }

    const content = {
        errors,
        message,
        setErrors,
        setMessages,

        isAuthenticate,
        perfil,
        getPerfil,

        login,
        Logout,
        register,

        getSeccionesMenu,
        verifyAuth
    }

    return (<AuthContext.Provider value={content}>
        {children}
    </AuthContext.Provider>)
}