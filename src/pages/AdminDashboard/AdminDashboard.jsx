import { Routes, Route, Outlet, Navigate, Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/privateComponents/SidebarAdmin/SidebarAdmin";
import "./AdminDashboard.css";
import { IoIosArrowDown } from "react-icons/io";
import Menu from "@mui/material/Menu";
import { useEffect, useState } from "react";
import UserList from "../../components/privateComponents/Table/data/UsersList/UsersList";
import RolList from "../../components/privateComponents/Table/data/RolList/RolList";
import AnunciosList from "../../components/privateComponents/Table/data/AnunciosList/AnunciosList";
import EventoList from "../../components/privateComponents/Table/data/EventoList/EventoList";
import SeccionList from "../../components/privateComponents/Table/data/SeccionList/SeccionList";
import ItemList from "../../components/privateComponents/Table/data/ItemsList/ItemsList";
import Token from "../../components/privateComponents/Table/data/Token/Token";
import Categoria from "../../components/privateComponents/Table/data/Categoria/Categoria";
import Noticias from "../../components/privateComponents/Table/data/Noticias/Noticias";
import Links from "../../components/privateComponents/Table/data/Links/Links";
import Archivos from "../../components/privateComponents/Table/multimedia/Archivos/Archivos";
import Galeria from "../../components/privateComponents/Table/multimedia/Galeria/Galeria";
import Videos from "../../components/privateComponents/Table/multimedia/Videos/Videos";
import Slider from "../../components/privateComponents/Table/multimedia/Slider/Slider";
import Pqrs from "../../components/privateComponents/Table/informacion/Pqrs/Pqrs";
import Historial from "../../components/privateComponents/Table/informacion/Historial/Historial";
import Notificacion from "../../components/privateComponents/Table/informacion/Notificaciones/Notificaciones";
import { useGeneralContext } from "../../context/GeneralContext";
import { useCredentialContext } from "../../context/AuthContext";
import { getLocalStorage } from "../../assets/includes/localStorage";
import toastr from "../../assets/includes/Toastr";
import Perfil from "../../components/privateComponents/Table/data/Perfil/Perfil";

const AdminDashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { perfil } = useGeneralContext();
  const open = Boolean(anchorEl);
  const { logoutFn, rolName, isAuthenticate, errors, responseMessage } = useCredentialContext()
  const navegar = useNavigate()

  useEffect(() => {
    if (responseMessage.length != 0) {
      responseMessage.map(msg => {
        toastr.success(msg)
      })
    }
  }, [responseMessage])

  useEffect(() => {
    if (errors.length != 0) {
      errors.map(msg => {
        toastr.error(msg)
      })
    }
  }, [errors])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!isAuthenticate && !getLocalStorage('token')) {
      navegar('/login')
    }
  }, [])


  const cerrarSesion = () => {
    logoutFn()
    navegar('/login')
  }

  return (
    <div className="adminBody">
      <div className="Navbar-Body">
        <nav>
          <div className="encabezado">
            <Sidebar />
            <h3>Centenario Pereira</h3>
          </div>
          <div className="info">
            <div className="text">
              <h4 className="user">
                {perfil.nombre ? `${perfil.nombre} ${perfil.apellido}` : ""}
              </h4>
              <p className="rol">{rolName.rol}</p>
            </div>
            <div></div>
            <div className="icon">
              <IoIosArrowDown
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              />
              <Menu
                className="bodyMenuNavbar"
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <div className="links">
                  <Link
                    className="link-sidebar"
                    onClick={handleClose}
                    to="./mi-perfil"
                  >
                    Perfil
                  </Link>
                  <Link
                    className="link-sidebar"
                    onClick={handleClose}
                    to="/"
                  >
                    Home Page
                  </Link>
                  <Link className="link-sidebar" onClick={(e) => {
                    handleClose();
                    cerrarSesion();
                  }} to="/login">
                    Cerrar Sesion
                  </Link>
                </div>
              </Menu>
            </div>
          </div>
        </nav>
      </div>
      <div className="contenido">
        <div className="adminContent">
          <Routes>
            {/* // ! Data */}
            <Route path="/" element={<Perfil />} />
            <Route path="/usuarios" element={<UserList />} />
            <Route path="/rol-list" element={<RolList />} />
            <Route path="/seccion-list" element={<SeccionList />} />
            <Route path="/categorias" element={<Categoria />} />
            <Route path="/eventos-list" element={<EventoList />} />
            <Route path="/anuncios-list" element={<AnunciosList />} />
            <Route path="/item-list" element={<ItemList />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/link" element={<Links />} />
            <Route path="/token" element={<Token />} />
            {/* // ! Multimedia */}
            <Route path="/archivos" element={<Archivos />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/slider" element={<Slider />} />
            {/* // ! Informacion */}
            <Route path="/pqrs" element={<Pqrs />} />
            <Route path="/notificacion" element={<Notificacion />} />
            <Route path="/historial" element={<Historial />} />
            {/* // ! Adicionales */}
            <Route
              path="/nodemailer"
              element={<h1>nodemailer cambiar claves para emails</h1>}
            />
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
