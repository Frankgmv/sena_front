import './CardEventos.css'
import f1 from '../../../../assets/img/f1.jpg'
import Boton2 from '../../botones/boton2/Boton2'

const CardEventos = (data) => {
    return (
        <div className='cardEventos'>
            <div className="eventos-img">
                <img src={f1} alt="" />
            </div>
            <div className="textoEventos">
                <div className="tituloEvento">
                    <h2>{data.titulo}</h2>
                </div>
                <div className="descripcionEvento">
                    <p>{data.descripcion}</p>
                </div>
                <div className="botonEvento">
                    <Boton2 
                        titulo='Ver más'
                    />
                </div>
            </div>
        </div>
    )
}

export default CardEventos
