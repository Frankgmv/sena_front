import { createContext, useContext, useEffect, useState } from "react";
import { getAllCategoriasRequest, getAllLinkBlogsRequestCpt, getAllSeccionesRequest, getPermisosRequest, getRolesRequest, getRolRequest, putRolRequest } from "../../api/data";
import { handlerMessages } from "../../assets/includes/funciones";
import { registerActionHistorial } from "../../assets/includes/historial";

const BasicallyContext = createContext({
    errors: [], message: [], setErrors: () => { }, setMessages: () => { }, // todo 

    // ! cargar blogs navbar
    navbar: [], getNavbar: () => { },

    // ! categorias
    categorias: [], getCategorias: () => { }, // todo

    // ! Secciones
    secciones: [], getSecciones: () => { }, // todo

    // ! roles
    roles: [], getRoles: () => { }, getRol: () => { }, putRol: () => { },

    // ! permisos
    permisos: [], getPermisos: () => { },

    // ! permisosData
    permisosData: [], getDataPermisos: () => { }, setPermisosData: () => { }, postDataPermisos: () => { }, deleteDataPermisos: () => { },

    getSeccionesMenu: () => { },
})

export const useBasicallyContext = () => {
    const context = useContext(BasicallyContext)

    if (!context) throw new Error("Error to try use Basically Context")

    return context
}

export const BasicallyProvider = ({ children }) => {

    // variables Principales
    const [roles, setRoles] = useState([])
    const [categorias, setCategorias] = useState([])
    const [secciones, setSecciones] = useState([])
    const [navbar, setNavbar] = useState([])
    const [permisos, setPermisos] = useState([])
    const [permisosData, setPermisosData] = useState([])

    // variables de Informaición
    const [errors, setErrors] = useState([])
    const [message, setMessages] = useState([])


    useEffect(() => {
        if(roles.length == 0) getRoles()
        if(categorias.length == 0) getCategorias()
        if(secciones.length == 0) getSecciones()
        if(permisos.length == 0) getPermisos()
    }, [])

    const getRoles = async () => {
        try {
            const dataRoles = await getRolesRequest()
            setRoles(dataRoles.data.data)
        } catch (error) {
            handlerMessages(setErrors, "Error al cargar roles")
        }
    }

    const getRol = async (id) => {
        try {
            const response = await getRolRequest(id)
            const data = await response.data
            return data
        } catch (error) {
            let message = error?.response?.data?.message || error?.message
            if (message) handlerMessages(setErrors, message)
            }
    }
    
    const putRol = async (id, estado) => {
        try {
            const inforRol = await getRolRequest(id)
            const response = await putRolRequest(id, { estado })
            const data = await response.data
            if (data.ok) {
                if (data.message) handlerMessages(setMessages, data.message)
                if (estado !== inforRol.data.data.estado) {
                    let estadoInfo = estado ? 'Activo' : 'Inactivo'
                    let estadoDb = !estadoInfo ? 'Activo' : 'Inactivo'
                    await registerActionHistorial(`Actualizó rol`, `Rol de ${inforRol?.data?.data?.rol} paso de '${estadoDb}' a '${estadoInfo}'`)
                }
            } else handlerMessages(setErrors, data.message)
        } catch (error) {
            let msg = error?.response?.message || error.message
            if (msg) handlerMessages(setErrors, msg)
        }
    }

    const getCategorias = async () => {
        try {
            const dataCategorias = await getAllCategoriasRequest()
            setCategorias(dataCategorias.data.data)
        } catch (error) {
            handlerMessages(setErrors, "Error al cargar Categorias")
        }
    }

    const getSecciones = async () => {
        try {
            const dataSecciones = await getAllSeccionesRequest()
            setSecciones(dataSecciones.data.data)
        } catch (error) {
            handlerMessages(setErrors, "Error al cargar Secciones")
        }
    }

    const getNavbar = async () => {
        try {
            const response = await getAllLinkBlogsRequestCpt()
            setNavbar(response.data.data)
        } catch (error) {
            handlerMessages(setErrors, "Error al cargar Links del menú")
        }
    }

    const getPermisos = async () => {
        try {
            const dataPermisos = await getPermisosRequest()
            setPermisos(dataPermisos.data.data)
        } catch (error) {
            handlerMessages(setErrors, "Error al cargar Permisos")
        }
    }

    const content = {
        secciones,
        categorias,
        permisos,

        errors,
        message,
        setErrors,
        setMessages,

        roles,
        getRoles,
        getRol,
        putRol,

        navbar,
        getNavbar


    }

    return (<BasicallyContext.Provider value={content}>
        {children}
    </BasicallyContext.Provider>)
}