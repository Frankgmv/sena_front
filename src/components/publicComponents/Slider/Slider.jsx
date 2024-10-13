import f2 from '../../../assets/img/f2.jpg'
import './slider.css'
import {MOSTRAR_ARCHIVO } from '../../../assets/includes/variables'
import { useDataGeneralContext } from '../../../context/publicContexts/DataGeneralContext'
import { useEffect } from 'react'

const Slider = () => {
    const {slider: data, getSlider} = useDataGeneralContext()

    useEffect(()=>{
        getSlider()
    }, [])
    
    return (
        <div className="body_slider">
            <div className="fondo"></div>
            <div className="slider">
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>
                            <img  src={MOSTRAR_ARCHIVO(item.imagenes.imgPath)} alt="Imagen" onError={(e) => e.target.src = f2} />
                            <div className="slider_texto">
                                <h2>Centenario Pereira</h2>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Slider
