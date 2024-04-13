import { createContext, useContext, useEffect, useState } from "react";
import { getAllGaleriaRequest, getAllSliderRequest, getAllVideosRequest, getArchivoRequest } from "../../api/multimedia";
import { getAllAnunciosRequest, getAllCategoriasRequest, getAllEventosRequest, getAllItemRequest, getAllLinkBlogsRequest, getAllLinkPDFRequest, getAllNoticiasRequest, getAllSeccionesRequest } from "../../api/data";
import moment from "moment/moment";

const DataGeneralContext = createContext({
    noticias: [],
    secciones: [],
    anuncios: [],
    categorias: [],
    items: [],
    navbar: {},
    archivos: [],
    links: [],
    events: [],
    videos: [],
    eventoData: [],
    slider: [],
    gallery: [],
    getAllGaleria: () => { }
});

export const useDataGeneralContext = () => {
    const context = useContext(DataGeneralContext);
    if (!context) {
        throw new Error("Error en el Public Pqrs Context");
    }

    return context;
};

// eslint-disable-next-line react/prop-types
export const DataGeneralProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [slider, setSlider] = useState([]);
    const [videos, setVideos] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [anuncios, setAnuncios] = useState([]);
    const [anunciosData, setAnunciosData] = useState([]);
    const [eventoDataPura, setEventoDataPura] = useState([]);
    const [eventoData, setEventoData] = useState([]);
    const [noticias, setNoticias] = useState([]);
    const [items, setItems] = useState([]);
    const [navbar, setNavbar] = useState({});
    const [blogs, setBlogs] = useState([]);
    const [links, setLinks] = useState([]);
    const [archivos, setArchivos] = useState([]);
    const [secciones, setSecciones] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetchEvents()
        getDefaultData()
        getSlider()
        getVideos()
        getItems()
        getNoticias()
        getArchivos()
        getLinks()
        getSeccionesYCategorias()
        getBlogs()
        getAnuncios()
    }, []);

    useEffect(() => {
        if (categorias.length > 1) {
            trasformaDataBlogs()
        }
    }, [blogs, categorias]);

    useEffect(() => {
        if (secciones.length > 1) {
            trasformaDataAnuncios()
        }
    }, [anunciosData, secciones]);

    const trasformaDataBlogs = () => {
        const categoriaBlog = categorias.reduce((save, item) => {
            let findLinks = blogs.filter(blog => blog.CategoriaId === item.id).map(link => {
                let findSeccion = secciones.find(seccion => seccion.id === link.SeccionId)
                return { ...link, SeccionId: findSeccion.seccionKey }
            }).filter(link => link.SeccionId === "S_PLAT_ACADEMICAS")

            if (!save[`${item.categoria}`] && item.categoria != "ARCHIVO_PDF") {
                save[`${item.categoria}`] = findLinks
            }

            return save
        }, {})

        setNavbar(categoriaBlog)
    };
    const trasformaDataAnuncios = () => {
        const seccionesTransform = secciones.filter(seccion => !(seccion.seccionKey == "S_PLAT_ACADEMICAS" || seccion.seccionKey == "ARCHIVO_PDF"))
        .reduce((save, item) => {
            let findAnuncios = anunciosData.filter(anuncio => anuncio.SeccionId === item.id)
            if (!save[`${item.seccion}`]) {
                save[`${item.seccion}`] = findAnuncios
            }

            return save
        }, {})
        setAnuncios(seccionesTransform)
    };

    const fetchEvents = async () => {
        try {
            const response = await getAllEventosRequest()
            setEvents(response.data.data);
            const responseGaleria = await getAllGaleriaRequest()
            setGallery(responseGaleria.data.data);
        } catch (error) {
            console.error("Error al traer los eventos:", error);
        }
    };

    const getSeccionesYCategorias = async () => {
        try {
            const seccResponse = await getAllSeccionesRequest()
            const catResponse = await getAllCategoriasRequest()
            setCategorias(catResponse.data.data);
            setSecciones(seccResponse.data.data);
        } catch (error) {
            console.error("Error al traer la Items:", error);
        }
    };

    const getBlogs = async () => {
        try {
            const response = await getAllLinkBlogsRequest()
            setBlogs(response.data.data);
        } catch (error) {
            console.error("Error al traer la Items:", error);
        }
    };

    const getLinks = async () => {
        try {
            const response = await getAllLinkPDFRequest()
            let linkReset = response.data.data
            linkReset = linkReset.map((linkReset) => {
                return {
                    ...linkReset,
                    createdAt: moment(linkReset.createdAt).format('DD/MM/YY')
                }
            })
            setLinks(linkReset);
        } catch (error) {
            console.error("Error al traer la Items:", error);
        }
    };

    const getAnuncios = async () => {
        try {
            const response = await getAllAnunciosRequest()
            let dataAnuncios = response.data.data
            dataAnuncios = dataAnuncios.map((dataAnuncios) => {
                return {
                    ...dataAnuncios,
                    createdAt: moment(dataAnuncios.createdAt).format('DD/MM/YY')
                }
            })
            setAnunciosData(dataAnuncios);
        } catch (error) {
            console.error("Error al traer la Items:", error);
        }
    };

    const getArchivos = async () => {
        try {
            const response = await getArchivoRequest()
            let dataReset = response.data.data
            dataReset = {
                ...dataReset,
                createdAt: '📅 ' + moment(dataReset.createdAt).format('DD/MM/YY')
            }
            setArchivos(dataReset);
        } catch (error) {
            console.error("Error al traer la Items:", error);
        }
    };
    const getNoticias = async () => {
        try {
            const response = await getAllNoticiasRequest()
            setNoticias(response.data.data);
        } catch (error) {
            console.error("Error al traer la Items:", error);
        }
    };
    const getItems = async () => {
        try {
            const response = await getAllItemRequest()
            setItems(response.data.data);
        } catch (error) {
            console.error("Error al traer la Items:", error);
        }
    };

    const getAllGaleria = async (eventId = "") => {
        try {
            const response = await getAllGaleriaRequest(eventId)
            setGallery(response.data.data);
        } catch (error) {
            console.error("Error al traer la imagen:", error);
        }
    };

    const getSlider = async () => {
        try {
            const response = await getAllSliderRequest()
            setSlider(response.data.data);
        } catch (error) {
            console.error("Error al traer el slider:", error);
        }
    };

    const getVideos = async () => {
        try {
            const response = await getAllVideosRequest()
            setVideos(response.data.data);
        } catch (error) {
            console.error("Error al traer el videos:", error);
        }
    };

    const getDefaultData = async () => {
        try {
            const response = await getAllEventosRequest();
            const datos = response.data.data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 2);
            setEventoDataPura(datos);
        } catch (error) {
            console.error("Error al traer los eventos imagen:", error);
        }
    };

    const AddImgs = async () => Promise.all(eventoDataPura.map(async dataEvento => {
        const getFirstEvent = await getAllGaleriaRequest(dataEvento.id);
        let primero = await getFirstEvent.data
        primero = primero.data[0]
        return { ...dataEvento, imgPath: primero.imgPath }
    }))

    useEffect(() => {
        if (eventoDataPura.length > 0) {
            AddImgs().then(data => {
                setEventoData(data)
            }).catch(error => {
                console.error("Error al traer los eventos imagen:", error);
            })
        }
    }, [eventoDataPura]);

    const allMethods = {
        events,
        gallery,
        getAllGaleria,
        eventoData,
        slider,
        videos,
        noticias,
        items,
        navbar,
        archivos,
        links,
        secciones,
        categorias,
        anuncios
    }

    return (
        <DataGeneralContext.Provider value={allMethods}>
            {children}
        </DataGeneralContext.Provider>
    )
}