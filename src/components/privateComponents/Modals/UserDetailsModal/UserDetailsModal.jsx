import './UserDetailsModal.css'

const UserDetailsModal = () => {
    return (
        <div className='infoUsuario-Body'>
            <div className="encabezado">
                <h3>Información del Usuario</h3>
            </div>
            <form action="">
                <div className="input-group">
                    <div className="input-container">
                        <input id="id" name='input' type="text" />
                        <label className="label" htmlFor="id">identificación</label>
                        <div className="underline"></div>
                    </div>
                    <div className="input-container">
                        <input id="rol" name='rol' type="text" />
                        <label className="label" htmlFor="id">Rol</label>
                        <div className="underline"></div>
                    </div>
                    <div className="input-container">
                        <input id="nombre" name='nombre' type="text" />
                        <label className="label" htmlFor="nombre">Nombre</label>
                        <div className="underline"></div>
                    </div>
                    <div className="input-container">
                        <input id="apellido" name='apellido' type="text" />
                        <label className="label" htmlFor="apellido">Apellido</label>
                        <div className="underline"></div>
                    </div>
                    <div className="input-container">
                        <input id="email" name='email' type="email" />
                        <label className="label" htmlFor="email">Email</label>
                        <div className="underline"></div>
                    </div>
                    <div className="input-container">
                        <input id="celular" name='celular' type="text" />
                        <label className="label" htmlFor="celular">Número de Teléfono</label>
                        <div className="underline"></div>
                    </div>
                    <div className="input-container">
                        <input id="createdAt" name='createdAt' type="date" placeholder="dd/mm/aaaa" />
                        <label className="label" htmlFor="createdAt">Fecha de Creación</label>
                        <div className="underline"></div>
                    </div>
                    <div className="input-container">
                        <input id="fechaNacimiento" name='fechaNacimiento' type="date" placeholder="dd/mm/aaaa" />
                        <label className="label" htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                        <div className="underline"></div>
                    </div>
                </div>
                <div className="botones">
                    <div className="btn editar">
                        <button type='submit' id='nut' className='button edit'>Editar</button>
                    </div>
                    <div className="btn eliminar">
                        <button type='submit' id='nut' className='button delete'>Eliminar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UserDetailsModal
