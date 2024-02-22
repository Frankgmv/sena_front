import './Login.css'
import fondo from '../../assets/img/f1.jpg'
import Boton4 from '../../components/publicComponents/botones/boton4/Boton4'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='loginBody'>
            <div className="img">
                <img src={fondo} alt="logo.png" />
            </div>
            <div className="fondo"></div>
            <div className="textoRegister">
                <h2>¿Aún no tienes cuenta?</h2>
                <div className="boton">
                    <Boton4
                        link='/register'
                        name='Registrate'
                    />
                </div>
            </div>
            <div className="containerInput">
                <div className="encabezadoRegister">
                    <h3>Bienvenido</h3>
                    <p>A la plataforma educativa</p>
                    <h2>I. E. Centenario Pereira</h2>
                </div>
                <div className="form">
                    <form action="" method="post">
                        <div className="junto">
                            <div className="input-container">
                                <input required id="input" type="text" />
                                <label className="label" htmlFor="input">Identificacion</label>
                                <div className="underline"></div>
                            </div>
                            <div className="input-container">
                                <input required id="input" type="password" />
                                <label className="label" htmlFor="input">Contraseña</label>
                                <div className="underline"></div>
                            </div>
                        </div>
                        <div className="select-container">
                            <select name="" id="">
                                <option value="">Estudiante Especial</option>
                                <option value="">Docente</option>
                                <option value="">Personal Administrativo</option>
                                <option value="">Coordinador</option>
                                <option value="">Rector</option>
                            </select>
                        </div>
                        <div className="footerInputsLogin">
                            <div className="botonRegister">
                                <Boton4
                                    type='submit'
                                    name='Iniciar Sesion'
                                />
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
