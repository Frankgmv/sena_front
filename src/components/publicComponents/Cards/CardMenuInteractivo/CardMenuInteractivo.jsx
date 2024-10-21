import { Link } from 'react-router-dom'
import './CardMenuInteractivo.css'
const CardMenuInteractivo = (data) => {
    const { hidden } = data
    let mostrar = hidden ? 'none': ''

    return (
        <div className='containerMenuCard' style={{'display': mostrar}}>
            <Link className="menuLink" to={data.link} target={data.target}>
                <div className="cardImagen">
                    <img src={data.img} title={`Ir a ${data.name}`} alt={data.name}/>
                </div>
                <div className="menuLinks">
                    <h3>{data.name}</h3>
                </div>
            </Link>
        </div>
    )
}

export default CardMenuInteractivo
