import './Calendario.css'

const Calendario = () => {
    return (
        <div className='calendarioBody'>
            <div className="titulo">
                <h2>Calendario</h2>
            </div>
            <iframe
                src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FBogota&bgcolor=%23ffffff&src=NDU3M2UzN2JjMzBjNDAxZWE1YWM0YmExM2UzODM4NzczNzllY2JjZDE2ZmU4M2EyNDc3M2IyZDUxZGNjOTljOUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZXMuY28jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTAzMDM2MjM3Mzk2MzYzOTk1NjQ1QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23F4511E&color=%230B8043&color=%23137333"
                style={{ border: "solid 1px #777" }}
                width={500}
                height={500}
                scrolling="no"
            />

        </div>
    )
}

export default Calendario
