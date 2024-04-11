import CardMenuInteractivo from '../Cards/CardMenuInteractivo/CardMenuInteractivo'
import './MenuInteractivo.css'
import admin from '../../../assets/img/admin.jpg'
import register from '../../../assets/img/register.jpg'
import login from '../../../assets/img/login.jpg'
import news from '../../../assets/img/news.jpg'
import galeria from '../../../assets/img/galeria.jpg'
import ubication from '../../../assets/img/3425077.png'
import files from '../../../assets/img/files.jpeg'
import pqrs from '../../../assets/img/pqrs.png'
import pdf from '../../../assets/img/pdf.png'
import { Link } from 'react-router-dom'
import { useDataGeneralContext } from '../../../context/publicContexts/DataGeneralContext'

const MenuInteractivo = () => {
    const {items: data} = useDataGeneralContext()

    return (
        <div className='menuBody'>
            <div className="titulo">
                <h2>Nuestro Menú Interactivo</h2>
            </div>
            <div className="menuCards">
                <CardMenuInteractivo
                    link="/noticias"
                    name="Noticias"
                    img={news}
                />
                <CardMenuInteractivo
                    link="/galeria"
                    name="Galería"
                    img={galeria}
                />
                <CardMenuInteractivo
                    link="/pqrs"
                    name="PQRS"
                    img={pqrs}
                />
                <CardMenuInteractivo
                    link="/magazine"
                    name="Magazine"
                    img={files}
                />
                <CardMenuInteractivo
                    link="https://www.google.com/maps?ll=4.811764,-75.681906&z=13&t=m&hl=es&gl=CO&mapclient=embed&cid=3726081407287373697"
                    name="Ubicacion"
                    target='_blank'
                    img={ubication}
                />
                <CardMenuInteractivo
                    link="/archivos"
                    name="Archivos Institucionales"
                    img={pdf}
                />
                <CardMenuInteractivo
                    link="/login"
                    name="Inicio sesión"
                    img={login}
                />
                <CardMenuInteractivo
                    link="/register"
                    name="Registrar"
                    img={register}
                />
                <CardMenuInteractivo
                    link="/admin"
                    name="Administrar"
                    img={admin}
                />
                {data.map((item) => (
                    <div className='containerMenuCard' key={item.id} hidden={!item.estado}>
                        <Link className="menuLink" to={item.link} target='_blank'>
                            <div className="cardImagen">
                                <img src={`http://localhost:9000/api/v1/recursos/${item.imgPath}`} alt="Imagen.png" />
                            </div>
                            <div className="menuLinks">
                                <h3>{item.titulo}</h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MenuInteractivo
