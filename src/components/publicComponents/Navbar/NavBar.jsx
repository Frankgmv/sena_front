import { Link } from 'react-router-dom'
import logo from '../../../assets/img/logo.png'
import './NavBar.css'
import BurgerButton from '../botones/burgerButton/BurgerButton'

const NavBar = () => {
    return (
        <div className='navbarBody'>
            <div className="logo">
                <img src={logo} alt="" />
                <div className="barra" />
                <div className="text">
                    <p>Institución Educativa</p>
                    <h3>Centenario Pereira</h3>
                </div>
            </div>
            <div className="links">
                <Link className='link' to='/'>Inicio</Link>
                <Link className='link' to='/'>Institución</Link>
                <Link className='link' to='/'>Plataformas Académicas</Link>
                <Link className='link' to='/'>Noticias</Link>
            </div>
            <div className="burgerButton">
                <BurgerButton />
            </div>
        </div>
    )
}

export default NavBar