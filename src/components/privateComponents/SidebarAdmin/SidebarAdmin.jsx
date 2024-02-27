import { NavLink } from 'react-router-dom'
import './SidebarAdmin.css'
import { FaUser, FaBloggerB } from "react-icons/fa";
import { MdOutlinePhotoSizeSelectLarge, MdOutlinePhotoLibrary } from "react-icons/md";
import { AiOutlineNotification } from "react-icons/ai";
import { CgMenuGridR } from "react-icons/cg";
import { PiVideoLight, PiFilePdfLight, PiStudentLight, PiNewspaperLight, PiFiles, PiKeyLight } from "react-icons/pi";
import { BsPeople, BsClockHistory } from "react-icons/bs";
import { TbDeviceImacSearch } from "react-icons/tb";
import { LuMailSearch } from "react-icons/lu";

const SidebarAdmin = ({ show }) => {
    return (
        <div className={show ? 'Sidebar-body active' : 'Sidebar-body'}>
            <ul>
                <li key="mi-perfil">
                    <NavLink to="/mi-perfil" className="link">
                        <FaUser className="icon" />
                        Mi Perfil
                    </NavLink>
                </li>
                <li key="slider-fotos">
                    <NavLink to="/slider-fotos" className="link">
                        <MdOutlinePhotoSizeSelectLarge className="icon" />
                        Slider Fotos
                    </NavLink>
                </li>
                <li key="anuncios">
                    <NavLink to="/anuncios" className="link">
                        <AiOutlineNotification className="icon" />
                        Anuncios
                    </NavLink>
                </li>
                <li key="menu-interactivo">
                    <NavLink to="/menu" className="link">
                        <CgMenuGridR className="icon" />
                        Menu Interactivo
                    </NavLink>
                </li>
                <li key="galeria-eventos">
                    <NavLink to="/galeria-eventos" className="link">
                        <MdOutlinePhotoLibrary className="icon" />
                        Galeria y Eventos
                    </NavLink>
                </li>
                <li key="videos">
                    <NavLink to="/videos" className="link">
                        <PiVideoLight className="icon" />
                        Videos
                    </NavLink>
                </li>
                <li key="magazine">
                    <NavLink to="/magazine" className="link">
                        <PiFilePdfLight className="icon" />
                        Magazine
                    </NavLink>
                </li>
                <li key="blogs">
                    <NavLink to="/blogs" className="link">
                        <FaBloggerB className="icon" />
                        Blogs
                    </NavLink>
                </li>
                <li key="gobierno-escolar">
                    <NavLink to="/gobierno-escolar" className="link">
                        <BsPeople className="icon" />
                        Gobierno Escolar
                    </NavLink>
                </li>
                <li key="estudiantes">
                    <NavLink to="/estudiantes" className="link">
                        <PiStudentLight className="icon" />
                        Estudiantes
                    </NavLink>
                </li>
                <li key="plataformas-academicas">
                    <NavLink to="/plataformas-academicas" className="link">
                        <TbDeviceImacSearch className="icon" />
                        Plataformas Academicas
                    </NavLink>
                </li>
                <li key="noticias">
                    <NavLink to="/noticias" className="link">
                        <PiNewspaperLight className="icon" />
                        Noticias
                    </NavLink>
                </li>
                <li key="link-archivos">
                    <NavLink to="/link-archivos" className="link">
                        <PiFiles className="icon" />
                        Link Archivos
                    </NavLink>
                </li>
                <li key="historial">
                    <NavLink to="/historial" className="link">
                        <BsClockHistory className="icon" />
                        Historial
                    </NavLink>
                </li>
                <li key="pqrs">
                    <NavLink to="/pqrs" className="link">
                        <LuMailSearch className="icon" />
                        PQRS
                    </NavLink>
                </li>
                <li key="actualizar-clave">
                    <NavLink to="/actualizar-clave" className="link">
                        <PiKeyLight className="icon" />
                        Actualizar Clave Especial
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default SidebarAdmin
