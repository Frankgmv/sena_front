import { Routes, Route, Outlet } from 'react-router-dom';
import SidebarAdmin from '../../components/privateComponents/SidebarAdmin/SidebarAdmin';
// import InfoUsuario from '../admin/infoUsuario/InfoUsuario';
// import MenuInteractivo from '../admin/menuInteractivo/MenuInteractivo';
import './AdminDashboard.css';
import { IoIosArrowDown } from 'react-icons/io';
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from 'react';
import SliderFotos from '../admin/sliderFotos/SliderFotos';

const AdminDashboard = () => {
    const [showSide, setShowSide] = useState(false)
    return (
        <div className='adminBody'>
            <div className='Navbar-Body'>
                <nav>
                    <div className="encabezado">
                        <RxHamburgerMenu onClick={() => setShowSide(!showSide)} />
                        <h3>Centenario Pereira</h3>
                    </div>
                    <div className="info">
                        <div className="text">
                            <h4 className='user'>Frank Muriel</h4>
                            <p className='rol'>Personal Administrativo</p>
                        </div>
                        <div className="icon">
                            <IoIosArrowDown />
                        </div>
                    </div>
                </nav>
            </div>
            <div className="contenido">
                <div className="containerSidebar">
                    <SidebarAdmin show={showSide} />
                </div>
                <div className="adminContent">
                    <Routes>
                        <Route path='/' element={<SliderFotos />} />
                        {/* <Route path='admin/ menu-interactivo' exact={true} component={MenuInteractivo} /> */}
                    </Routes>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
