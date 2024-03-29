// import { useEffect, useState } from 'react';
// import NavBar from '../../components/publicComponents/Navbar/NavBar'
// import './Magazine.css'
// import { BASE_URL_API } from '../../assets/includes/variables';
// import axios from 'axios';

// const Magazine = () => {

//     const [data, setArchivo] = useState([]);

//     const endPoint = `${BASE_URL_API}/multimedia/archivos`


//     const getData = async () => {
//         const response = await axios.get(endPoint);
//         setArchivo(response.data.data);
//     };

//     useEffect(() => {
//         getData();
//     }, []);

//     console.log(data);

//     return (
//         <div>
//             <NavBar />
//             <div className="magazine-container">
//             {data.map((item) => (
//                 // <embed src={MOSTRAR_ARCHIVO(item.archivo)} type="application/pdf" width="100%" height="600px" />
//                 <h1 key={item.id}>{item.titulo}</h1>
//             ))}
//             </div>
//         </div>
//     )
// }

// export default Magazine


// ! En proceso, error con el .map porque lo lee como objeto