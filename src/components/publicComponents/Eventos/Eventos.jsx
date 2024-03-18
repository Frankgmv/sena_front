import { useEffect, useState } from 'react';
import './Eventos.css'
import axios from 'axios';
import f1 from '../../../assets/img/f1.jpg'
import Boton2 from '../botones/boton2/Boton2';
import { BASE_URL_API, MOSTRAR_ARCHIVO } from '../../../assets/includes/variables';

const Eventos = () => {
    const [data, setData] = useState([]);

    const endPoint = `${BASE_URL_API}/data/eventos`

    const getData = async () => {
        const response = await axios.get(endPoint);
        setData(response.data.data);
    };

    useEffect(() => {
        getData();
    }, []);

    const ultimosEventos = data
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .slice(0, 2);
    return (
        <div className='eventosBody'>
            <div className="titulo">
                <h2>Galería de Eventos</h2>
            </div>
            <div className="containerCardEventos">
                {ultimosEventos.map((item) => (
                    <div className='cardEventos' key={item.id}>
                        <div className="eventos-img">
                            <img src={MOSTRAR_ARCHIVO(item.imgPath)} alt="Imagen" onError={(e) => e.target.src = f1} />
                        </div>
                        <div className="textoEventos">
                            <div className="tituloEvento">
                                <h2>{item.evento}</h2>
                            </div>
                            <div className="botonEvento">
                                <Boton2
                                    link='/galeria'
                                    titulo='Ver más'
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Eventos
