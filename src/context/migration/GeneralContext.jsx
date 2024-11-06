import { createContext, useContext, useEffect, useState } from "react";
import { deleteDetallePermisosRequest, getDetallePermisosByDocumentoRequest, getPermisosRequest, postDetallePermisoRequest} from "../../api/data";
import { handlerMessages } from "../../assets/includes/funciones";

const PermisosContext = createContext({
    errorsP: [],
    successP: [],

    permisosData: [],
    getDataPermisos: () => {},
    setPermisosData: () => {},
    postDataPermisos: () => {},
    deleteDataPermisos: () => {}
});

export const usePermisosContext = () => {
    const context = useContext(PermisosContext);
    if (!context) {
        throw new Error("Error en el General Context");
    }
    return context;
}

// eslint-disable-next-line react/prop-types
export const PermisosProvider = ({ children }) => {
    const [permisos, setPermisos] = useState([]);
    const [detallePermiso, setDetallePermiso] = useState([]);
    const [permisosData, setPermisosData] = useState([]);
    const [errorsP, setErrorsP] = useState([]);
    const [successP, setSuccessP] = useState([]);

    useEffect(() => {
        if (permisos.length != 0 && detallePermiso.length != 0) {
            const transformResponse = permisos.map(permiso => {
                if (detallePermiso.some(detalle => detalle.PermisoId === permiso.id)) {
                    return { ...permiso, value: true }
                }

                return { ...permiso, value: false }
            })
            setPermisosData(transformResponse)
        }else if(permisos.length != 0) {
            const transformResponse = permisos.map(permiso => {
                return { ...permiso, value: false }
            })
            setPermisosData(transformResponse)
        }
    }, [permisos, detallePermiso])

    const getDataPermisos = async (id) => {
        try {
            const detalle_permisos = await getDetallePermisosByDocumentoRequest(id)
            const permisos_ = await getPermisosRequest()
            if (detalle_permisos.data.ok) {
                setDetallePermiso(detalle_permisos?.data?.data)
                let dataPermisos = permisos_?.data?.data
                dataPermisos = dataPermisos.filter(permiso => permiso.permisoKey !== 'P_ADMIN')

                setPermisos(dataPermisos)

                if (detalle_permisos?.data?.message) handlerMessages(setSuccessP, detalle_permisos?.data?.message)
            }
        } catch (error) {
            const datos = error?.response?.data
            if (error?.message) handlerMessages(setErrorsP, error?.message)
            if (datos?.message) handlerMessages(setErrorsP, datos?.message)
        }
    }

    const postDataPermisos = async (PermisoId, UsuarioId) => {
        try {
            const crearPermiso = await postDetallePermisoRequest({ PermisoId, UsuarioId })
            if (crearPermiso.data.ok) {
                if (crearPermiso?.data?.message) handlerMessages(setSuccessP, crearPermiso?.data?.message)
            }
        } catch (error) {
            const datos = error?.response?.data
            if (error?.message) handlerMessages(setErrorsP, error?.message)
            if (datos?.message) handlerMessages(setErrorsP, datos?.message)
        }
    }
    const deleteDataPermisos = async (PermisoId, UsuarioId) => {
        try {
            const eliminarPermiso = await deleteDetallePermisosRequest(PermisoId, UsuarioId)
            if (eliminarPermiso.data.ok) {
                if (eliminarPermiso?.data?.message) handlerMessages(setErrorsP, eliminarPermiso?.data?.message)
            }
        } catch (error) {
            const datos = error?.response?.data
            if (error?.message) handlerMessages(setErrorsP, error?.message)
            if (datos?.message) handlerMessages(setErrorsP, datos?.message)
        }
    }

    const allMethods = {
        errorsP,
        successP,

        permisosData,
        getDataPermisos,
        setPermisosData,
        postDataPermisos,
        deleteDataPermisos,
    }

    // getDataPermisos, permisosData, errors, responseMessage, setPermisosData, postDataPermisos, deleteDataPermisos 

    return (
        <PermisosContext.Provider value={allMethods}>
            {children}
        </PermisosContext.Provider>
    )
}