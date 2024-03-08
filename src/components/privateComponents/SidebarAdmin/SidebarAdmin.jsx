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
                <h4 className='subtitleSide'>Opciones</h4>
                <ul>
                    <li key="mi-perfil">
                        <NavLink to="/mi-perfil" className="link">
                            Mi Perfil
                        </NavLink>
                    </li>
                    <li key="slider-fotos">
                        <NavLink to="/slider-fotos" className="link">
                            Slider Fotos
                        </NavLink>
                    </li>
                    <li key="anuncios">
                        <NavLink to="/anuncios" className="link">
                            Anuncios
                        </NavLink>
                    </li>
                    <li key="menu-interactivo">
                        <NavLink to="/menu" className="link">
                            Menu Interactivo
                        </NavLink>
                    </li>
                    <li key="galeria-eventos">
                        <NavLink to="/galeria-eventos" className="link">
                            Galeria y Eventos
                        </NavLink>
                    </li>
                    <li key="videos">
                        <NavLink to="/videos" className="link">
                            Videos
                        </NavLink>
                    </li>
                    <li key="magazine">
                        <NavLink to="/magazine" className="link">
                            Magazine
                        </NavLink>
                    </li>
                    <li key="blogs">
                        <NavLink to="/blogs" className="link">
                            Blogs
                        </NavLink>
                    </li>
                    <li key="gobierno-escolar">
                        <NavLink to="/gobierno-escolar" className="link">
                            Gobierno Escolar
                        </NavLink>
                    </li>
                    <li key="estudiantes">
                        <NavLink to="/estudiantes" className="link">
                            Estudiantes
                        </NavLink>
                    </li>
                    <li key="plataformas-academicas">
                        <NavLink to="/plataformas-academicas" className="link">
                            Plataformas Academicas
                        </NavLink>
                    </li>
                    <li key="noticias">
                        <NavLink to="/noticias" className="link">
                            Noticias
                        </NavLink>
                    </li>
                    <li key="link-archivos">
                        <NavLink to="/link-archivos" className="link">
                            Link Archivos
                        </NavLink>
                    </li>
                    <li key="historial">
                        <NavLink to="/historial" className="link">
                            Historial
                        </NavLink>
                    </li>
                    <li key="pqrs">
                        <NavLink to="/pqrs" className="link">
                            PQRS
                        </NavLink>
                    </li>
                    <li key="actualizar-clave">
                        <NavLink to="/actualizar-clave" className="link">
                            Actualizar Clave Especial
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