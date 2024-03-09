import { Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from '../../components/privateComponents/SidebarAdmin/SidebarAdmin';
import './AdminDashboard.css';
import { IoIosArrowDown } from 'react-icons/io';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import UserList from '../../components/privateComponents/Table/UsersList/UsersList';
import RolList from '../../components/privateComponents/Table/RolList/RolList';

const AdminDashboard = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='adminBody'>
            <div className='Navbar-Body'>
                <nav>
                    <div className="encabezado">
                        <Sidebar />
                        <h3>Centenario Pereira</h3>
                    </div>
                    <div className="info">
                        <div className="text">
                            <h4 className='user'>Frank Muriel</h4>
                            <p className='rol'>Personal Administrativo</p>
                        </div>
                        <div>
                        </div>
                        <div className="icon">
                            <IoIosArrowDown
                                id="demo-positioned-button"
                                aria-controls={open ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            />
                            <Menu
                                className='bodyMenuNavbar'
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <MenuItem onClick={handleClose}>Perfil</MenuItem>
                                <MenuItem onClick={handleClose}>Cerrar Sesion</MenuItem>
                                <MenuItem onClick={handleClose}>Home Page</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="contenido">
                <div className="adminContent">
                    <Routes>
                        <Route path='/' element={<UserList />}/>
                        <Route path='/rol-list' element={<RolList />}/>
                    </Routes>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
