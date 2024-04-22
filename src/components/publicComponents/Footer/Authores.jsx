import "./authores.css"
const Authores = ({url}) => {
  return (
    <div className="author">
        <a className="author-item" target="_blank" href={url}>&copy; Derechos de reservados</a>
        <a className="author-item" target="_blank" href={url}>Conoce nuestros creadores</a>
    </div>
  )
}

export default Authores
