import React, { useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import NavBar from "../../components/publicComponents/Navbar/NavBar";
import { useDataGeneralContext } from "../../context/publicContexts/DataGeneralContext";
import { MOSTRAR_ARCHIVO } from "../../assets/includes/variables";

export default function Anuncios() {
    const { anuncios, secciones } = useDataGeneralContext();
    const [seccionesData, setSeccionesData] = useState([]);
    const [anunciosData, setAnunciosData] = useState([]);
    const [activeTabId, setActiveTabId] = useState(null);

    useEffect(() => {
        fetch("http://localhost:9000/api/v1/data/secciones")
            .then((response) => response.json())
            .then((data) => {
                if (data.ok) {
                    setSeccionesData(data.data);
                }
            });
    }, []);

    useEffect(() => {
        seccionesData.forEach((seccion) => {
            fetch(`http://localhost:9000/api/v1/data/anuncios?SeccionId=${seccion.id}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.ok) {
                        setAnunciosData((prevAnuncios) => {
                            const anunciosPorSeccion = data.data.map((anuncio) => ({
                                ...anuncio,
                                seccion: seccion.seccion,
                            }));
                            return [...prevAnuncios, ...anunciosPorSeccion];
                        });
                    }
                });
        });
    }, [seccionesData]);

    const tabs = seccionesData.map((seccion) => {
        const anunciosPorSeccion = anunciosData.filter(
            (anuncio) => anuncio.seccion === seccion.seccion
        );
        return {
            id: seccion.seccionKey,
            label: seccion.seccion,
            active: activeTabId === seccion.seccionKey,
            content: (
                <div>
                    {anunciosPorSeccion.map((anuncio) => (
                        <div key={anuncio.id}>
                            <h2>{anuncio.titulo}</h2>
                            <p>{anuncio.descripcion}</p>
                            <img src={MOSTRAR_ARCHIVO(anuncio.imgPath)} alt={anuncio.titulo} />
                        </div>
                    ))}
                </div>
            ),
        };
    });

    return (
        <>
            <NavBar />
            <div className="flex flex-col text-center mt-5">
                <Tabs aria-label="Dynamic tabs" items={tabs}>
                    {(item) => (
                        <Tab
                            key={item.id}
                            title={item.label}
                            active={item.active}
                            onClick={() => setActiveTabId(item.id)}
                            className="text-black hover:bg-primary pl-5 m-2 border"
                        >
                            <Card>
                                <CardBody>{item.content}</CardBody>
                            </Card>
                        </Tab>
                    )}
                </Tabs>
            </div>
        </>
    );
}
