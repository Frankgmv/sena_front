import NavBar from '../../components/publicComponents/Navbar/NavBar'
import './Institucion.css'
import mision from '../../assets/img/mision.jpg'
import vision from '../../assets/img/vision.jpg'
import logo from '../../assets/img/logo.png'
import bandera from '../../assets/img/bandera.jpeg'
import Slider from '../../components/publicComponents/Slider/Slider'
import Footer from '../../components/publicComponents/Footer/Footer'
import MenuInteractivo from '../../components/publicComponents/MenuInteractivo/MenuInteractivo'

const Institucion = () => {
    return (
        <div>
            <NavBar />
            <Slider />
            <div className="container-content">
                <div className="mision">
                    <div className="container-text">
                        <h3 className='uppercase'>MISIÓN</h3>
                        <p>La Institución Educativa Centenario propende por formar estudiantes reflexivos, críticos, analíticos, responsables, con capacidad para resolver sus problemas y liderar procesos en la comunidad. Del mismo modo, busca la formación integral de los estudiantes, desarrollando las competencias básicas para desenvolverse en la vida diaria y los valores como pilares de la convivencia pacífica y del reconocimiento a la diferencia, promoviendo un espíritu de liderazgo e investigación científica y tecnológica para que puedan ser seres formados para la vida y puedan vincularse a la educación superior en condiciones de dignidad e igualdad, contribuyendo de manera efectiva a la construcción y realización de su proyecto de vida.
                        </p>
                    </div>
                    <div className="imagen">
                        <img src={mision} alt="" />
                    </div>
                </div>
                <div className="vision">
                    <div className="imagen">
                        <img src={vision} alt="" />
                    </div>
                    <div className="container-text">
                        <h3 className='uppercase'>VISIÓN</h3>
                        <p>La Institución Educativa Centenario propende por formar estudiantes reflexivos, críticos, analíticos, responsables, con capacidad para resolver sus problemas y liderar procesos en la comunidad. Del mismo modo, busca la formación integral de los estudiantes, desarrollando las competencias básicas para desenvolverse en la vida diaria y los valores como pilares de la convivencia pacífica y del reconocimiento a la diferencia, promoviendo un espíritu de liderazgo e investigación científica y tecnológica para que puedan ser seres formados para la vida y puedan vincularse a la educación superior en condiciones de dignidad e igualdad, contribuyendo de manera efectiva a la construcción y realización de su proyecto de vida.
                        </p>
                    </div>
                    <div className="imagen2">
                        <img src={vision} alt="" />
                    </div>
                </div>
                <div className="simbolos-institucionales">
                    <div className="titulo-bandera-escudo">
                        <h2>SIMBOLOS DE IDENTIDAD INSTITUCIONAL</h2>
                    </div>
                    <div className="escudo-bandera">
                        <div className="escudo">
                            <div className="text-escudo">
                                <h3>ESCUDO</h3>
                                <p>El escudo de la I.E Centenario, tiene una forma caprichosa, que es el resultado de transformaciones más estéticas de escudos para la guerra en la heráldica española, ya que no se quiere dar la impresión de ser utilizado para combates. Tiene en su interior dos símbolos, el búho y el libro abierto, cuyo significado se describe a continuación:</p>
                                <p className="list">El Búho: simboliza la sabiduría y la observación que son las virtudes que ha de poseer la justicia. Los ojos del búho que ven en la oscuridad, indican que se debe analizar la verdad con objetividad y que la institución busca formar personas claras de juicio, capaces de tomar con lucidez decisiones rigurosas.</p>
                                <p className="list">El Libro Abierto: Permite vislumbrar el anhelo de la institución en el que se quiere compartir todo: ciencia-conocimientos-virtud–valores-sabiduría-objetividad en los procedimientos. Además, recuerda que el conocimiento debe ser de libre acceso en una sociedad que cada vez está más expuesta a las desigualdades e inequidades sociales.</p>
                            </div>
                            <div className="imagen-escudo">
                                <img src={logo} alt="logo.png" title='logo' />
                            </div>
                        </div>
                        <div className="bandera">
                            <div className="text-bandera">
                                <h3>BANDERA</h3>
                                <p>La forma de la bandera de la I. E Centenario obedece a un homenaje a la forma de la bandera del municipio de Pereira, al igual que el nombre de la institución. Posee dos colores: azul y blanco, cuyo significado se explica a continuación:</p>
                                <p className="list">Color Azul: El color azul es un color fresco, tranquilizante y se asocia a la parte intelectual donde el conocimiento es atemporal, es decir, que el aprendizaje es para siempre. Además, se habla de él como un color que se asocia a la tranquilidad y a claridad de ideas. Los elementos que aporta a la bandera y a la institución el color azul son estabilidad, profundidad, lealtad, confianza, sabiduría, inteligencia, fe, verdad, eternidad, conocimiento, integridad, poder, seriedad, generosidad, salud, frescor, entendimiento y tranquilidad..</p>
                                <p className="list">Color Blanco: representa pureza, aporta paz, ayuda a limpiar y aclarar las emociones, los pensamientos y el espíritu. Los elementos que aporta a la bandera y a la institución el color blanco son luz, bondad, pureza, optimismo, perfección e inocencia.</p>
                            </div>
                            <div className="imagen-bandera">
                                <img src={bandera} alt="logo.png" title='logo' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="himno">
                    <div className="titulo-himno">
                        <h2>HIMNO</h2>
                    </div>
                    <div className="text-himno">
                        <div className="col-3">
                            <div className="titulo-col">CORO</div>
                            <p className="text-col">Con amor y alegría te cantamos Centenario gran institución Donde unidos todos nos formamos Y crecemos con fuerza e ilusión. Los valores son tu fortaleza, Educar en la vida es tu fin, La justicia acompaña tus días Centenario eres orgullo para mí.</p>
                        </div>
                        <div className="col-3">
                            <div className="titulo-col">I</div>
                            <p className="text-col">Son los libros y el conocimiento estandartes de gran esplendor y pensando en la patria querida aportamos saber y valor. Ayudar a formar corazones Es tu más encomiable labor, presintiendo la gran aventura que la vida les deparará.</p>
                        </div>
                        <div className="col-3">
                            <div className="titulo-col">II</div>
                            <p className="text-col">Tus maestros muy profesionales sagrada y hermosa es su labor trabajando con seres ansiosos de crecer con altura y tesón. Fiel historia tus aulas alberga Son lectura de gran ilusión Por tus patios desfilan sonrientes Seres llenos de fe y esplendor.</p>
                        </div>
                    </div>
                </div>
            </div>
            <MenuInteractivo />
            <Footer />
        </div>
    )
}

export default Institucion
