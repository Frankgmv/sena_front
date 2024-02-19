import CardEventos from '../Cards/CardEventos/CardEventos'
import './Eventos.css'

const Eventos = () => {
    return (
        <div className='eventosBody'>
            <div className="titulo">
                <h2>Galería de Eventos</h2>
            </div>
            <CardEventos 
                titulo='Entrega de Simbolos'
                descripcion='Lorem ipsum dolor sit amet consectetur. Lectus tellus mi sed tempus tincidunt quis. Amet ornare.'
            />
            <CardEventos 
                titulo='Entrega de Simbolos'
                descripcion='Lorem ipsum dolor sit amet consectetur. Lectus tellus mi sed tempus tincidunt quis. Amet ornare.'
            />
        </div>
    )
}

export default Eventos
