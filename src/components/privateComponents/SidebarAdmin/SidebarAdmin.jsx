import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import './SidebarAdmin.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGeneralContext } from '../../../context/GeneralContext';
import { useState } from 'react';
import { perfilRequest } from '../../../api/auth';
import { useCredentialContext } from '../../../context/AuthContext';

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const [seccionesMenu, setSeccionesMenu] = useState([]);
    const { logoutFn } = useCredentialContext()
    const navegar = useNavigate()

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const cerrarSesion = () => {
        logoutFn()
        navegar('/login')
    }

    const { getSeccionesMenu } = useGeneralContext()

    const getPerfil = async () => {
        const response = await perfilRequest()
        const data = await response.data
        return data.data
    }

    const obtenerMenuData = async () => {
        const perfil = await getPerfil()
        const menuData = await getSeccionesMenu(perfil.id, perfil.RolId)
        let datosMenu = menuData.data.map(permiso => permiso.permisoKey)
        setSeccionesMenu(datosMenu)
    }

    const mostrar = (permisoKey) => {
        return !seccionesMenu.includes(permisoKey);
    }

    useEffect(() => {
        obtenerMenuData()
    }, [])

    const hiddenSeccion = { display: 'none' }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} className='Sidebar-body'
        >
            <List>
                {/* // !General */}
                <h4 className='subtitleSide'>Perfil</h4>
                <ul>
                    <li key="mi-perfil">
                        <NavLink to="./" className="link">
                            Mi Perfil
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" className="link">
                            Página principal
                        </NavLink>
                    </li>
                    <li>
                        <span className="link" onClick={cerrarSesion} >
                            Cerrar Sesión
                        </span>
                    </li>
                </ul>
            </List>
            <List>
                <h4 className='subtitleSide'>Datos</h4>
                <ul>
                    <li key="usuarios" style={mostrar('P_USUARIOS') ? hiddenSeccion : {}}>
                        <NavLink to="./usuarios" className="link">
                            Usuarios
                        </NavLink>
                    </li>
                    <li key="noticias" style={mostrar('P_NOTICIAS') ? hiddenSeccion : {}}>
                        <NavLink to="./noticias" className="link">
                            Noticias
                        </NavLink>
                    </li>
                    <li key="menu-interactivo" style={mostrar('P_MENU') ? hiddenSeccion : {}}>
                        <NavLink to="./item-list" className="link">
                            Menu Interactivo
                        </NavLink>
                    </li>
                    <li key="links" style={mostrar('P_LINKS') ? hiddenSeccion : {}}>
                        <NavLink to="./link" className="link">
                            Links
                        </NavLink>
                    </li>
                    <li key="anuncios" style={mostrar('P_ANUNCIOS') ? hiddenSeccion : {}}>
                        <NavLink to="./anuncios-list" className="link">
                            Anuncios
                        </NavLink>
                    </li>
                    <li key="rol" style={mostrar('P_ADMIN') ? hiddenSeccion : {}}>
                        <NavLink to="./rol-list" className="link">
                            Roles
                        </NavLink>
                    </li>
                    <li key="token" style={mostrar('P_ADMIN') ? hiddenSeccion : {}}>
                        <NavLink to="./token" className="link">
                            Token
                        </NavLink>
                    </li>
                    <li key="seccion-list">
                        <NavLink to="./seccion-list" className="link">
                            Secciones
                        </NavLink>
                    </li>
                    <li key="categorias">
                        <NavLink to="./categorias" className="link">
                            Categorias
                        </NavLink>
                    </li>
                </ul>
                <Divider />
                {/* // !Multimedia */}
                <h4 className='subtitleSide'>Multimedia</h4>
                <ul>
                    <li key="eventos" style={mostrar('P_GALERIA') ? hiddenSeccion : {}}>
                        <NavLink to="./eventos-list" className="link">
                            Eventos
                        </NavLink>
                    </li>
                    <li key="galeria" style={mostrar('P_GALERIA') ? hiddenSeccion : {}}>
                        <NavLink to="./galeria" className="link">
                            Galeria
                        </NavLink>
                    </li>
                    <li key="videos" style={mostrar('P_VIDEOS') ? hiddenSeccion : {}}>
                        <NavLink to="./videos" className="link">
                            Videos
                        </NavLink>
                    </li>
                    <li key="slider" style={mostrar('P_SLIDER') ? hiddenSeccion : {}}>
                        <NavLink to="./slider" className="link">
                            Slider
                        </NavLink>
                    </li>
                    <li key="archivos" style={mostrar('P_MAGAZINE') ? hiddenSeccion : {}}>
                        <NavLink to="./archivos" className="link">
                            Archivos
                        </NavLink>
                    </li>
                </ul>
                <Divider />
                {/* // !Informacion */}
                <h4 className='subtitleSide' style={mostrar('P_PQRS') || mostrar('P_NOTIFICACIONES') || mostrar('P_HISTORIAL') ? hiddenSeccion : {}}>Herramientas</h4>
                <ul style={mostrar('P_PQRS') || mostrar('P_NOTIFICACIONES') || mostrar('P_HISTORIAL') ? hiddenSeccion : {}}>
                    <li key="pqrs" style={mostrar('P_PQRS') ? hiddenSeccion : {}}>
                        <NavLink to="./pqrs" className="link">
                            Pqrs
                        </NavLink>
                    </li>
                    <li key="notificaciones" style={mostrar('P_NOTIFICACIONES') ? hiddenSeccion : {}}>
                        <NavLink to="./notificacion" className="link">
                            Notificaciones
                        </NavLink>
                    </li>
                    <li key="historial" style={mostrar('P_HISTORIAL') ? hiddenSeccion : {}}>
                        <NavLink to="./historial" className="link">
                            Historial
                        </NavLink>
                    </li>
                    <li key="nodemailer" style={mostrar('P_ADMIN') ? hiddenSeccion : {}}>
                        <NavLink to="./nodemailer" className="link">
                            Nodemailer
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