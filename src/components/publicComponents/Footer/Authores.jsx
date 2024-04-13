import { Link } from "react-router-dom"
import "./authores.css"
const Authores = ({url}) => {
  return (
    <div className="author">
        <Link className="author-item" target="_blank" href={url}>&copy; Derechos de reservados</Link>
        <Link className="author-item" target="_blank" href={url}>Conoce nuestros creadores</Link>
    </div>
  )
}

export default Authores
