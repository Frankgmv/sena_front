import "./AdminDashboard.css";
import { Grid } from "@mui/material";
import Menu from "@mui/material/Menu";
import { IoIosArrowDown } from "react-icons/io";
import toastr from "../../assets/includes/Toastr";
import { lazy, Suspense, useEffect, useState } from "react";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import { getLocalStorage, setLocalStorage } from "../../assets/includes/localStorage";
import { Routes, Route, Outlet, Link, useNavigate, NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/migration/AuthContext.jsx";

const Links = lazy(() => import("../../components/privateComponents/Table/data/Links/Links.jsx"))
const Token = lazy(() => import("../../components/privateComponents/Table/data/Token/Token.jsx"))
const Perfil = lazy(() => import("../../components/privateComponents/Table/data/Perfil/Perfil.jsx"))
const Pqrs = lazy(() => import("../../components/privateComponents/Table/informacion/Pqrs/Pqrs.jsx"))
const Sidebar = lazy(() => import("../../components/privateComponents/SidebarAdmin/SidebarAdmin.jsx"))
const RolList = lazy(() => import("../../components/privateComponents/Table/data/RolList/RolList.jsx"))
const Noticias = lazy(() => import("../../components/privateComponents/Table/data/Noticias/Noticias.jsx"))
const Videos = lazy(() => import("../../components/privateComponents/Table/multimedia/Videos/Videos.jsx"))
const Slider = lazy(() => import("../../components/privateComponents/Table/multimedia/Slider/Slider.jsx"))
const UserList = lazy(() => import("../../components/privateComponents/Table/data/UsersList/UsersList.jsx"))
const ItemList = lazy(() => import("../../components/privateComponents/Table/data/ItemsList/ItemsList.jsx"))
const Categoria = lazy(() => import("../../components/privateComponents/Table/data/Categoria/Categoria.jsx"))
const Galeria = lazy(() => import("../../components/privateComponents/Table/multimedia/Galeria/Galeria.jsx"))
const EventoList = lazy(() => import("../../components/privateComponents/Table/data/EventoList/EventoList.jsx"))
const Archivos = lazy(() => import("../../components/privateComponents/Table/multimedia/Archivos/Archivos.jsx"))
const SeccionList = lazy(() => import("../../components/privateComponents/Table/data/SeccionList/SeccionList.jsx"))
const Historial = lazy(() => import("../../components/privateComponents/Table/informacion/Historial/Historial.jsx"))
const AnunciosList = lazy(() => import("../../components/privateComponents/Table/data/AnunciosList/AnunciosList.jsx"))
const Notificacion = lazy(() => import("../../components/privateComponents/Table/informacion/Notificaciones/Notificaciones.jsx"))
const CredencialesEmail = lazy(() => import("../../components/privateComponents/Table/data/Credenciales/CredencialesEmail.jsx"))


const AdminDashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { Logout, perfil, getPerfil, isAuthenticate, errors, message, verificarToken,
    setMessages, setErrors } = useAuthContext()
  const navegar = useNavigate()

  useEffect(() => {
    if (message.length != 0) {
      message.map(msg => {
        toastr.success(msg)
      })
    }
  }, [message])

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

  const callVerify = async () =>{
    if (!getLocalStorage('token')) {
      Logout()
      navegar('/login')
    } else if (!isAuthenticate) {
      await verificarToken()
    }
    
  }

  useEffect(() => {
    getPerfil()
    callVerify()
  }, [])

  const cerrarSesion = () => {
    setLocalStorage('token', 'vacio')
    Logout()
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
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
                <p className="rol">{perfil.rol}</p>
              </div>
              <div className="icon">
                <IoIosArrowDown
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                />
                <Grid container spacing={2} sx={{ width: '100%' }}>
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
                    <Grid item xs={12}>
                      <NavLink
                        className="link-sidebar"
                        onClick={handleClose}
                        to="./"
                      >
                        Perfil
                      </NavLink>
                    </Grid>
                    <Grid item xs={12}>
                      <NavLink
                        className="link-sidebar"
                        onClick={handleClose}
                        to="/"
                      >
                        Página principal
                      </NavLink>
                    </Grid>
                    <Grid item xs={12}>
                      <Link className="link-sidebar" onClick={(e) => {
                        handleClose();
                        cerrarSesion();
                      }} to="/login">
                        Cerrar Sesión
                      </Link>
                    </Grid>
                  </Menu>
                </Grid>
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
              <Route path="*" element={<Perfil />} />
              {/* // ! Adicionales */}
              <Route
                path="/nodemailer" element={<CredencialesEmail />}
              />
            </Routes>
            <Outlet />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default AdminDashboard;
