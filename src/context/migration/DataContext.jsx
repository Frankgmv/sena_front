import { createContext, useContext, useState } from "react";
import { deleteAnuncioRequest, deleteItemRequest, deleteLinkRequest, deleteNoticiaRequest, deleteTokenRequest, deleteUsuarioRequest, getAllAnunciosRequest, getAllItemRequest, getAllLinkPDFRequest, getAllLinkRequest, getAllNoticiasRequest, getAllTokenRequest, getAnuncioRequest, getCredencialesEmailRequest, getItemRequest, getLinkRequest, getNoticiaRequest, getTokenRequest, getUsuarioRequest, getUsuariosRequest, postAnuncioRequest, postItemRequest, postLinkRequest, postNoticiaRequest, postUsuarioRequest, putAnuncioRequest, putCredencialesEmailRequest, putItemRequest, putLinkRequest, putNoticiaRequest, putTokenRequest, putUsuarioPerfilRequest, putUsuarioRequest } from "../../api/data";
import { handlerMessages } from "../../assets/includes/funciones";
import { registerActionHistorial } from "../../assets/includes/historial";
import moment from "moment";
import { deleteArchivoRequest, getArchivoRequest, postArchivoRequest } from "../../api/multimedia";
import { perfilRequest } from "../../api/auth";
import { crearCodigoRequest, nuevoPasswordRequest, validarCodigoRequest } from "../../api/recuperacion";

const DataContext = createContext({
    // ? Variables Globales de apoyo
    errors: [], message: [], setErrors: () => { }, setMessages: () => { },

    // ! Anuncios 
    anuncios: [], getAnuncios: () => { }, postAnuncio: () => { }, getAnuncio: () => { }, putAnuncio: () => { }, deleteAnuncio: () => { }, anunciosView: [], mostrarAnuncios: () => { },

    // ! Archivos Magazine
    archivo: [], getArchivo: () => { }, postArchivo: () => { }, deleteArchivo: () => { },

    // ! Link
    links: [], getLinks: () => { }, postLink: () => { }, getLink: () => { }, putLink: () => { }, deleteLink: () => { }, linksPDF: [], getPDFLinks: () => { },

    // ! Items
    items: [], getItems: () => { }, postItem: () => { }, getItem: () => { }, putItem: () => { }, deleteItem: () => { },

    // ! Credencial
    credencialesEmail: [], getCredencialesEmail: () => { }, putCredencialesEmail: () => { },

    // !  Noticias
    noticias: [], getNoticias: () => { }, postNoticia: () => { }, getNoticia: () => { }, putNoticia: () => { }, deleteNoticia: () => { },

    // ! Usuario
    usuarios: [], getUsers: () => { }, getUsuario: () => { }, registrarUsuario: () => { }, updateUsuario: () => { }, deleteUsuario: () => { }, updatePerfil: () => { },

    // ! token
    tokens: [], getTokens: () => { }, getToken: () => { }, putToken: () => { }, deleteToken: () => { },

    // ! reset password
    crearCodigo: () => { }, validarCodigo: () => { }, cambiarPassword: () => { },
})

export const useDataContext = () => {
    const context = useContext(DataContext)
    if (!context) throw new Error("DataContext isn't working")
    return context
}

