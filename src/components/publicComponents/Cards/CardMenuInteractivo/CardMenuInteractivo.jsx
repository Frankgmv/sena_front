import { Link } from 'react-router-dom'
import './CardMenuInteractivo.css'

const CardMenuInteractivo = (data) => {
    return (
        <div className='containerMenuCard'>
            <Link className="menuLink" to={data.link} target={data.target}>
                <div className="cardImagen">
                    <img src={data.img} alt="Imagen.png" />
                </div>
                <div className="menuLinks">
                    <h3>{data.name}</h3>
                </div>
            </Link>
        </div>
    )
}

export default CardMenuInteractivo
