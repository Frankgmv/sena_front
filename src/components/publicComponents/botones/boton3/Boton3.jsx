import { Link } from 'react-router-dom'
import './Boton3.css'

const Boton3 = (data) => {
    return (
        <div>
            <Link to={data.link}>
                <button className="btn" type={data.type}>{data.nombre}</button>
            </Link>
        </div>
    )
}

export default Boton3
