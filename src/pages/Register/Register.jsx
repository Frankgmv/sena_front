import Boton4 from '../../components/publicComponents/botones/boton4/Boton4'
import './Register.css'
import fondo from '../../assets/img/f1.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCredentialContext } from '../../context/AuthContext'
import toastr from '../../assets/includes/Toastr'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const Register = () => {
    const { roles, getRoles, setErrors, errors, responseMessage, register } = useCredentialContext();
    const [dataRegister, setDataRegister] = useState({});
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (errors.length != 0) {
            const deleteDuplicidad = new Set(errors);
            const errors2 = [...deleteDuplicidad]
            errors2.map(error => {
                toastr.error(error)
            })
        }
    }, [errors]);

    useEffect(()=>{
        getRoles()
    }, [])

    useEffect(() => {
        if (responseMessage.length != 0) {
            const deleteDuplicidad = new Set(responseMessage);
            const responseMessage2 = [...deleteDuplicidad]
            responseMessage2.map(msg => {
                toastr.success(msg)
            })
            document.querySelector('form').reset();
            setTimeout(() => {
                navigate("/login")
            }, 4000);
        }
    }, [responseMessage, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault()

        if (dataRegister?.password !== dataRegister?.repetirPassword) {
            console.log(dataRegister)
            setErrors((prevent) => {
                return [
                    ...prevent,
                    'Las contraseñas no coinciden'
                ]
            })
        } else {
            register(dataRegister)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'id' || name === 'RolId') {
            setDataRegister({
                ...dataRegister,
                [name]: parseInt(value)
            });
        } else {
            setDataRegister({
                ...dataRegister,
                [name]: value
            });
        }
    };

    return (
        <div className='registerBody'>
            <div className="img">
                <img src={fondo} alt="logo.png" />
            </div>
            <div className="fondo"></div>
            <div className="redirecciones">
                <Link className='link-redirecciones' to="/">Inicio</Link>
                <Link className='link-redirecciones' to="/login">Iniciar Sesion</Link>
                <Link className='link-redirecciones' to="/register">Registarse</Link>
            </div>
            <div className="textoRegister">
                <h2>Ya tienes una cuenta?</h2>
                <div className="boton" onClick={() => navigate("/login")}>
                    <Boton4 link='/login' name='Iniciar Sesion' id="irALogin" />
                </div>
            </div>
            <div className="containerInputRegister">
                <div className="encabezadoRegister">
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
                                <input id="id" name='id' type="text" maxLength={10} onChange={handleChange} />
                                <label className="label" htmlFor="id">Identificacion</label>
                                <div className="underline"></div>
                            </div>
                            <div className="input-container">
                                <input id="claveEspecial" name='claveEspecial' type={showPassword ? "text" : "password"} onChange={handleChange} />
                                <label className="label" htmlFor="claveEspecila">Clave Especial</label>
                                <button type='button' style={{color: 'black'}} className="eye-button" onClick={handleShowPassword}>
                                    {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                </button>
                                <div className="underline"></div>
                            </div>
                        </div>
                        <div className="junto">
                            <div className="input-container">
                                <input id="nombre" name='nombre' type="text" onChange={handleChange} />
                                <label className="label" htmlFor="nombre">Nombre</label>
                                <div className="underline"></div>
                            </div>
                            <div className="input-container">
                                <input id="apellido" name='apellido' type="text" onChange={handleChange} />
                                <label className="label" htmlFor="apellido">Apellido</label>
                                <div className="underline"></div>
                            </div>
                        </div>
                        <div className="junto">
                            <div className="input-container">
                                <input id="correo" name='correo' type="text" onChange={handleChange} />
                                <label className="label" htmlFor="correo">Correo</label>
                                <div className="underline"></div>
                            </div>
                            <div className="input-container">
                                <input id="celular" name='celular' type="text" maxLength={10} onChange={handleChange} />
                                <label className="label" htmlFor="celular">Numero de celular</label>
                                <div className="underline"></div>
                            </div>
                        </div>
                        <div className="junto">
                            <div className="select-container">
                                <label htmlFor="">Selecciona tu Rol</label>
                                <select name="RolId" id="RolId" onChange={handleChange}>
                                    <option value="10">Seleccionar</option>
                                    {roles.map((rol) => {
                                        const ocultar = rol.rolKey === "WM"
                                        return <option hidden={ocultar} value={rol.id} key={rol.id} >{rol.rol}</option>
                                    })
                                    }
                                </select>
                            </div>
                            <div className="input-container">
                                <input id="fechaNacimiento" name='fechaNacimiento' type="date" onChange={handleChange} />
                                <label className="label" htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                                <div className="underline"></div>
                            </div>
                        </div>
                        <div className="junto">
                            <div className="input-container">
                                <input id="password" name='password' type={showPassword2 ? "text" : "password"} onChange={handleChange} />
                                <label className="label" htmlFor="password">Contraseña</label>
                                <button type='button' style={{color: 'black'}} className="eye-button" onClick={() => setShowPassword2(!showPassword2)}>
                                    {showPassword2 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                </button>
                                <div className="underline"></div>
                            </div>
                            <div className="input-container">
                                <input id="repetirPassword" name='repetirPassword' type={showPassword3 ? "text" : "password"} onChange={handleChange} />
                                <label className="label" htmlFor="repetirPassword">Repetir Contraseña</label>
                                <button type='button' className="eye-button" style={{color: 'black'}} onClick={()=>{setShowPassword3(!showPassword3)}}>
                                    {showPassword3 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                </button>
                                <div className="underline"></div>
                            </div>
                        </div>
                        <div className="footerInputsRegister">
                            <div className="botonRegister">
                                <button type='submit' id='nut' className='button success'>Registrar</button>
                            </div>
                            <div className="linkRegister">
                                <Link className='linkInput' to='/login'>¿Ya tienes una cuenta?</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Register
