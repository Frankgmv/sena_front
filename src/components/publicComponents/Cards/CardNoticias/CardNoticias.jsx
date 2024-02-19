import './CardNoticias.css'
import defecto from '../../../../assets/img/default.jpeg'
import Boton2 from '../../botones/boton2/Boton2'

const CardNoticias = (data) => {
    return (
        <div className='conteinerCard'>
            <div className="imagen">
                <img src={defecto} alt="Imagen.png" />
            </div>
            <div className="texto">
                <div className="fecha">
                    <p>{data.fecha}</p>
                </div>
                <div className="titulo">
                    <h3>{data.titulo}</h3>
                </div>
                <div className="descripcion">
                    <p>{data.descripcion}</p>
                </div>
                <div className="boton">
                    <Boton2 
                        titulo='Leer mas'
                    />
                </div>
            </div>
        </div>
    )
}

export default CardNoticias
