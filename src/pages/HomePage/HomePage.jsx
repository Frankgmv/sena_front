import Calendario from "../../components/publicComponents/Calendario/Calendario"
import Eventos from "../../components/publicComponents/Eventos/Eventos"
import Footer from "../../components/publicComponents/Footer/Footer"
import MenuInteractivo from "../../components/publicComponents/MenuInteractivo/MenuInteractivo"
import NavBar from "../../components/publicComponents/Navbar/NavBar"
import Noticias from "../../components/publicComponents/Noticias/Noticias"
import Slider from "../../components/publicComponents/Slider/Slider"
import Videos from "../../components/publicComponents/Videos/Videos"

import './HomePage.css'

const HomePage = () => {
    return (
        <div className="homeBody">
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
    )
}

export default HomePage
