import { useEffect, useState } from 'react'
import f1 from '../../../assets/img/f1.jpg'
import f2 from '../../../assets/img/f2.jpg'
import f3 from '../../../assets/img/f3.jpg'
import f4 from '../../../assets/img/f4.jpg'
import NavBar from '../Navbar/NavBar'
import './slider.css'
import axios from 'axios'
import { BASE_URL_API, MOSTRAR_ARCHIVO } from '../../../assets/includes/variables'

const Slider = () => {

    const [data, setData] = useState([]);

    const endPoint = `${BASE_URL_API}/multimedia/slider`

    const getData = async () => {
        const response = await axios.get(endPoint);
        setData(response.data.data);
    };

    useEffect(() => {
        getData();
    }, []);
    return (
        <div className="body_slider">
            <div className="fondo"></div>
            <div className="slider">
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>
                            <img  src={MOSTRAR_ARCHIVO(item.imagenes.imgPath)} alt="Imagen" onError={(e) => e.target.src = f2} />
                            <div className="slider_texto">
                                <h2>Formando para la gente</h2>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Slider
