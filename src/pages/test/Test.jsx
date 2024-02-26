import { useEffect} from "react";
import { useUserContext } from "../../context/UserContext"
import { useCredentialContext } from "../../context/AuthContext"
import toastr from "../../assets/includes/Toastr";
import { useMultimediaContext } from "../../context/MultimediaContext";
import { useNavigate } from "react-router-dom";

const Test = () => {
    // Lógica del login
    const navigate = useNavigate();
    const { getUsers, errorsUser, responseMessageUser } = useUserContext()
    const { logout} = useCredentialContext()
    const { postVideo, errorsMultimedia, responseMessageMultimedia } = useMultimediaContext()

    const users = (e) => {
        e.preventDefault()
        getUsers()
    }
    const cierre = (e) => {
        e.preventDefault()
        logout()
        navigate('/login')
    }

    useEffect(() => {
        if (responseMessageUser.length != 0) {
            responseMessageUser.map(msg => {
                toastr.success(msg)
            })
        }
        if (errorsMultimedia.length != 0) {
            errorsMultimedia.map(msg => {
                toastr.error(msg)
            })
        }

        if (errorsUser.length != 0) {
            errorsUser.map(error => {
                return toastr.error(error)
            })
        }

        if (responseMessageMultimedia.length != 0) {
            responseMessageMultimedia.map(error => {
                return toastr.success(error)
            })
        }
    }, [responseMessageUser, errorsUser, errorsMultimedia, responseMessageMultimedia]);

    useEffect(()=>{
        document.querySelector('form').reset()
    }, [responseMessageMultimedia])


    // Lógica del envio de formulario

    const handleSubmit = (e) => {
        e.preventDefault()
        const formularioData = new FormData(e.currentTarget);
        postVideo(formularioData)
    }

    return (
        <div style={{ display: "flex", gap: '20px', padding: '20px', flexDirection: 'column', alignContent: 'center' }}>
            <div style={{ display: 'block' }}>
                <button onClick={users} style={{ padding: '15px', background: '#000', color: '#ffff' }}>Get Users</button>
                <button onClick={cierre} style={{ padding: '15px', background: '#000', color: '#fadc' }}>Logout</button>
            </div>
           
                <form onSubmit={handleSubmit} method="post" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%" }}>
                    <div className="input-container">
                        <input id="UsuarioId" name='UsuarioId' type="text" maxLength={10}  />
                        <label className="label" htmlFor="UsuarioId">Identificacion</label>
                        <div className="underline"></div>
                    </div>
                    <div className="input-container">
                        <input id="link" name="link" type="text"  />
                        <label className="label" htmlFor="link">Link</label>
                        <div className="underline"></div>
                    </div>
                    <div className="input-container">
                        <input id="titulo" name="titulo" type="text"  />
                        <label className="label" htmlFor="titulo">titulo</label>
                        <div className="underline"></div>
                    </div>
                    <div className="input-container">
                        <input id="imagen" name="imagen" type="file" />
                        <label className="label" htmlFor="imagen">imagen</label>
                        <div className="underline"></div>
                    </div>
                    <div className="botonRegister">
                        <button className="button success">Registrar Usuario</button>
                    </div>
                </form>
        </div>
    )
}

export default Test
