import './HomePage.css'
import { lazy, Suspense } from "react"
import LoadingScreen from "../../components/Loading/LoadingScreen"

const AlertaAnuncios = lazy(() => import("../../components/publicComponents/Alerta/Alerta.jsx"))
const Calendario = lazy(() => import("../../components/publicComponents/Calendario/Calendario.jsx"))
const Eventos = lazy(() => import("../../components/publicComponents/Eventos/Eventos.jsx"))
const Footer = lazy(() => import("../../components/publicComponents/Footer/Footer.jsx"))
const MenuInteractivo = lazy(() => import("../../components/publicComponents/MenuInteractivo/MenuInteractivo.jsx"))
const NavBar = lazy(() => import("../../components/publicComponents/Navbar/NavBar.jsx"))
const Noticias = lazy(() => import("../../components/publicComponents/Noticias/Noticias.jsx"))
const Slider = lazy(() => import("../../components/publicComponents/Slider/Slider.jsx"))
const Videos = lazy(() => import("../../components/publicComponents/Videos/Videos.jsx"))

const HomePage = () => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <div className="homeBody">
                <AlertaAnuncios />
                <NavBar />
                <Slider />
                <Noticias id='noticias' />
                <MenuInteractivo />
                <Videos />
                <div className="calendario-eventos">
                    <div className="calendario">
                        <Calendario />
                    </div>
                    <div className="eventos">
                        <Eventos />
                    </div>
                </div>
                <Footer />
            </div>
        </Suspense>
    )
}

export default HomePage
