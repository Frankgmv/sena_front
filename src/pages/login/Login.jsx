import './Login.css'
import fondo from '../../assets/img/f1.jpg'
import Boton4 from '../../components/publicComponents/botones/boton4/Boton4'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import toastr from '../../assets/includes/Toastr'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../../context/migration/AuthContext'
import { useBasicallyContext } from '../../context/migration/BasicallyContext'

const Login = () => {
    const [dataLogin, setDataLogin] = useState({});
    const { roles } = useBasicallyContext()
    const { errors, setErrors, login, message, setMessages, isAuthenticate, verifyAuth } = useAuthContext();
    const navigate = useNavigate()


    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    useEffect(() => {
        if (errors.length != 0) {
            errors.map(error => {
                return toastr.error(error)
            })
        }
    }, [errors]);

    useEffect(() => {
        verifyAuth()
    }, []);

    useEffect(() => {
        if (message.length != 0) {
            message.map(msg => {
                toastr.success(msg)
            })
        }

        setTimeout(() =>{
            if (isAuthenticate == true) {
                navigate('/admin')
            }
        }, 2000)

    }, [message, isAuthenticate, navigate]);


    const handleSubmit = (e) => {
        e.preventDefault()
        login(dataLogin);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'id' || name === 'RolId') {
            setDataLogin({
                ...dataLogin,
                [name]: parseInt(value)
            });
        } else {
            setDataLogin({
                ...dataLogin,
                [name]: value
            });
        }
    };
    return (
        <div className='loginBody'>
            <div className="img">
                <img src={fondo} alt="logo.png" />
            </div>
            <div className="fondo"></div>
            <div className="redirecciones">
                <Link className='link-redirecciones' to="/">Inicio</Link>
                <Link className='link-redirecciones' to="/login">Iniciar Sesión</Link>
                <Link className='link-redirecciones' to="/register">Registarse</Link>
            </div>
            <div className="textoRegister">
                <h2>¿Aún no tienes cuenta?</h2>
                <div className="boton" onClick={() => navigate("/register")}>
                    <Boton4
                        link='/register'
                        name='Registrate'
                        id='irARegitro'
                    />
                </div>
            </div>
            <div className="containerInputLogin">
                <div className="encabezadoLogin">
                    <h3>Bienvenido</h3>
                    <p>A la plataforma educativa</p>
                    <h2>I. E. Centenario Pereira</h2>
                </div>
                <div className="redireccionesMobile">
                    <Link className='link-redireccionesMobile' to="/">Inicio</Link>
                    <Link className='link-redireccionesMobile' to="/login">Iniciar Sesion</Link>
                    <Link className='link-redireccionesMobile' to="/register">Registarse</Link>
                </div>
                <div className="form">
                    <form method='POST' onSubmit={handleSubmit}>
                        <div className="junto">
                            <div className="input-container">
                                <input id="id" name='id' onChange={handleChange} maxLength={12} type="text" />
                                <label className="label" htmlFor="id">Identificacion</label>
                                <div className="underline"></div>
                            </div>
                            <div className="input-container">
                                <input
                                    id="password"
                                    name="password"
                                    onChange={handleChange}
                                    type={showPassword ? "text" : "password"}
                                />
                                <label className="label" htmlFor="password">Contraseña</label>
                                <div className="underline"></div>
                                <button type='button' style={{ color: 'black' }} className="eye-button" onClick={handleShowPassword}>
                                    {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                </button>
                            </div>
                        </div>
                        <div className="select-container">
                            <label htmlFor="">Selecciona tu Rol</label>
                            <select name="RolId" id="RolId" onChange={handleChange}>
                                <option value="10"></option>
                                {
                                    roles.map((rol) => {
                                        return <option value={rol.id} key={rol.id} >{rol.rol}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="footerInputsLogin">
                            <div className="botonRegister">
                                <Boton4
                                    type='submit'
                                    name='Iniciar Sesion'
                                    id="botonEnviar"
                                />
                            </div>
                            <div className="linkPassword">
                                <Link className='linkInput' to='/recuperar-contraseña'>Recuperar Contraseña</Link>
                            </div>
                            <div className="linkRegister">
                                <Link className='linkInput' to='/register'>Crea una cuenta</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
