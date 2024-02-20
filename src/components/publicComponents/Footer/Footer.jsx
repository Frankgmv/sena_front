import f1 from '../../../assets/img/logo.png'
import SocialMedia from '../SocialMedia/SocialMedia'
import './Footer.css'

const Footer = () => {
    return (
        <div className='footerBody'>
            <div className="footerInfo">
                <div className="encabezado">
                    <img src={f1} alt="Logo.png" />
                    <p className="footerText">Formando para la gente</p>
                </div>
                <div className="containerUbicacion">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13372.83792864169!2d-75.68337918806108!3d4.809765844113124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38873a60db98b9%3A0x33b5b34c5d8d2f81!2sInstituci%C3%B3n%20Educativa%20Centenario!5e0!3m2!1ses!2sco!4v1707898494913!5m2!1ses!2sco"
                        width={400}
                        height={200}
                        style={{ border: "0" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className="ubicacionText">
                        <div className="atencion">
                            <h4>Atención</h4>
                            <p>Lunes a Viernes</p>
                            <p>7:30 AM a 4:30 PM</p>
                        </div>
                        <div className="ubicacion">
                            <h4>Atención</h4>
                            <p>Cra 9 # 4-50</p>
                            <p>Peraira, Risaralda</p>
                        </div>
                    </div>
                </div>
                <div className="footerContacto">
                    <div className="footerTitulo">
                        <h3>Contáctenos</h3>
                    </div>
                    <div className="junto">
                        <div className="telefonos">
                            <h4>Telefonos</h4>
                            <p>Cel 1: 304 2032303</p>
                            <p>Cel 2: 317 5202024</p>
                            <p>Tel: 528 6578</p>
                        </div>
                        <div className="redes">
                            <h4>Redes</h4>
                            <p>@centenario_</p>
                            <p>centenario2024</p>
                            <p>centenario_@gmail.com</p>
                        </div>
                    </div>
                    <div className="iconRedes">
                        <SocialMedia />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
