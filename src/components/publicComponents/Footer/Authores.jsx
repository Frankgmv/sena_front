import "./authores.css"
const Authores = ({ url }) => {
  return (
    <div className="author">
      <span className="author-item">&copy; Derechos de reservados</span>
      <a className="author-item pointer" target="_blank" href={url}>Conoce nuestros creadores</a>
      <span className="author-item" >Proyecto SENA 2023 - 2024</span>
    </div>
  )
}

export default Authores
