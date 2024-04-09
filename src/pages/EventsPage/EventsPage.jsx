import './EventsPage.css'
import f1 from '../../assets/img/f1.jpg'
import NavBar from "../../components/publicComponents/Navbar/NavBar";
import { MOSTRAR_ARCHIVO } from "../../assets/includes/variables";
import { useDataGeneralContext } from "../../context/publicContexts/DataGeneralContext";
import { useState } from 'react';

const EventsPage = () => {
    const { gallery, events, getAllGaleria } = useDataGeneralContext()
    const handleEventChange = async (eventId) => getAllGaleria(eventId)

    return (
        <>
            <NavBar />
            <div className="events-selector">
                <select onChange={(e) => handleEventChange(e.target.value)}>
                    <option value="">Selecciona un evento</option>
                    {events.map((event) => (
                        <option key={event.id} value={event.id}>{event.evento}</option>
                    ))}
                </select>
            </div>
            <div className="image-gallery">
                {gallery.map((image) => (
                    <img key={image.id} src={MOSTRAR_ARCHIVO(image.imgPath)} alt={image.titulo} onError={(e) => e.target.src = f1}
                    />
                ))}
            </div>
        </>
    );
};

export default EventsPage;
