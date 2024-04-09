import './Eventos.css'
import f1 from '../../../assets/img/f1.jpg'
import Boton2 from '../botones/boton2/Boton2';
import { MOSTRAR_ARCHIVO } from '../../../assets/includes/variables';
import { useDataGeneralContext } from '../../../context/publicContexts/DataGeneralContext';

const Eventos = () => {  
    const { eventoData: data } = useDataGeneralContext()

    return (
        <div className='eventosBody'>
            <div className="titulo">
                <h2>Galería de Eventos</h2>
            </div>
            <div className="containerCardEventos">
                {data.map((item) => (
                    <div className='cardEventos' key={item.id}>
                        <div className="eventos-img">
                            <img src={MOSTRAR_ARCHIVO(item.imgPath)} alt={item.evento} title={item.evento} onError={(e) => e.target.src = f1} />
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
