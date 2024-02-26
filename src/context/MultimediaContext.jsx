import { createContext, useContext, useEffect, useState } from "react";
import { postVideoRequest } from "../api/multimedia";

const MultimediaContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useMultimediaContext = () => {
    const context = useContext(MultimediaContext);
    if (!context) {
        throw new Error("Error en el credential context");
    }

    return context;
}

// eslint-disable-next-line react/prop-types
export const MultimediaProvider = ({ children }) => {
    const [errorsMultimedia, setErrorsMultimedia] = useState([]);
    const [responseMessageMultimedia, setResponseMessageMultimedia] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (errorsMultimedia.length != 0) {
                setErrorsMultimedia([]);
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, [errorsMultimedia])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (responseMessageMultimedia.length != 0) {
                setResponseMessageMultimedia([]);
            }
        }, 5000);
        return () => { clearTimeout(timer) }
    }, [responseMessageMultimedia])

    const postVideo = async (datosFormulario) => {
        try {
            const response = await postVideoRequest(datosFormulario)
            const data = await response.data
            if (data.ok) {
                setResponseMessageMultimedia([...responseMessageMultimedia, data.message])
                console.log(data.data)
            } else {
                if (data.message) {
                    setErrorsMultimedia((prevent) => {
                        if (!errorsMultimedia.includes(data.message)) {
                            return [
                                ...prevent,
                                data.message
                            ]
                        }
                        return prevent
                    })
                }
            }
            console.log(response)
        } catch (error) {
            console.log(error)
            const datos = error.response.data
            if (datos.zodError) {
                error.response.data.zodError.issues.map(error => {
                    setErrorsMultimedia((prevent) => {
                        if (!prevent.includes(error.message)) {
                            return [
                                ...prevent,
                                error.message
                            ]
                        }
                        return prevent
                    })
                })
            }

            if (error.response.data.message) {
                setErrorsMultimedia((prevent) => {
                    if (!errorsMultimedia.includes(error.response.data.message)) {
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
        errorsMultimedia,
        setErrorsMultimedia,
        responseMessageMultimedia,
        postVideo
    }

    return (
        <MultimediaContext.Provider value={allMethods}>
            {children}
        </MultimediaContext.Provider>
    )
}