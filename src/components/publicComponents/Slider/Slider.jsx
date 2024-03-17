import { useEffect, useState } from 'react'
import f1 from '../../../assets/img/f1.jpg'
import f2 from '../../../assets/img/f2.jpg'
import f3 from '../../../assets/img/f3.jpg'
import f4 from '../../../assets/img/f4.jpg'
import NavBar from '../Navbar/NavBar'
import './slider.css'
import axios from 'axios'

const Slider = () => {

    const [data, setData] = useState([]);

    const endPoint = "http://localhost:9000/api/v1/multimedia/slider";

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
                            <img  src={`http://localhost:9000/api/v1/recursos/${item.imagenes.imgPath}`} alt="Imagen" onError={(e) => e.target.src = f2} />
                            <div className="slider_texto">
                                <h2>¡Bienvenidos a nuestra institución educativa en Pereira!</h2>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Slider