export const DataContextProvider = ({ children }) => {
    const [errors, setErrors] = useState([])
    const [message, setMessages] = useState([])

    // ! Anuncios 
    const [anuncios, setAnuncios] = useState([])
    const [anunciosView, setAnunciosView] = useState([])

    const mostrarAnuncios = async (anuncios, secciones) => {
        try {
            if (anuncios) {
                let dataAnuncios = anuncios
                dataAnuncios = dataAnuncios.map((dataAnuncios) => {
                    return {
                        ...dataAnuncios,
                        createdAt: moment(dataAnuncios.createdAt).format('DD/MM/YY')
                    }
                })

                if (secciones) {
                    const seccionesTransform = secciones.filter(seccion => !(seccion.seccionKey == "S_PLAT_ACADEMICAS" || seccion.seccionKey == "ARCHIVO_PDF"))
                        .reduce((save, item) => {
                            let findAnuncios = dataAnuncios.filter(anuncio => anuncio.SeccionId === item.id)
                            if (!save[`${item.seccion}`]) {
                                save[`${item.seccion}`] = findAnuncios
                            }

                            return save
                        }, {})
                    setAnunciosView(seccionesTransform)
                };

            }
        } catch (error) {
            // console.log("Error al traer la Items:", error);
        }
    };

    const getAnuncios = async () => {
        try {
            const response = await getAllAnunciosRequest()
            const data = await response?.data
            if (data?.ok) setAnuncios(data.data)
        } catch (error) {
            if (error?.message) handlerMessages(setErrors, error?.message)
            if (error?.response?.data?.message) handlerMessages(setErrors, error?.response?.data?.message)
        }
    }

    const getAnuncio = async (id) => {
        try {
            const response = await getAnuncioRequest(id)
            const data = await response.data
            if (data?.ok) handlerMessages(setMessages, data.message)
            return data
        } catch (error) {
            if (error?.message) handlerMessages(setErrors, error?.message)
            if (error?.response?.data?.message) handlerMessages(setErrors, error?.response?.data?.message)
        }
    }

    const postAnuncio = async (dataAnuncio, perfilUsuario) => {
        try {
            let id_perfil = JSON.stringify(perfilUsuario.id)
            const datosAnuncio = dataAnuncio
            datosAnuncio.set('UsuarioId', id_perfil)
            const response = await postAnuncioRequest(datosAnuncio)
            const data = await response.data

            if (data.ok) {
                handlerMessages(setMessages, data.message)
                await registerActionHistorial(`Creó anuncio`, `con titulo '${datosAnuncio.get('titulo')}'`)
            } else {
                handlerMessages(setErrors, data.message)
            }

            getAnuncios()
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.zodError) {
                error?.response?.data?.zodError?.issues.map(error => {
                    handlerMessages(setErrors, error?.message)
                })
            }

            if (datos?.message) handlerMessages(setErrors, datos?.message)
            if (error?.message) handlerMessages(setErrors, error?.message)
        }
    }

    const putAnuncio = async (id, dataAnuncio) => {
        try {
            const response = await putAnuncioRequest(id, dataAnuncio)
            const data = await response.data
            if (data.ok) {
                const anuncioInfo = await getAnuncioRequest(id)
                handlerMessages(setMessages, data.message)
                await registerActionHistorial(`Actualizó anuncio`, `Anuncio con titulo '${anuncioInfo?.data?.data.titulo}'`)
            } else {
                handlerMessages(setErrors, data.message)
            }
            getAnuncios()
        } catch (error) {
            const datos = error.response.data
            if (datos?.zodError) {
                error.response.data.zodError.issues.map(error => {
                    handlerMessages(setErrors, error.message)
                })
            }

            if (datos.message) handlerMessages(setErrors, datos.message)
            if (error.message) handlerMessages(setErrors, error.message)
        }
    }

    const deleteAnuncio = async (id) => {
        try {
            const anuncioInfo = await getAnuncioRequest(id)
            const response = await deleteAnuncioRequest(id)
            const data = await response.data
            if (data.ok) {
                handlerMessages(setMessages, data.message)
                await registerActionHistorial(`Eliminó anuncio`, `Anuncio con titulo '${anuncioInfo?.data?.data?.titulo}'`)
                getAnuncios()
            }
        } catch (error) {
            const datos = error.response.data
            if (datos?.zodError) {
                error.response.data.zodError.issues.map(error => {
                    handlerMessages(setErrors, error.message)
                })
            }

            if (datos.message) handlerMessages(setErrors, datos.message)
            if (error.message) handlerMessages(setErrors, error.message)
        }
    }

    // ! Archivos PDF

    const [archivo, setArchivo] = useState([])

    const getArchivo = async () => {
        try {
            const response = await getArchivoRequest()
            const data = await response?.data
            if (data.ok) {
                setArchivo([data?.data])
            }
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.message) handlerMessages(setErrors, datos?.message)
            if (error?.message) handlerMessages(setErrors, error?.message)
        }
    }

    const postArchivo = async (dataNoticia, perfil_id) => {
        try {
            const id_perfil = "" + perfil_id
            const datosNoticia = dataNoticia
            datosNoticia.set('UsuarioId', id_perfil)
            const response = await postArchivoRequest(datosNoticia)
            const data = await response.data
            if (data.ok) {
                handlerMessages(setMessages, data?.message)
                await registerActionHistorial(`Creó Archivo PDF`, `Archivo con titulo '${datosNoticia.get('titulo')}'`)
                getArchivo()
            } else {
                handlerMessages(setErrors, data?.message)
            }
        } catch (error) {
            const datos = error.response.data
            if (datos?.zodError) {
                error.response.data.zodError.issues.map(error => {
                    handlerMessages(setErrors, error.message)
                })
            }
            if (datos.message) handlerMessages(setErrors, datos.message)
        }
    }

    const deleteArchivo = async () => {
        try {
            const response = await deleteArchivoRequest()
            const data = await response.data
            if (data.ok) {
                handlerMessages(setMessages, data.message)
                await registerActionHistorial(`Eliminó Archivo PDF`, `Archivo con titulo '${archivo[0].titulo}'`)
                getArchivo()
            }
        } catch (error) {
            const datos = error.response.data
            if (datos?.message) handlerMessages(setErrors, datos?.message)
        }
    }

    // ! links
    const [links, setLinks] = useState([])

    const getLinks = async () => {
        try {
            const response = await getAllLinkRequest()
            const data = await response.data
            if (data.ok) {
                setLinks(data?.data)
            }
        } catch (error) {
            const datos = error.response.data
            if (datos.message) handlerMessages(setErrors, datos.message)
            if (error?.message) handlerMessages(setErrors, error?.message)
        }
    }

    const getLink = async (id) => {
        try {
            const response = await getLinkRequest(id)
            const data = await response.data
            if (data.ok) {
                handlerMessages(setMessages, data.message)
                return data
            } else {
                if (data?.message) handlerMessages(setErrors, datos?.message)
            }
        } catch (error) {
            const datos = error.response.data
            if (datos?.message) handlerMessages(setErrors, datos?.message)
            if (error?.message) handlerMessages(setErrors, error?.message)
        }
    }


    const postLink = async (dataLink, perfil_id) => {
        try {
            const datosLink = { ...dataLink, UsuarioId: parseInt(perfil_id) }
            const response = await postLinkRequest(datosLink)
            const data = await response.data
            if (data.ok) {
                handlerMessages(setMessages, data.message)
                await registerActionHistorial(`Creó link`, `link con titulo '${dataLink.titulo}'`)
            } else {
                if (data.message) handlerMessages(setErrors, data.message)
            }
            getLinks()
        } catch (error) {
            const datos = error.response.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrors, error?.message)
                })
            }
            if (error?.message) handlerMessages(setErrors, error?.message)
            if (datos?.message) handlerMessages(setErrors, datos?.message)
        }
    }

    const putLink = async (id, dataLink) => {
        try {
            const infoLink = await getLinkRequest(id)
            const response = await putLinkRequest(id, dataLink)
            const data = await response.data
            if (data.ok) {
                handlerMessages(setMessages, data.message)
                await registerActionHistorial(`Actualizó link`, `link con titulo '${infoLink.data.data.titulo}'`)
            } else {
                if (data.message) handlerMessages(setErrors, data.message)
            }
            getLinks()
        } catch (error) {
            const datos = error.response.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrors, error?.message)
                })
            }
            if (error?.message) handlerMessages(setErrors, error?.message)
        }
    }

    const deleteLink = async (id) => {
        try {
            const infoLink = await getLinkRequest(id)
            const response = await deleteLinkRequest(id)
            const data = await response?.data
            if (data?.ok) {
                await registerActionHistorial(`Eliminó link`, `link con titulo '${infoLink.data.data.titulo}'`)
                getLinks()
            }
        } catch (error) {
            const datos = error.response.data
            if (datos?.message) handlerMessages(setErrors, datos?.message)
            if (error?.message) handlerMessages(setErrors, error?.message)
        }
    }

    const [linksPDF, setLinksPDF] = useState([])

    const getPDFLinks = async () => {
        try {
            const response = await getAllLinkPDFRequest()
            let linkReset = response?.data?.data
            linkReset = linkReset?.map((linkReset) => {
                return { ...linkReset, createdAt: moment(linkReset?.createdAt).format('DD/MM/YY') }
            })
            setLinksPDF(linkReset);
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.message) handlerMessages(setErrors, datos?.message)
            if (error?.message) handlerMessages(setErrors, error?.message)
        }
    }

    // ! items
    const [items, setItems] = useState([])

    const getItems = async () => {
        try {
            const response = await getAllItemRequest()
            const data = await response.data
            if (data.ok) {
                setItems(data.data)
            }
        } catch (error) {

            const datos = error?.response?.data
            if (datos?.message) handlerMessages(setErrors, datos?.message)
            if (error?.message) handlerMessages(setErrors, error?.message)
        }
    }

    const getItem = async (id) => {
        try {
            const response = await getItemRequest(id)
            const data = await response.data
            if (data.ok) handlerMessages(setMessages, data.message)
            return data
        } catch (error) {
            const datos = error?.response?.dataF
            if (datos?.message) handlerMessages(setErrors, datos?.message)
            if (error?.message) handlerMessages(setErrors, error?.message)
        }
    }

    const postItem = async (dataItem, perfil_id) => {
        try {
            const datosItem = dataItem
            datosItem.set('UsuarioId', parseInt(perfil_id))
            const response = await postItemRequest(datosItem)
            const data = await response.data
            if (data.ok) {
                if (data?.message) handlerMessages(setMessages, data?.message)
                await registerActionHistorial(`Creó Item de menú`, `Item con titulo '${datosItem.get('titulo')}'`)
            } else {
                handlerMessages(setErrors, data?.message)
            }
        } catch (error) {
            const datos = error.response.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrors, error?.message)
                })
            }
            if (error?.message) handlerMessages(setErrors, error?.message)
            if (datos?.message) handlerMessages(setErrors, datos?.message)
        }
    }

    const putItem = async (id, dataItem) => {
        try {
            const infoItem = await getItemRequest(id)
            const response = await putItemRequest(id, dataItem)
            const data = await response.data
            if (data.ok) {
                handlerMessages(setMessages, data?.message)
                await registerActionHistorial(`Actualizó Item de menú`, `Item con titulo '${infoItem?.data?.data?.titulo}'`)
            } else {
                handlerMessages(setErrors, data?.message)
            }
            getItems()
        } catch (error) {
            const datos = error.response.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrors, error?.message)
                })
            }
            if (error?.message) handlerMessages(setErrors, error?.message)
            if (datos?.message) handlerMessages(setErrors, datos?.message)
        }
    }

    const deleteItem = async (id) => {
        try {
            const infoItem = await getItemRequest(id)
            const response = await deleteItemRequest(id)
            const data = await response.data
            if (data.ok) {
                handlerMessages(setMessages, data?.message)
                await registerActionHistorial(`Eliminó Item de menú`, `Item con titulo '${infoItem?.data?.data?.titulo}'`)
                getItems()
            }
        } catch (error) {
            if (error?.message) handlerMessages(setErrors, error?.message)
            if (datos?.message) handlerMessages(setErrors, datos?.message)
        }
    }

    // ! tokens
    const [tokens, setTokens] = useState([])

    const getTokens = async () => {
        try {
            const response = await getAllTokenRequest()
            const data = await response.data
            if (data.ok) setTokens(data.data)
        } catch (error) {
            const datos = error?.response?.data
            if (error?.message) handlerMessages(setErrors, error?.message)
            if (datos?.message) handlerMessages(setErrors, datos?.message)
        }
    }

    const getToken = async (id) => {
        try {
            const response = await getTokenRequest(id)
            const data = await response?.data
            if (data.ok) handlerMessages(setMessages, data?.message)
            return data
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.message) handlerMessages(setErrors, datos?.message)
            if (error?.message) handlerMessages(setErrors, error?.message)
        }
    }

    const putToken = async (id, dataToken) => {
        try {
            if (!dataToken.token || dataToken.token === '') {
                delete dataToken.token
            }
            const infoToken = await getTokenRequest(id)
            const response = await putTokenRequest(id, dataToken)
            const data = await response.data
            if (data.ok) {
                handlerMessages(setMessages, data?.message)
                await registerActionHistorial(`Actualizó token ${infoToken.data.data.nombre}`, `Token con tokenKey ${infoToken.data.data.tokenKey}`)
            } else {
                handlerMessages(setErrors, data?.message)
            }
            getTokens()
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrors, error?.message)
                })
            }
            if (error?.message) handlerMessages(setErrors, error?.message)
            if (datos?.message) handlerMessages(setErrors, datos?.message)
        }
    }

    const deleteToken = async (id) => {
        try {
            const infoToken = await getTokenRequest(id)
            const response = await deleteTokenRequest(id)
            const data = await response.data
            if (data.ok) {
                handlerMessages(setMessages, data?.message)
                getTokens()
                await registerActionHistorial(`Eliminó token ${infoToken.data.data.nombre}`, `Token con tokenKey ${infoToken.data.data.tokenKey}`)
            } else {
                handlerMessages(setErrors, data?.message)
            }
        } catch (error) {
            const datos = error?.response?.data
            if (error?.message) handlerMessages(setErrors, error?.message)
            if (datos?.message) handlerMessages(setErrors, datos?.message)
        }
    }

    // ! CredencialesEmail
    const [credencialesEmail, setCredencialesEmail] = useState([]);

    const getCredencialesEmail = async () => {
        try {
            const response = await getCredencialesEmailRequest()
            const data = await response.data
            setCredencialesEmail(data.data)
        } catch (error) {
            const datos = error?.response?.data
            if (error?.message) handlerMessages(setErrors, error?.message)
            if (datos?.message) handlerMessages(setErrors, datos?.message)
        }
    }

    const putCredencialesEmail = async (id, datos, perfil_id) => {
        try {
            const response = await putCredencialesEmailRequest(id, datos)
            const data = await response.data
            if (data.ok) {
                if (data.message) handlerMessages(setMessages, data?.message)
                await registerActionHistorial(`Actualizó Credenciales`, `Modificó el credencial de los email de la plataforma [id usuario, ${perfil_id}]`)
                getCredencialesEmail()
            } else handlerMessages(setErrors, data?.message)
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrors, error?.message)
                })
            }
            if (error?.message) handlerMessages(setErrors, error?.message)
            if (datos?.message) handlerMessages(setErrors, datos?.message)
        }
    }

    // ! Noticias
    const [noticias, setNoticias] = useState([]);

    const getNoticias = async () => {
        try {
            const response = await getAllNoticiasRequest()
            const data = await response.data
            if (data.ok) setNoticias(data.data)
        } catch (error) {
            const datos = error?.response?.data
            if (error?.message) handlerMessages(setErrors, error?.message)
            if (datos?.message) handlerMessages(setErrors, datos?.message)
        }
    }

    const getNoticia = async (id) => {
        try {
            const response = await getNoticiaRequest(id)
            const data = await response.data
            if (data.ok) handlerMessages(setMessages, data?.message)
            return data
        } catch (error) {
            const datos = error?.response?.data
            if (error?.message) handlerMessages(setErrors, error?.message)
            if (datos?.message) handlerMessages(setErrors, datos?.message)
        }
    }

    const postNoticia = async (dataNoticia, perfil_id) => {
        try {
            const datosNoticia = dataNoticia
            datosNoticia.set('UsuarioId', perfil_id)
            const response = await postNoticiaRequest(datosNoticia)
            const data = await response.data
            if (data.ok) {
                handlerMessages(setMessages, data?.message)
                await registerActionHistorial(`Creó Noticia`, `Noticia con titulo '${datosNoticia.get('titulo')}'`)
                getNoticias()
            } else handlerMessages(setErrors, data?.message)
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrors, error?.message)
                })
            }
            if (error?.message) handlerMessages(setErrors, error?.message)
            if (datos?.message) handlerMessages(setErrors, datos?.message)
        }
    }

    const putNoticia = async (id, dataNoticia) => {
        try {
            const infoNoticia = await getNoticiaRequest(id)
            const response = await putNoticiaRequest(id, dataNoticia)
            const data = await response.data
            if (data.ok) {
                handlerMessages(setMessages, data?.message)
                await registerActionHistorial(`Actualizó Noticia`, `Noticia con titulo '${infoNoticia?.data?.data?.titulo}'`)
            } else handlerMessages(setErrors, data?.message)
            getNoticias()
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrors, error?.message)
                })
            }
            if (error?.message) handlerMessages(setErrors, error?.message)
            if (datos?.message) handlerMessages(setErrors, datos?.message)
        }
    }

    const deleteNoticia = async (id) => {
        try {
            const infoNoticia = await getNoticiaRequest(id)
            const response = await deleteNoticiaRequest(id)
            const data = await response.data
            if (data.ok) {
                handlerMessages(setMessages, data?.message)
                await registerActionHistorial(`Eliminó Noticia`, `Noticia con titulo '${infoNoticia?.data?.data?.titulo}'`)
                getNoticias()
            }
        } catch (error) {
            const datos = error?.response?.data
            if (error?.message) handlerMessages(setErrors, error?.message)
            if (datos?.message) handlerMessages(setErrors, datos?.message)
        }
    }


    // ! usuarios
    const [usuarios, setUsuarios] = useState([]);

    const getUsers = async () => {
        try {
            const response = await getUsuariosRequest()
            const data = await response.data
            if (data.ok) setUsuarios(data.data)
        } catch (error) {
            const datos = error?.response?.data
            if (error?.message) handlerMessages(setErrors, error?.message)
            if (datos?.message) handlerMessages(setErrors, datos?.message)
        }
    }

    const getUsuario = async (id) => {
        try {
            const response = await getUsuarioRequest(id)
            const data = await response.data
            if (!data.ok) handlerMessages(setErrors, data?.message)
            return data
        } catch (error) {
            const datos = error?.response?.data
            if (error?.message) handlerMessages(setErrors, error?.message)
            if (datos?.message) handlerMessages(setErrors, datos?.message)
        }
    }

    const registrarUsuario = async (dataUsuario) => {
        try {
            const response = await postUsuarioRequest(dataUsuario)
            const data = await response.data
            if (data.ok) {
                handlerMessages(setMessages, data?.message)
                getUsers()
                await registerActionHistorial(`Insertó usuario`, `Usuario con id ${dataUsuario.id} y nombre ${dataUsuario.nombre} ${dataUsuario.apellido}`)
            } else handlerMessages(setErrors, data?.message)
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrors, error?.message)
                })
            }
            if (datos?.message) handlerMessages(setErrors, datos?.message)
        }
    }

    const updateUsuario = async (id, dataUsuario, perfil_id) => {
        try {
            const infoUsuario = await getUsuarioRequest(id)
            const response = await putUsuarioRequest(id, dataUsuario)
            const data = await response.data
            if (data.ok) {
                handlerMessages(setMessages, data?.message)
                getUsers()
                await registerActionHistorial(`Actualizó usuario`, `[usuario id, ${perfil_id}] actualizó usuario con id ${infoUsuario?.data?.data?.id} y nombre ${infoUsuario?.data?.data?.nombre} ${infoUsuario?.data?.data?.apellido}`)
            } else handlerMessages(setErrors, data?.message)
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrors, error?.message)
                })
            }
            if (error?.message) handlerMessages(setErrors, error?.message)
            if (datos?.message) handlerMessages(setErrors, datos?.message)
        }
    }
    const updatePerfil = async (dataUsuario) => {
        try {
            const infoUsuario = await perfilRequest()
            const response = await putUsuarioPerfilRequest(infoUsuario?.data?.data?.id, dataUsuario)
            const data = await response.data
            if (data.ok) {
                handlerMessages(setMessages, data?.message)
                getUsers()
                await registerActionHistorial(`Actualizó su perfil`, `Usuario con id ${infoUsuario?.data?.data?.id} y nombre ${infoUsuario?.data?.data?.nombre} ${infoUsuario?.data?.data?.apellido} actualizo su perfil`)
            } else handlerMessages(setErrors, data?.message)
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrors, error?.message)
                })
            }
            if (datos?.message) handlerMessages(setErrors, datos?.message)
        }
    }

    const deleteUsuario = async (id) => {
        try {
            const infoUsuario = await getUsuarioRequest(id)
            const response = await deleteUsuarioRequest(id)
            const data = await response.data
            if (data.ok) {
                handlerMessages(setMessages, data?.message)
                getUsers()
                await registerActionHistorial(`Eliminó usuario`, `Eliminó usuario con id ${infoUsuario?.data?.data?.id} y nombre ${infoUsuario?.data?.data?.nombre} ${infoUsuario?.data?.data?.apellido}`)
            } else handlerMessages(setErrors, data?.message)
        } catch (error) {
            const datos = error?.response?.data
            if (error?.message) handlerMessages(setErrors, error?.message)
            if (datos?.message) handlerMessages(setErrors, datos?.message)
        }
    }

    // ! Reset password
    
    const crearCodigo = async (data) => {
        try {
            const response = await crearCodigoRequest(data);
            return response.data
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrors, error?.message)
                    })
            }
            if (datos?.message) handlerMessages(setErrors, datos?.message)
            if (error?.message) handlerMessages(setErrors, error?.message)
        }
    }
    
    const validarCodigo = async (data) => {
        try {
            const response = await validarCodigoRequest(data);
            return response.data

        } catch (error) {
            const datos = error?.response?.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrors, error?.message)
                    })
            }
            if (datos?.message) handlerMessages(setErrors, datos?.message)
            if (error?.message) handlerMessages(setErrors, error?.message)
        }
    }
    const cambiarPassword = async (data) => {
        try {
            const response = await nuevoPasswordRequest(data);
            return response.data
        } catch (error) {
            const datos = error?.response?.data
            if (datos?.zodError) {
                datos.zodError.issues.map(error => {
                    if (error?.message) handlerMessages(setErrors, error?.message)
                })
            }
            if (datos?.message) handlerMessages(setErrors, datos?.message)
            if (error?.message) handlerMessages(setErrors, error?.message)
        }
    }
    
    const content = {
        errors, message, setErrors, setMessages,
        anuncios, getAnuncios, getAnuncio, postAnuncio, putAnuncio, deleteAnuncio, anunciosView, mostrarAnuncios,
        archivo, getArchivo, postArchivo, deleteArchivo,
        links, getLinks, postLink, getLink, putLink, deleteLink,
        linksPDF, getPDFLinks,
        items, getItems, getItem, postItem, putItem, deleteItem,
        tokens, getTokens, getToken, putToken, deleteToken,
        credencialesEmail, getCredencialesEmail, putCredencialesEmail,
        noticias, getNoticias, getNoticia, postNoticia, putNoticia, deleteNoticia,
        usuarios, getUsers, getUsuario, registrarUsuario, updatePerfil, deleteUsuario, updateUsuario,
        crearCodigo, validarCodigo, cambiarPassword
    }

    return (
        <DataContext.Provider value={content}>
            {children}
        </DataContext.Provider>
    )
}