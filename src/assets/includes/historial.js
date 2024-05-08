import {
    perfilRequest
} from "../../api/auth"
import {
    postHistorialRequest
} from "../../api/informacion"

export const registerActionHistorial = async (cambio, descripcion) => {
    try{

        const perfilUser = await perfilRequest()
        if (perfilUser.data.ok) {
            let datos = perfilUser.data.data
            let UsuarioId = parseInt(datos.id)
            const dataHistorial = { cambio, descripcion, UsuarioId}
            await postHistorialRequest(dataHistorial)
        }
    }catch(e){
        console.log(e.message)
    }
}