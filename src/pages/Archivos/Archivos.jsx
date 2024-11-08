import './Archivos.css'
import { MOSTRAR_ARCHIVO } from '../../assets/includes/variables';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { FiEye } from 'react-icons/fi';
import { lazy, Suspense, useEffect } from 'react';
import LoadingScreen from '../../components/Loading/LoadingScreen';
<<<<<<< HEAD
=======
import { useBasicallyContext } from '../../context/migration/BasicallyContext.jsx';
import { useDataContext } from '../../context/migration/DataContext.jsx';
>>>>>>> improve_response

const Footer = lazy(() => import('../../components/publicComponents/Footer/Footer.jsx'))
const NavBar = lazy(() => import('../../components/publicComponents/Navbar/NavBar.jsx'))
const MenuInteractivo = lazy(() => import('../../components/publicComponents/MenuInteractivo/MenuInteractivo.jsx'))

const Archivos = () => {
<<<<<<< HEAD
    const { archivos: data, links, secciones, categorias, getLinks, getArchivos } = useDataGeneralContext()
    useEffect(() => {
        getArchivos()
        getLinks()
    }, [])
=======
    const { secciones, categorias } = useBasicallyContext()
    const { archivo: data, getArchivo, linksPDF: links, getPDFLinks } = useDataContext()

    useEffect(() => {
        if(data.length !== 0) getArchivo()
        if(links.length == 0) getPDFLinks()
        }, [])
>>>>>>> improve_response

    const isSmallScreen = useMediaQuery('(max-width: 700px)');
    return (
        <Suspense fallback={<LoadingScreen />}>
            <NavBar />
            <div className='linkArchivos'>
                <h2>Archivos Institucionales</h2>
                <div className="archivos-container">
                    {(data[0]?.titulo) && (
                        <div className='link'>
                            <h2><b>{data[0]?.titulo} </b> <small style={{ fontSize: '14px', marginLeft: '20px' }}>{data[0]?.createdAt}</small></h2>
                            <Link className="button" target='_blank' to={MOSTRAR_ARCHIVO(data[0]?.archivo)}>
                                <span className="button__text">Descargar PDF</span>
                                <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="bdd05811-e15d-428c-bb53-8661459f9307" data-name="Layer 2" className="svg"><path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path><path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path><path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path></svg></span>
                            </Link>
                        </div>
                    )}
                    {(data.length == 0) && (
                        <div className='link'>
                            <h2>Magazine vacío</h2>
                        </div>
                    )}
                </div>
                <div className="archivos-container">
                    {
                        (links.length > 0 && categorias.length > 1 && secciones.length > 1) && links.map((item) => {
                            let findCategoria = categorias.find(categoria => categoria.id === item.CategoriaId),
                                findSeccion = secciones.find(seccion => seccion.id === item.SeccionId),
                                datos = {
                                    ...item, CategoriaId: findCategoria.categoriaKey ? findCategoria.categoriaKey : item.CategoriaId,
                                    SeccionId: findSeccion.seccionKey ? findSeccion.seccionKey : item.SeccionId
                                }
                            return datos
                        }).map((item) => {
                            if (item.CategoriaId === 'ARCHIVO_PDF' && item.SeccionId === 'ARCHIVO_PDF') {
                                return (
                                    <div className='link' key={item.id}>
                                        <h2>{item.titulo}</h2>
                                        {item.descripcion && <p style={{ width: '90%' }}><small style={{ fontSize: '12px', color: 'black' }}>{item.createdAt}</small> <br />{item.descripcion} </p>}
                                        <Link className="button" target='_blank' to={item.link}>
                                            <span className="button__text">Ver archivo</span>
                                            <span hidden={isSmallScreen} className="button__icon">
                                                <FiEye
                                                    style={{
                                                        textAlign: "center",
                                                        fontSize: "20px",
                                                        width: '20px',
                                                        borderRadius: "5px",
                                                        color: "#fff",
                                                    }}
                                                />
                                            </span>
                                        </Link>

                                    </div>
                                )
                            }
                        }
                        )
                    }
                    {(links.length == 0) && (
                        <div className='link'>
                            <h2>No hay archivos Institucionales</h2>
                        </div>
                    )}
                </div>
            </div >
            <MenuInteractivo />
            <Footer />
        </Suspense>
    )
}

export default Archivos
