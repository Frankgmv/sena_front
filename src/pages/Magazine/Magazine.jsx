import { lazy, Suspense, useEffect, useState } from 'react';
import './Magazine.css';
import { MOSTRAR_ARCHIVO } from '../../assets/includes/variables';
import moment from 'moment/moment';
<<<<<<< HEAD
import { useDataGeneralContext } from '../../context/publicContexts/DataGeneralContext';
import { Link } from 'react-router-dom';
import LoadingScreen from '../../components/Loading/LoadingScreen';
=======
import { Link } from 'react-router-dom';
import LoadingScreen from '../../components/Loading/LoadingScreen';
import { useDataContext } from '../../context/migration/DataContext.jsx';
>>>>>>> improve_response

const NavBar = lazy(() => import('../../components/publicComponents/Navbar/NavBar.jsx'))
const Footer = lazy(() => import('../../components/publicComponents/Footer/Footer.jsx'))
const MenuInteractivo = lazy(() => import('../../components/publicComponents/MenuInteractivo/MenuInteractivo.jsx'))

const Magazine = () => {
<<<<<<< HEAD
    const { archivos: data, getArchivos } = useDataGeneralContext()
=======
    const { archivo: data, getArchivo } = useDataContext()
    
>>>>>>> improve_response
    const [mostrar, setMostrar] = useState(false);

    useEffect(() => {
        setMostrar(true);
    }, [data]);

    useEffect(() => {
<<<<<<< HEAD
        getArchivos()
=======
        if(data.length == 0) getArchivo()
>>>>>>> improve_response
    }, [])

    return (
        <Suspense fallback={<LoadingScreen />}>
            <div>
                <NavBar />
                <div className='link' style={{ display: 'flex', justifyContent: 'center' }}>
<<<<<<< HEAD
                    <Link style={{ backgroundColor: 'var(--success)', textDecoration: 'none', color: 'white' }} className="button" target='_blank' to={MOSTRAR_ARCHIVO(data.archivo)}>
=======
                    <Link style={{ backgroundColor: 'var(--success)', padding: '9px', textDecoration: 'none', color: 'white', borderRadius: '5px' }} className="button" target='_blank' to={MOSTRAR_ARCHIVO(data[0]?.archivo)}>
>>>>>>> improve_response
                        <span className="button__text">Ver archivo</span>
                    </Link>
                </div>
                <div style={mostrar ? {} : { display: 'none' }} className="magazine-container">
                    <div className='card'>
                        <div className="encabezado">
<<<<<<< HEAD
                            <h1>{data.titulo}</h1>
                            <p>{moment(data.createdAt).format('DD/MM/YYYY')}</p>
                        </div>
                        <iframe src={MOSTRAR_ARCHIVO(data.archivo)} />
=======
                            <h1>{data[0]?.titulo}</h1>
                            <p>{moment(data[0]?.createdAt).format('DD/MM/YYYY')}</p>
                        </div>
                        <iframe src={MOSTRAR_ARCHIVO(data[0]?.archivo)} />
>>>>>>> improve_response
                    </div>
                </div>
            </div>
            <MenuInteractivo />
            <Footer />
        </Suspense>
    );
};

export default Magazine;
