import axios from "axios";
import { useEffect, useState } from "react";
import './NewsPage.css'
import f1 from '../../assets/img/f1.jpg'
import { Modal } from "@mui/material";
import NavBar from "../../components/publicComponents/Navbar/NavBar";
import { formateFecha } from "../../assets/includes/funciones";
import { BASE_URL_API, MOSTRAR_ARCHIVO } from "../../assets/includes/variables";

const NewsPage = () => {
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const endPoint = `${BASE_URL_API}/data/noticias`

    const getData = async () => {
        const response = await axios.get(endPoint);
        setData(response.data.data);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleOpen = (item) => {
        setSelectedItem(item);
    };
    const handleClose = () => {
        setSelectedItem(null);
    };

    return (
        <>
            <NavBar />
            <div className="cardBody-news">
                {data.map((item) => (
                    <div className="card-news" key={item.id}>
                        <img className="cardImg-news" src={MOSTRAR_ARCHIVO(item.imgPath)} alt="Imagen" onError={(e) => e.target.src = f1} />
                        <div className="contenido">
                            <h2 className="cardTitle-news">{item.titulo}</h2>
                            <h3 className="cardSubtitle-news">{item.encabezado}</h3>
                            <a onClick={() => handleOpen(item)} className="cardLink-news">Ver Más</a>
                        </div>
                    </div>
                ))}
            </div>
            {selectedItem && (
                <Modal
                    open={true}
                    onClose={handleClose}   
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className="modalNews">
                        <p className="fecha">{formateFecha(selectedItem.createdAt)}</p>
                        <h1>{selectedItem.titulo}</h1>
                        <img className="cardImg-news" src={MOSTRAR_ARCHIVO(selectedItem.imgPath)} alt="Imagen" onError={(e) => e.target.src = f1} />
                        <h2>{selectedItem.encabezado}</h2>
                        <p className="descripcion">{selectedItem.descripcion}</p>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default NewsPage;