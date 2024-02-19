import { Link } from 'react-router-dom'
import './CardMenuInteractivo.css'
import defecto from '../../../../assets/img/default.jpeg'

const CardMenuInteractivo = (data) => {
    return (
        <div className='containerMenuCard'>
            <Link className="menuLink" to={data.link}>
                <div className="cardImagen">
                    <img src={defecto} alt="Imagen.png" />
                </div>
                <div className="menuLinks">
                    <h3>{data.name}</h3>
                </div>
            </Link>
        </div>
    )
}

export default CardMenuInteractivo
