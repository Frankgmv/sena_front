import f1 from '../../../assets/img/f1.jpg'
import f2 from '../../../assets/img/f2.jpg'
import f3 from '../../../assets/img/f3.jpg'
import f4 from '../../../assets/img/f4.jpg'
import NavBar from '../Navbar/NavBar'
import './slider.css'

const Slider = () => {
    return (
        <div className="body_slider">
            <div className="fondo"></div>
            <div className="slider">
                <div className="navbar">
                    <NavBar />
                </div>
                <ul>
                    <li>
                        <img src={f1} alt="F1" />
                        <div className="slider_texto">
                            <h2>Imagen 1</h2>
                            <p>
                                What is Lorem Ipsum? Lorem Ipsumis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>
                    </li>
                    <li>
                        <img src={f2} alt="F1" />
                        <div className="slider_texto">
                            <h2>Imagen 2</h2>
                            <p>
                                What is Lorem Ipsum? Lorem Ipsumis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>
                    </li>
                    <li>
                        <img src={f3} alt="F1" />
                        <div className="slider_texto">
                            <h2>Imagen 3</h2>
                            <p>
                            What is Lorem Ipsum? Lorem Ipsumis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>
                    </li>
                    <li>
                        <img src={f4} alt="F1" />
                        <div className="slider_texto">
                            <h2>Imagen 4</h2>
                            <p>
                            What is Lorem Ipsum? Lorem Ipsumis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Slider
