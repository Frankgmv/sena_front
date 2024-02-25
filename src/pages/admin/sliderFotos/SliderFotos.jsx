import './SliderFotos.css'

const SliderFotos = () => {
    return (
        <div>
            <div className='sliderFotos-Body'>
                <div className="encabezado">
                    <h3>Añadir Foto al Slider</h3>
                </div>
                <form action="">
                    <div className="input-group">
                        <div className="input-container">
                            <input id="id" name='input' type="file" />
                            <label className="label" htmlFor="id">identificación</label>
                            <div className="underline"></div>
                        </div>
                        <div className="input-container">
                            <input id="rol" name='rol' type="text" />
                            <label className="label" htmlFor="id">Titulo</label>
                            <div className="underline"></div>
                        </div>
                        <div className="textArea-container">
                            <textarea name="" id="" cols="100" rows="5"></textarea>
                            {/* <input id="nombre" name='nombre' type="text" /> */}
                            <label className="label" htmlFor="nombre">Nombre</label>
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
        </div>
    )
}

export default SliderFotos
