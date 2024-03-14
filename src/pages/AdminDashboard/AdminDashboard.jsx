import { Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from '../../components/privateComponents/SidebarAdmin/SidebarAdmin';
import './AdminDashboard.css';
import { IoIosArrowDown } from 'react-icons/io';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import UserList from '../../components/privateComponents/Table/data/UsersList/UsersList';
import RolList from '../../components/privateComponents/Table/data/RolList/RolList';
import AnunciosList from '../../components/privateComponents/Table/data/AnunciosList/AnunciosList';
import EventoList from '../../components/privateComponents/Table/data/EventoList/EventoList';
import SeccionList from '../../components/privateComponents/Table/data/SeccionList/SeccionList';
import ItemList from '../../components/privateComponents/Table/data/ItemsList/ItemsList';
import PermisosList from '../../components/privateComponents/Table/data/PermisosList/PermisosList';
import Token from '../../components/privateComponents/Table/data/Token/Token';
import Categoria from '../../components/privateComponents/Table/data/Categoria/Categoria';
import Noticias from '../../components/privateComponents/Table/data/Noticias/Noticias';
import Links from '../../components/privateComponents/Table/data/Links/Links';
import Archivos from '../../components/privateComponents/Table/multimedia/Archivos/Archivos';
import Galeria from '../../components/privateComponents/Table/multimedia/Galeria/Galeria';
import Videos from '../../components/privateComponents/Table/multimedia/Videos/Videos';
import Slider from '../../components/privateComponents/Table/multimedia/Slider/Slider';
import Pqrs from '../../components/privateComponents/Table/informacion/Pqrs/Pqrs';
import Historial from '../../components/privateComponents/Table/informacion/Historial/Historial';
import Notificacion from '../../components/privateComponents/Table/informacion/Notificaciones/Notificaciones';

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
                        {/* // ! Data */}
                        <Route path='/usuarios' element={<UserList />}/>
                        <Route path='/rol-list' element={<RolList />}/>
                        <Route path='/anuncios-list' element={<AnunciosList />}/>
                        <Route path='/eventos-list' element={<EventoList />}/>
                        <Route path='/seccion-list' element={<SeccionList />}/>
                        <Route path='/item-list' element={<ItemList />}/>
                        <Route path='/permisos-list' element={<PermisosList />}/>
                        <Route path='/token' element={<Token />}/>
                        <Route path='/categorias' element={<Categoria />}/>
                        <Route path='/noticias' element={<Noticias />}/>
                        <Route path='/link' element={<Links />}/>
                        {/* // ! Multimedia */}
                        <Route path='/archivos' element={<Archivos />}/>
                        <Route path='/galeria' element={<Galeria />}/>
                        <Route path='/videos' element={<Videos />}/>
                        <Route path='/slider' element={<Slider />}/>
                        {/* // ! Informacion */}
                        <Route path='/pqrs' element={<Pqrs />}/>
                        <Route path='/historial' element={<Historial />}/>
                        <Route path='/notificacion' element={<Notificacion />}/>
                    </Routes>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
