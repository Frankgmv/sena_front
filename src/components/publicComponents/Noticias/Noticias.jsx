import f1 from '.././../../assets/img/default.jpeg'
import Boton1 from "../botones/boton1/Boton1"
import './Noticias.css'
import Boton2 from "../botones/boton2/Boton2.jsx";
import { formateFecha } from "../../../assets/includes/funciones.js";
import { MOSTRAR_ARCHIVO } from "../../../assets/includes/variables.js";
import { useDataGeneralContext } from "../../../context/publicContexts/DataGeneralContext.jsx";

const Noticias = () => {

    const {noticias: data} = useDataGeneralContext()

    const ultimasNoticias = data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 2);

    return (
        <div className="newsBody" id="noticias">
            <div className="encabezado">
                <div className="titulo">
                    <h2>Noticias sobre nuestra comunidad educativa</h2>
                    <p>En este apartado podrás ver las noticias mas recientes publicadas por nuestro personal administrativo para mantenerte informado</p>
                </div>
                <div className="boton">
                    <Boton1
                        linkBoton='/noticias'
                        textBoton='Ver Más Noticias'
                    />
                </div>  
            </div>
            <div className="containerCard">
                {ultimasNoticias.map((item) => (
                    <div className='conteinerCard-news' key={item.id}>
                        <div className="imagen">
                            <img src={MOSTRAR_ARCHIVO(item.imgPath)} alt="Imagen" onError={(e) => e.target.src = f1} />
                        </div>
                        <div className="texto">
                            <div className="fecha">
                                <p>{formateFecha(item.createdAt)}</p>
                            </div>
                            <div className="tituloCardNew">
                                <h3>{item.titulo}</h3>
                            </div>
                            <div className="encabezado">
                                <h3>{item.encabezado}</h3>
                            </div>
                            <div className="descripcion">
                                <p>{item.descripcion}</p>
                            </div>
                            <div className="boton">
                                <Boton2
                                    link='/noticias'
                                    titulo='Leer mas'
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Noticias;
