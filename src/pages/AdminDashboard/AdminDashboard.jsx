import { Routes, Route, Outlet } from 'react-router-dom';
import SidebarAdmin from '../../components/privateComponents/SidebarAdmin/SidebarAdmin';
import './AdminDashboard.css';
import { IoIosArrowDown } from 'react-icons/io';
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from 'react';
import MenuInteractivoAdmin from '../admin/menuInteractivo/MenuInteractivoAdmin';
import UsersList from '../../components/privateComponents/Table/UsersList/UsersList';

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
                        <Route exact path='/' element={<UsersList />} />
                        <Route path='./menu' element={<MenuInteractivoAdmin />} />
                    </Routes>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
