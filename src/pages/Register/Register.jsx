import Boton4 from '../../components/publicComponents/botones/boton4/Boton4'
import './Register.css'
import fondo from '../../assets/img/f1.jpg'

const Register = () => {
    return (
        <div className='registerBody'>
            <div className="img">
                <img src={fondo} alt="logo.png" />
            </div>
            <div className="fondo"></div>
            <div className="textoRegister">
                <h2>Ya tienes una cuenta?</h2>
                <div className="boton">
                    <Boton4
                        link='/login'
                        name='Iniciar Sesion'
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
                                <label className="label" htmlFor="input">Clave Especial</label>
                                <div className="underline"></div>
                            </div>
                        </div>
                        <div className="junto">
                            <div className="input-container">
                                <input required id="input" type="text" />
                                <label className="label" htmlFor="input">Nombre</label>
                                <div className="underline"></div>
                            </div>
                            <div className="input-container">
                                <input required id="input" type="text" />
                                <label className="label" htmlFor="input">Apellido</label>
                                <div className="underline"></div>
                            </div>
                        </div>
                        <div className="junto">
                            <div className="input-container">
                                <input required id="input" type="email" />
                                <label className="label" htmlFor="input">Correo</label>
                                <div className="underline"></div>
                            </div>
                            <div className="input-container">
                                <input required id="input" type="number" />
                                <label className="label" htmlFor="input">Numero de celular</label>
                                <div className="underline"></div>
                            </div>
                        </div>
                        <div className="junto">
                            <div className="select-container">
                                <select name="" id="">
                                    <option value="">Estudiante Especial</option>
                                    <option value="">Docente</option>
                                    <option value="">Personal Administrativo</option>
                                    <option value="">Coordinador</option>
                                    <option value="">Rector</option>
                                </select>
                            </div>
                            <div className="input-container">
                                <input required id="input" type="date" />
                                <label className="label" htmlFor="input">Fecha de nacimiento</label>
                                <div className="underline"></div>
                            </div>
                        </div>
                        <div className="junto">
                            <div className="input-container">
                                <input required id="input" type="password" />
                                <label className="label" htmlFor="input">Contraseña</label>
                                <div className="underline"></div>
                            </div>
                            <div className="input-container">
                                <input required id="input" type="password" />
                                <label className="label" htmlFor="input">Repetir Contraseña</label>
                                <div className="underline"></div>
                            </div>
                        </div>
                        <div className="botonRegister">
                            <Boton4
                                type='submit'
                                name='Registrarse'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
