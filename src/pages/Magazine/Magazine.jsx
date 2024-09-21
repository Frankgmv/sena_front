import { lazy, Suspense, useEffect, useState } from 'react';
import './Magazine.css';
import { MOSTRAR_ARCHIVO } from '../../assets/includes/variables';
import moment from 'moment/moment';
import { useDataGeneralContext } from '../../context/publicContexts/DataGeneralContext';
import { Link } from 'react-router-dom';
import LoadingScreen from '../../components/Loading/LoadingScreen';

const NavBar = lazy(() => import('../../components/publicComponents/Navbar/NavBar.jsx'))
const Footer = lazy(() => import('../../components/publicComponents/Footer/Footer.jsx'))
const MenuInteractivo = lazy(() => import('../../components/publicComponents/MenuInteractivo/MenuInteractivo.jsx'))

const Magazine = () => {
    const { archivos: data, getArchivos } = useDataGeneralContext()
    const [mostrar, setMostrar] = useState(false);

    useEffect(() => {
        setMostrar(true);
    }, [data]);

    useEffect(() => {
        getArchivos()
    }, [])

    return (
        <Suspense fallback={<LoadingScreen />}>
            <div>
                <NavBar />
                <div className='link' style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link style={{ backgroundColor: 'var(--success)', textDecoration: 'none', color: 'white' }} className="button" target='_blank' to={MOSTRAR_ARCHIVO(data.archivo)}>
                        <span className="button__text">Ver archivo</span>
                    </Link>
                </div>
                <div style={mostrar ? {} : { display: 'none' }} className="magazine-container">
                    <div className='card'>
                        <div className="encabezado">
                            <h1>{data.titulo}</h1>
                            <p>{moment(data.createdAt).format('DD/MM/YYYY')}</p>
                        </div>
                        <iframe src={MOSTRAR_ARCHIVO(data.archivo)} />
                    </div>
                </div>
            </div>
            <MenuInteractivo />
            <Footer />
        </Suspense>
    );
};

export default Magazine;
