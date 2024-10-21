import React, { lazy, useEffect, useState } from "react";
import "./Anuncios.css"
import f1 from '../../assets/img/default.jpeg'
import { MOSTRAR_ARCHIVO } from "../../assets/includes/variables";
import { encontrarSeccionConMasElementos } from "../../assets/includes/funciones";
import { useDataContext } from "../../context/migration/DataContext.jsx";
import { useBasicallyContext } from "../../context/migration/BasicallyContext.jsx";

const NavBar = lazy(() => import("../../components/publicComponents/Navbar/NavBar.jsx"))
const Footer = lazy(() => import('../../components/publicComponents/Footer/Footer.jsx'))
const MenuInteractivo = lazy(() => import("../../components/publicComponents/MenuInteractivo/MenuInteractivo.jsx"))

export default function Anuncios() {
    const { anuncios : dataAnuncios, mostrarAnuncios, anunciosView: anuncios, getAnuncios} = useDataContext();
    const { secciones } = useBasicallyContext()

    const [seccionSeleccionada, setSeccionSeleccionada] = useState(null);
    const [headerMenu, setHeaderMenu] = useState([]);

    useEffect(() => {
        if(dataAnuncios.length > 0){
            mostrarAnuncios(dataAnuncios, secciones)
        } else {
            getAnuncios()
        }
    }, [])
    
    useEffect(() => {
        if(dataAnuncios){
            mostrarAnuncios(dataAnuncios, secciones)
        }
    }, [dataAnuncios])
    
    useEffect(() => {
        const datos = Object.keys(anuncios)
        setSeccionSeleccionada(encontrarSeccionConMasElementos(anuncios))
        setHeaderMenu(datos)
    }, [anuncios])

    return (
        <>
            <NavBar />
            <div className="container-anuncios">
                <div className="menu-secciones">
                    {headerMenu.map((key, i) => (
                        <div
                            className={`seccion-item ${key === seccionSeleccionada ? "selected" : ""}`}
                            key={i}
                            style={{ color: (key === seccionSeleccionada) ? 'black' : null }}
                            onClick={() => setSeccionSeleccionada(key)}
                        >
                            {key} <b><small>({anuncios[key].length})</small></b>
                        </div>
                    ))}
                </div>
                <div className="anuncios-seccion">
                    {(seccionSeleccionada) && anuncios[seccionSeleccionada].map((anuncio, i) => {
                        return (
                            <div className="card-anuncios" key={i}>
                                <div className="container-img">
                                    <img src={MOSTRAR_ARCHIVO(anuncio.imgPath)} alt={anuncio.titulo} title={anuncio.titulo} onError={(e) => e.target.src = f1} />
                                </div>
                                <div className="container-info">
                                    <h3>{anuncio.titulo}</h3>
                                    <p>{anuncio.descripcion}</p>
                                    <span>{anuncio.createdAt}</span>
                                </div>
                            </div>
                        )
                    })
                    }
                    {(seccionSeleccionada && anuncios[seccionSeleccionada] == 0) && <h1>No hay anuncios en la seccion de {seccionSeleccionada}</h1>}
                </div>
            </div>
            <div className="menu-intereactivo">
                <MenuInteractivo />
            </div>
            <Footer />
        </>
    );
}
