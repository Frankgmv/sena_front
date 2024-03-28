import Boton4 from '../../components/publicComponents/botones/boton4/Boton4'
import './Register.css'
import fondo from '../../assets/img/f1.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCredentialContext } from '../../context/AuthContext'
import toastr from '../../assets/includes/Toastr'
const Register = () => {
    const { roles, setErrors, errors, responseMessage, register } = useCredentialContext();
    const [dataRegister, setDataRegister] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (errors.length != 0) {
            const deleteDuplicidad = new Set(errors);
            const errors2 = [...deleteDuplicidad]
            errors2.map(error => {
                toastr.error(error)
            })
        }
    }, [errors]);


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
            <div className="textoRegister">
                <h2>Ya tienes una cuenta?</h2>
                <div className="boton"  onClick={() => navigate("/login")}>
                    <Boton4 link='/login' name='Iniciar Sesion' id="irALogin" />
                </div>
            </div>
            <div className="containerInputRegister">
                <div className="encabezadoRegister">
                    <h3>Bienvenido</h3>
                    <p>A la plataforma educativa</p>
                    <h2>I. E. Centenario Pereira</h2>
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
                                <input id="claveEspecial" name='claveEspecial' type="password" onChange={handleChange} />
                                <label className="label" htmlFor="claveEspecila">Clave Especial</label>
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
                                <input id="correo" name='correo' type="email" onChange={handleChange} />
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
                                <input id="password" name='password' type="password" onChange={handleChange} />
                                <label className="label" htmlFor="password">Contraseña</label>
                                <div className="underline"></div>
                            </div>
                            <div className="input-container">
                                <input id="repetirPassword" name='repetirPassword' type="password" onChange={handleChange} />
                                <label className="label" htmlFor="repetirPassword">Repetir Contraseña</label>
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
