import { useDataGeneralContext } from '../../../context/publicContexts/DataGeneralContext'
import './Videos.css'

const Videos = () => {
    const { videos } = useDataGeneralContext()
    return (
        <div className='videoBody'>
            <div className="titulo">
                <h2>Nuestros Videos Institucionales</h2>
            </div>
            <div className="videos">
                <div className="videoPrincipal">
                    <iframe
                        width={920}
                        height={430}
                        src="https://www.youtube.com/embed/A0WRa1vA9Co?si=oWIk0j5gXyIU4EeR"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                    <h3>Himno Institucional</h3>
                </div>
                <div className="videoComplemento">
                    {
                        videos.map((item, i) => {
                            return (
                                <div key={i} className="video">
                                    <iframe
                                        id={i}
                                        key={i}
                                        width={460}
                                        height={215}
                                        style={{ border: '3px solid var(--black)', borderRadius: '10px'}}
                                        src={item.link}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                    <h3><a href={item.link} target='_blank'> <b>Ver {item.titulo}</b></a></h3>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Videos
