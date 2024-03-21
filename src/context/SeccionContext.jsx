import { createContext, useContext, useEffect, useState } from "react";
import { getAllSeccionesRequest, getSeccionRequest, getSeccionMenuRequest} from "../api/data";

const SeccionContext = createContext();

export const useSeccionContext = () => {
    const context = useContext(SeccionContext);
    if (!context) {
        throw new Error("Error en el credential Seccion context"); 
    }

    return context;
};

// eslint-disable-next-line react/prop-types
export const SeccionProvider = ({ children }) => {
    const [errorsData, setErrorsData] = useState([]);
    const [responseMessageData, setResponseMessageData] = useState([]);
    const [seccion, setSeccion] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (errorsData.length != 0) {
                setErrorsData([]);
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, [errorsData])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (responseMessageData.length != 0) {
                setResponseMessageData([]);
            }
        }, 5000);
        return () => { clearTimeout(timer) }
    }, [responseMessageData])

    const getSecciones = async () => {
        try {
            const response = await getAllSeccionesRequest()
            const data = await response.data
            if (data.ok) {
                setSeccion(data.data)
            }
        } catch (error) {
            if (error.message) {
                setErrorsData((prevent) => {
                    if (!errorsData.includes(error.message)) {
                        return [
                            ...prevent,
                            error.message
                        ]
                    }
                    return prevent
                })
            }

            if (error.response.data.message) {
                setErrorsData((prevent) => {
                    if (!errorsData.includes(error.response.data.message)) {
                        return [
                            ...prevent,
                            error.response.data.message
                        ]
                    }
                    return prevent
                })
            }
        }
    }

    const getSeccionesMenu = async () => {
        try {
            const response = await getSeccionMenuRequest()
            const data = await response.data
            if (data.ok) {
                setSeccion(data.data)
            }
        } catch (error) {
            if (error.message) {
                setErrorsData((prevent) => {
                    if (!errorsData.includes(error.message)) {
                        return [
                            ...prevent,
                            error.message
                        ]
                    }
                    return prevent
                })
            }

            if (error.response.data.message) {
                setErrorsData((prevent) => {
                    if (!errorsData.includes(error.response.data.message)) {
                        return [
                            ...prevent,
                            error.response.data.message
                        ]
                    }
                    return prevent
                })
            }
        }
    }

    const getSeccion = async (id) => {
        try {
            const response = await getSeccionRequest(id)
            const data = await response.data
            if (data.ok) {
                setResponseMessageData((prevent) => {
                    if (!responseMessageData.includes(data.message)) {
                        return [
                            ...prevent,
                            data.message
                        ]
                    }
                    return prevent
                })
            }

            return data
        } catch (error) {
            if (error.message) {
                setErrorsData((prevent) => {
                    if (!errorsData.includes(error.message)) {
                        return [
                            ...prevent,
                            error.message
                        ]
                    }
                    return prevent
                })
            }

            if (error.response.data.message) {
                setErrorsData((prevent) => {
                    if (!errorsData.includes(error.response.data.message)) {
                        return [
                            ...prevent,
                            error.response.data.message
                        ]
                    }
                    return prevent
                })
            }
        }
    }

    const allMethods = {
        errorsData,
        setErrorsData,
        responseMessageData,
        getSecciones,
        seccion,
        getSeccionesMenu,
        getSeccion,
    }

    return (
        <SeccionContext.Provider value={allMethods}>
            {children}
        </SeccionContext.Provider>
    )
}