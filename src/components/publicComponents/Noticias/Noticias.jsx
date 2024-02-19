import CardNoticias from "../Cards/CardNoticias/CardNoticias.jsx"
import Boton1 from "../botones/boton1/Boton1"
import './Noticias.css'

const Noticias = () => {
    return (
        <div className="newsBody">
            <div className="encabezado">
                <div className="titulo">
                    <h2>Noticias sobre nuestra comunidad educativa</h2>
                    <p>En este apartado podrás ver las noticias mas recientes publicadas por nuestro personal administrativo para mantenerte informado</p>
                </div>
                <div className="boton">
                    <Boton1 
                        linkBoton='/login'
                        textBoton='Ver Más Noticias'
                    />
                </div>
            </div>
            <div className="containerCard">
                <CardNoticias 
                    fecha='2024/02/06'
                    titulo='Regreso a clases'
                    descripcion='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                />
                <CardNoticias 
                    fecha='2024/02/06'
                    titulo='Regreso a clases'
                    descripcion='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                />
            </div>
        </div>
    )
}

export default Noticias
