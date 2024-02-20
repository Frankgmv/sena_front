import './Register.css'
import fondo from '../../assets/img/f1.jpg'
import Boton3 from '../../components/publicComponents/botones/boton3/Boton3'
import Boton4 from '../../components/publicComponents/botones/boton4/Boton4'
import { useCredentialContext } from '../../context/CredentialContext'
import { useState } from 'react'
import toastr from '../../assets/includes/Toastr';
const Register = () => {
    const [dataLogin, setdataLogin] = useState({});
    const { roles, login } = useCredentialContext();

    const handleSubmit = (e) => {
        e.preventDefault()
        login(dataLogin)
        console.log(dataLogin)
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

    if(1===1){
        toastr.error('Error en el registro');
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
                    <form onSubmit={handleSubmit}>
                        <div className="junto">
                            <div className="input-container">
                                <input id="id" name='id' type="number" onChange={handleChange} maxLength={10} />
                                <label className="label" htmlFor="input">Identificacion</label>
                                <div className="underline"></div>
                            </div>
                            <div className="input-container">
                                <input id="password" name='password' type="password" onChange={handleChange} />
                                <label className="label" htmlFor="input">Contraseña</label>
                                <div className="underline"></div>
                            </div>
                        </div>
                        <div className="select-container">
                            <select name="RolId" id="RolId" onChange={handleChange}>
                                {roles.map((rol) => {
                                    return <option value={rol.id} key={rol.id} >{rol.rol}</option>
                                })
                                }
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
