import React, { useEffect, useState } from "react";
import "./Anuncios.css"
import f1 from '../../assets/img/default.jpeg'
import NavBar from "../../components/publicComponents/Navbar/NavBar";
import { useDataGeneralContext } from "../../context/publicContexts/DataGeneralContext";
import { MOSTRAR_ARCHIVO } from "../../assets/includes/variables";
import { encontrarSeccionConMasElementos } from "../../assets/includes/funciones";
import Footer from '../../components/publicComponents/Footer/Footer'

export default function Anuncios() {
    const { anuncios} = useDataGeneralContext();
    const [seccionSeleccionada, setSeccionSeleccionada] = useState(null);
    const [headerMenu, setHeaderMenu] = useState([]);

    useEffect(() => {
        const datos = Object.keys(anuncios)
        setSeccionSeleccionada(encontrarSeccionConMasElementos(anuncios))
        setHeaderMenu(datos)
        console.log(anuncios)
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
                            onClick={() => setSeccionSeleccionada(key)}
                        >
                            {key}
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
            <Footer />
        </>
    );
}
