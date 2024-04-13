import React from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import NavBar from "../../components/publicComponents/Navbar/NavBar";

export default function Anuncios() {
    let tabs = [
        {
            id: "no-clases",
            label: "Sin clases",
            content: "No hay clase muchachos"
        },
        {
            id: "entrega-notas",
            label: "Entrega de Notas",
            content: "El dia tal y tal van a entregar notas :D"
        },
    ];

    return (
        <>
        <NavBar />
            <div className="flex flex-col text-center mt-5">
                <Tabs aria-label="Dynamic tabs" items={tabs}>
                    {(item) => (
                        <Tab className="text-black hover:bg-primary pl-5 m-2 border" key={item.id} title={item.label}>
                            <Card>
                                <CardBody>
                                    {item.content}
                                </CardBody>
                            </Card>
                        </Tab>
                    )}
                </Tabs>
            </div>
        </>
    );
}
