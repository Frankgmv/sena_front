import './Institucion.css'
import mision from '../../assets/img/mision.jpg'
import vision from '../../assets/img/vision.jpg'
import logo from '../../assets/img/logo.png'
import bandera from '../../assets/img/bandera.jpeg'
import { lazy, Suspense } from 'react'
import { Margin, Padding } from '@mui/icons-material'
const Slider = lazy(() => import('../../components/publicComponents/Slider/Slider.jsx'))
const LoadingScreen = lazy(() => import('../../components/Loading/LoadingScreen.jsx'))
const NavBar = lazy(() => import('../../components/publicComponents/Navbar/NavBar.jsx'))
const Footer = lazy(() => import('../../components/publicComponents/Footer/Footer.jsx'))
const MenuInteractivo = lazy(() => import('../../components/publicComponents/MenuInteractivo/MenuInteractivo.jsx'))

const Institucion = () => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <div>
                <NavBar />
                <Slider />
                <div className="container-content">
                    <div className="mision">
                        <div className="container-text">
                            <h3 className='uppercase'>MISIÓN</h3>
                            <p>Formar estudiantes reflexivos, críticos y responsables, capaces de resolver problemas y liderar en su comunidad. Promovemos una educación integral que desarrolla competencias básicas para la vida diaria y valores como el respeto a la diferencia y la convivencia pacífica.

                                Fomentamos el liderazgo y el acceso a la educación superior en condiciones dedignidad e igualdad, contribuyendo a la construcción de su proyecto de vida. Además,impulsamos proyectos culturales, deportivos y recreativos que promueven laconservación de la vida, el respeto mutuo y el desarrollo personal, brindandoespacios para el uso adecuado del tiempo libre.
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
                            <p>Para el año 2027, nuestra Institución Educativa Centenario, será reconocida como una de las mejores del núcleo 7, con una oferta ampliada hacia la educación media, facilitando que un mayor número de egresados continúe su formación en la educación superior.

                                Formaremos integralmente a hombres y mujeres que respeten la vida en todas sus manifestaciones, capaces de aceptar y respetar la diferencia, autónomos y hábiles en la resolución de conflictos mediante el diálogo, transformando positivamente su entorno y contribuyendo a la sociedad.
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
                                    <h3 style={{marginBottom:"20px"}}>ESCUDO</h3>
                                    <p>El búho, símbolo de sabiduría y observación, representa las virtudes fundamentales para alcanzar la justicia. Sus ojos, capaces de ver en la oscuridad, nos recuerdan la importancia de analizar la verdad con objetividad, incluso en los momentos más difíciles. </p>
                                </div>
                                <div className="imagen-escudo">
                                    <img src={logo} alt="logo.png" title='logo' />
                                </div>
                            </div>
                            <div className="bandera">
                                <div className="text-bandera">
                                    <h3 style={{marginBottom:"20px"}}>BANDERA</h3>
                                    <p>El color azul de nuestra bandera simboliza la serenidad y la profundidad del conocimiento, recordándonos que el aprendizaje es un proceso continuo y atemporal. Este color, asociado con la tranquilidad y la claridad mental, refleja el ambiente académico que buscamos promover en nuestra institución, donde el pensamiento crítico y la reflexión constante son pilares fundamentales de la formación.
                                    </p>
                                    <p className="list">El color blanco, por su parte, representa la pureza de espíritu y el compromiso con la honestidad y la integridad. Es un símbolo de paz que invita a la comunidad educativa a mantener un espacio armónico, donde las emociones y pensamientos se aclaran y orientan hacia el crecimiento personal y colectivo, siempre en un ambiente de respeto y equidad.</p>

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
                <div className="menu-intereactivo">
                    <MenuInteractivo />
                </div>
                <Footer />
            </div>
        </Suspense>
    )
}

export default Institucion
