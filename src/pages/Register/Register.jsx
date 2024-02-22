import Boton4 from '../../components/publicComponents/botones/boton4/Boton4'
import './Register.css'
import fondo from '../../assets/img/f1.jpg'
import { useCredentialContext } from '../../context/CredentialContext'
import { useState } from 'react'
import toastr from '../../assets/includes/Toastr';
import { Link } from 'react-router-dom'
const Register = () => {
    const [dataLogin, setdataLogin] = useState({ 'id': 0, 'password': '', 'RolId': 0 });
    const { login, errorsCredential, responseMessage } = useCredentialContext();

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(dataLogin)
        login(dataLogin)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'id' || name === 'RolId') {
            setdataLogin({
                ...dataLogin,
                [name]: parseInt(value)
            });
        } else {
            setdataLogin({
                ...dataLogin,
                [name]: value
            });
        }
    };

    if (errorsCredential.length > 0) {
        errorsCredential.map(error => toastr.error(error))
    }
    if (responseMessage.length > 0) {
        responseMessage.map(error => toastr.success(error))
    }

    return (
        <div className='registerBody'>
            <div className="img">
                <img src={fondo} alt="logo.png" />
            </div>
            <div className="fondo"></div>
            <div className="textoRegister">
                <h2>Ya tienes una cuenta?</h2>
                <div className="boton">
                    <Boton4 link='/login' name='Iniciar Sesion' />
                </div>
            </div>
            <div className="containerInput">
                <div className="encabezadoRegister">
                    <h3>Bienvenido</h3>
                    <p>A la plataforma educativa</p>
                    <h2>I. E. Centenario Pereira</h2>
                </div>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <div className="junto">
                            <div className="input-container">
                                <input id="id" name='id' type="text" onChange={handleChange} maxLength={10} />
                                <label className="label" htmlFor="id">Identificacion</label>
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
                        <div className="footerInputsRegister">
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
        </div >
    )
}

export default Register
