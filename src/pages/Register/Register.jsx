import './Register.css'
import fondo from '../../assets/img/f1.jpg'
import Boton3 from '../../components/publicComponents/botones/boton3/Boton3'
import Boton4 from '../../components/publicComponents/botones/boton4/Boton4'

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
                    <Boton3
                        nombre='Iniciar Sesión'
                        type='submit'
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
                        <div className="botonRegister">
                            <Boton4 
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
