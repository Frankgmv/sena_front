import './EventsPage.css'
import f1 from '../../assets/img/f1.jpg'
import { MOSTRAR_ARCHIVO } from "../../assets/includes/variables";
import { useDataGeneralContext } from "../../context/publicContexts/DataGeneralContext";
import LoadingScreen from '../../components/Loading/LoadingScreen';
import { lazy, Suspense, useEffect } from 'react';

const MenuInteractivo = lazy(() => import('../../components/publicComponents/MenuInteractivo/MenuInteractivo.jsx'))
const Footer = lazy(() => import('../../components/publicComponents/Footer/Footer.jsx'))
const NavBar = lazy(() => import("../../components/publicComponents/Navbar/NavBar.jsx"))

const EventsPage = () => {

    const { gallery, events, getAllGaleria, fetchEvents } = useDataGeneralContext()

    const handleEventChange = async (eventId) => getAllGaleria(eventId)

    useEffect(() => {
        fetchEvents()
    }, [])

    return (
        <Suspense fallback={<LoadingScreen />}>
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
                    <div className="img" key={image.id}>
                        <img key={image.id} src={MOSTRAR_ARCHIVO(image.imgPath)} alt={image.titulo} title={image.titulo} onError={(e) => e.target.src = f1}
                        />
                        <span className='info'>{image.titulo}</span>
                    </div>
                ))}
            </div>
            <MenuInteractivo />
            <Footer />
        </Suspense>
    );
};

export default EventsPage;
