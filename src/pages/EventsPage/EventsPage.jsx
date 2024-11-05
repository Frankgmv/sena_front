import './EventsPage.css'
import f1 from '../../assets/img/f1.jpg'
import { MOSTRAR_ARCHIVO } from "../../assets/includes/variables";
import { useDataGeneralContext } from "../../context/publicContexts/DataGeneralContext";
import LoadingScreen from '../../components/Loading/LoadingScreen';
import { lazy, Suspense, useEffect } from 'react';
<<<<<<< HEAD
=======
import { useMultimediaContext } from '../../context/migration/MultimediaContext.jsx';
>>>>>>> improve_response

const MenuInteractivo = lazy(() => import('../../components/publicComponents/MenuInteractivo/MenuInteractivo.jsx'))
const Footer = lazy(() => import('../../components/publicComponents/Footer/Footer.jsx'))
const NavBar = lazy(() => import("../../components/publicComponents/Navbar/NavBar.jsx"))

const EventsPage = () => {

<<<<<<< HEAD
    const { gallery, events, getAllGaleria, fetchEvents } = useDataGeneralContext()
=======
    const { gallery, getAllGaleria } = useDataGeneralContext()
    const { eventos, getEventos } = useMultimediaContext()
>>>>>>> improve_response

    const handleEventChange = async (eventId) => getAllGaleria(eventId)

    useEffect(() => {
<<<<<<< HEAD
        fetchEvents()
=======
        if (eventos.length == 0) getEventos()
        if(gallery.length == 0) getAllGaleria()
>>>>>>> improve_response
    }, [])

    return (
        <Suspense fallback={<LoadingScreen />}>
            <NavBar />
            <div className='filtro_galeria'>
                <h3 className='titulo_galeria'>Eventos Realizados</h3>
                <div className="events-selector">
                    <select onChange={(e) => handleEventChange(e.target.value)}>
                        <option value="">Todos</option>
                        {eventos.map((event) => (
                            <option key={event.id} value={event.id}>{event.evento}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="image-gallery">
                {gallery.map((image) => (
                    <div className="img" key={image.id}>
                        <img key={image.id} src={MOSTRAR_ARCHIVO(image.imgPath)} alt={image.titulo} title={image.titulo} onError={(e) => e.target.src = f1}/>
                        <span className='info-galery'>{image.titulo}</span>
                    </div>
                ))}
            </div>
            <MenuInteractivo />
            <Footer />
        </Suspense>
    );
};

export default EventsPage;
