import './Videos.css'

const Videos = () => {
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
                    {/* TODO mostrar aquí los videos subidos en la entidades de videos */}
                    <div className="video">
                        <iframe
                            width={460}
                            height={215}
                            src="https://www.youtube.com/embed/lT82BYM967s?si=Fkbbo1eXgvHAC8pw"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />

                        <h3>Himno Institucional</h3>
                    </div>
                    <div className="video">
                        <iframe
                            width={460}
                            height={215}
                            src="https://www.youtube.com/embed/lT82BYM967s?si=Fkbbo1eXgvHAC8pw"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />

                        <h3>Himno Institucional</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Videos
