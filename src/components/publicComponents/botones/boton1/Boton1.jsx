import { Link } from 'react-router-dom'
import './Boton1.css'

const Boton1 = (data) => {
    return (
        <div>
            <button className="learn-more">
                <span className="circle">
                    <span className="icon arrow" />
                </span>
                <Link className="button-text" to={data.linkBoton} >{data.textBoton}</Link>
            </button>
        </div>
    )
}

export default Boton1
