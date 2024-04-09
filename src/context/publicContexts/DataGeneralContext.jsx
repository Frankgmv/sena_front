import { createContext, useContext, useEffect, useState } from "react";
import { getAllGaleriaRequest, getAllSliderRequest } from "../../api/multimedia";
import { getAllEventosRequest } from "../../api/data";

const DataGeneralContext = createContext({
    events: [],
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
    const [gallery, setGallery] = useState([]);
    const [eventoData, setEventoData] = useState([]);

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

    useEffect(() => {
        fetchEvents();
        getData();
        getSlider()
    }, []);

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

    const getData = async () => {
        try {

            const response = await getAllEventosRequest();
            const datos = response.data.data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 2);
            setEventoData(datos);
        } catch (error) {
            console.error("Error al traer los eventos imagen:", error);
        }
    };

    const AddImgs = async () => Promise.all(eventoData.map(async dataEvento => {
        const getFirstEvent = await getAllGaleriaRequest(dataEvento.id);
        let primero = await getFirstEvent.data
        primero = primero.data[0]

        return { ...dataEvento, imgPath: primero.imgPath }
    }))

    useEffect(() => {
        if (eventoData.length > 0) {
            AddImgs().then(data => {
                setEventoData(data)
            }).catch(error => {
                console.error("Error al traer los eventos imagen:", error);
            })
        }
    }, [eventoData]);

    const allMethods = {
        events,
        gallery,
        getAllGaleria,
        eventoData,
        slider
    }

    return (
        <DataGeneralContext.Provider value={allMethods}>
            {children}
        </DataGeneralContext.Provider>
    )
}