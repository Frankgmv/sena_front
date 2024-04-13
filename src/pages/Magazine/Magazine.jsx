import { useEffect, useState } from 'react';
import NavBar from '../../components/publicComponents/Navbar/NavBar';
import './Magazine.css';
import { BASE_URL_API, MOSTRAR_ARCHIVO } from '../../assets/includes/variables';
import axios from 'axios';
import moment from 'moment/moment';
import Footer from '../../components/publicComponents/Footer/Footer';

const Magazine = () => {
    const [data, setArchivo] = useState({});

    const endPoint = `${BASE_URL_API}/multimedia/archivos`;

    const getData = async () => {
        const response = await axios.get(endPoint);
        setArchivo(response.data.data);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div>
                <NavBar />
                <div className="magazine-container">
                    {data && (
                        <div className='card'>
                            <div className="encabezado">
                                <h1>{data.titulo}</h1>
                                <p>{moment(data.createdAt).format('DD/MM/YYYY')}</p>
                            </div>
                            <iframe src={MOSTRAR_ARCHIVO(data.archivo)} />
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Magazine;
