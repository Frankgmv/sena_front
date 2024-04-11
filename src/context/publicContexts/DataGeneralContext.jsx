import { createContext, useContext, useEffect, useState } from "react";
import { getAllGaleriaRequest, getAllSliderRequest, getAllVideosRequest, getArchivoRequest } from "../../api/multimedia";
import { getAllCategoriasRequest, getAllEventosRequest, getAllItemRequest, getAllLinkPDFRequest, getAllNoticiasRequest, getAllSeccionesRequest } from "../../api/data";

const DataGeneralContext = createContext({
    noticias: [],
    secciones: [],
    categorias: [],
    items: [],
    navbar: [],
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
    const [eventoDataPura, setEventoDataPura] = useState([]);
    const [eventoData, setEventoData] = useState([]);
    const [noticias, setNoticias] = useState([]);
    const [items, setItems] = useState([]);
    const [navbar, setNavbar] = useState([]);
    const [links, setLinks] = useState([]);
    const [archivos, setArchivos] = useState([]);
    const [secciones, setSecciones] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetchEvents();
        getDefaultData();
        getSlider();
        getVideos();
        getItems()
        getNoticias()
        getArchivos()
        getLinks()
        getSeccionesYCategorias()
    }, []);

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

    const getLinks = async () => {
        try {
            const response = await getAllLinkPDFRequest()
            setLinks(response.data.data);
        } catch (error) {
            console.error("Error al traer la Items:", error);
        }
    };

    const getArchivos = async () => {
        try {
            const response = await getArchivoRequest()
            setArchivos(response.data.data);
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
        categorias
    }

    return (
        <DataGeneralContext.Provider value={allMethods}>
            {children}
        </DataGeneralContext.Provider>
    )
}