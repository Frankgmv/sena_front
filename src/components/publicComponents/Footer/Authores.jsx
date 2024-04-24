import "./authores.css"
const Authores = ({url}) => {
  return (
    <div className="author">
        <sapn className="author-item">&copy; Derechos de reservados</sapn>
        <a className="author-item pointer" target="_blank" href={url}>Conoce nuestros creadores</a>
        <span className="author-item" >Proyecto SENA 2023 - 2024</span>
    </div>
  )
}
  
export default Authores
