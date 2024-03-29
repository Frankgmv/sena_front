import { useEffect, useState } from 'react'
import NavBar from '../../components/publicComponents/Navbar/NavBar'
import './Archivos.css'
import axios from 'axios';
import { BASE_URL_API } from '../../assets/includes/variables';

const Archivos = () => {

    const [archivos, setArchivos] = useState();

    const endPoint = `${BASE_URL_API}/multimedia/archivos`

    const getData = async () => {
        const response = await axios.get(endPoint);
        setArchivos(response.data.data);
    };

    useEffect(() => {
        getData();
    }, []);

    console.log(archivos);

    return (
        <div>
            <NavBar />
            <div className="linksSection-archivos">
                {/* {archivos.map((item) => (
                    <div className="card-news" key={item.id}>
                        <embed className="cardpdf-archivos" src={MOSTRAR_ARCHIVO(item.archivo)} type="application/pdf" />
                        <div className="contenido">
                            <h2 className="cardTitle-archivos">{item.titulo}</h2>
                        </div>
                    </div>
                ))} */}
            </div>
        </div>
    )
}

export default Archivos
