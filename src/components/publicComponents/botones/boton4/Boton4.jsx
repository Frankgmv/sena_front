import './Boton4.css'

const Boton4 = (data) => {
    return (
        <div>
            <button type={data.type} className="button">{data.name}</button>
        </div>
    )
}

export default Boton4
