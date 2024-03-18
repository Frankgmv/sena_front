import axios from "axios";
import { useEffect, useState } from "react";
import './EventsPage.css'
import f1 from '../../assets/img/f1.jpg'
import NavBar from "../../components/publicComponents/Navbar/NavBar";

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState("");
    const [gallery, setGallery] = useState([]);

    const eventsEndpoint = "http://localhost:9000/api/v1/data/eventos";
    const galleryEndpoint = "http://localhost:9000/api/v1/multimedia/galeria";

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(eventsEndpoint);
                setEvents(response.data.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    const handleEventChange = async (eventId) => {
        setSelectedEventId(eventId);
        try {
            const response = await axios.get(`${galleryEndpoint}?EventoId=${eventId}`);
            setGallery(response.data.data);
        } catch (error) {
            console.error("Error al traer la imagen:", error);
        }
    };
    useEffect(() => {
        console.log(gallery);
      }, [gallery]);
    return (
        <>
            <NavBar />
            <div className="events-selector">
                <select onChange={(e) => handleEventChange(e.target.value)} value={selectedEventId}>
                    <option value="">Selecciona un evento</option>
                    {events.map((event) => (
                        <option key={event.id} value={event.id}>{event.evento}</option>
                    ))}
                </select>
            </div>
            <div className="image-gallery">
                {gallery.map((image) => (
                    <img key={image.id} src={`http://localhost:9000/api/v1/recursos/${image.imgPath}`} alt={image.titulo} onError={(e) => e.target.src = f1} />
                ))}
            </div>
        </>
    );
};

export default EventsPage;
