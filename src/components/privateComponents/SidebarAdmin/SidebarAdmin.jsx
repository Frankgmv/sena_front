import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import './SidebarAdmin.css'
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} className='Sidebar-body'
        >
            <List>
                <h4 className='subtitleSide'>Data</h4>
                <ul>
                    <li key="mi-perfil">
                        <NavLink to="/mi-perfil" className="link">
                            Mi Perfil
                        </NavLink>
                    </li>
                    <li key="rol">
                        <NavLink to="./rol-list" className="link">
                            Roles
                        </NavLink>
                    </li>
                    <li key="seccion-list">
                        <NavLink to="./seccion-list" className="link">
                            Seccion
                        </NavLink>
                    </li>
                    <li key="anuncios">
                        <NavLink to="./anuncios-list" className="link">
                            Anuncios
                        </NavLink>
                    </li>
                    <li key="categorias">
                        <NavLink to="./categorias" className="link">
                            Categorias
                        </NavLink>
                    </li>
                    <li key="menu-interactivo">
                        <NavLink to="./item-list" className="link">
                            Menu Interactivo
                        </NavLink>
                    </li>
                    <li key="eventos">
                        <NavLink to="./eventos-list" className="link">
                            Eventos
                        </NavLink>
                    </li>
                    <li key="usuarios">
                        <NavLink to="./usuarios" className="link">
                            Usuarios
                        </NavLink>
                    </li>
                    <li key="noticias">
                        <NavLink to="./noticias" className="link">
                            Noticias
                        </NavLink>
                    </li>
                    <li key="links">
                        <NavLink to="./link" className="link">
                            Links
                        </NavLink>
                    </li>
                    <li key="token">
                        <NavLink to="./token" className="link">
                            Token
                        </NavLink>
                    </li>
                </ul>
                <Divider />
                {/* // !Multimedia */}
                <h4 className='subtitleSide'>Multimedia</h4>
                <ul>
                    <li key="archivos">
                        <NavLink to="./archivos" className="link">
                            Archivos
                        </NavLink>
                    </li>
                    <li key="galeria">
                        <NavLink to="./galeria" className="link">
                            Galeria
                        </NavLink>
                    </li>
                    <li key="videos">
                        <NavLink to="./videos" className="link">
                            Videos
                        </NavLink>
                    </li>
                    <li key="slider">
                        <NavLink to="./slider" className="link">
                            Slider
                        </NavLink>
                    </li>
                </ul>
                <Divider />
                {/* // !Informacion */}
                <h4 className='subtitleSide'>Información</h4>
                <ul>
                    <li key="pqrs">
                        <NavLink to="./pqrs" className="link">
                            Pqrs
                        </NavLink>
                    </li>
                    <li key="notificaciones">
                        <NavLink to="./notificacion" className="link">
                            Notificaciones
                        </NavLink>
                    </li>
                    <li key="historial">
                        <NavLink to="./historial" className="link">
                            Historial
                        </NavLink>
                    </li>
                </ul>
            </List>
            <Divider />
            <List>
                <h4 className='subtitleSide'>Perfil</h4>
                <ul>
                    <li>
                        <NavLink to="/logout" className="link">
                            Home Page
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/logout" className="link">
                            Cerrar Sesion
                        </NavLink>
                    </li>
                </ul>
            </List>
        </Box>
    );

    return (
        <div>
            <MenuIcon onClick={toggleDrawer(true)} className='icon_menu' />
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}