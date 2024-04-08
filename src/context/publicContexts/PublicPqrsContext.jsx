import { createContext, useContext, useEffect, useState } from "react";
import { postPQRSRequest } from "../../api/informacion";

const PublicPqrsContext = createContext();

export const usePublicPqrsContext = () => {
    const context = useContext(PublicPqrsContext);
    if (!context) {
        throw new Error("Error en el Public Pqrs Context");
    }

    return context;
};

// eslint-disable-next-line react/prop-types
export const PublicPqrsProvider = ({ children }) => {
    const [errors, setErrors] = useState([]);
    const [responseMessage, setResponseMessage] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (errors.length != 0) {
                setErrors([]);
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, [errors])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (responseMessage.length != 0) {
                setResponseMessage([]);
            }
        }, 5000);
        return () => { clearTimeout(timer) }
    }, [responseMessage])


    const postPqrs = async (dataPqrs) => {
        try {
            const response = await postPQRSRequest(dataPqrs)
            const data = await response.data
            if (data.ok) {
                setResponseMessage((prevent) => {
                    if (!responseMessage.includes(data.message)) {
                        return [
                            ...prevent,
                            data.message
                        ]
                    }
                    return prevent
                })
            } else {
                setErrors((prevent) => {
                    if (!prevent.includes(data.message)) {
                        return [
                            ...prevent,
                            data.message
                        ]
                    }
                    return prevent
                })
            }
        } catch (error) {
            const datos = error.response.data
            if (datos.zodError) {
                error.response.data.zodError.issues.map(error => {
                    setErrors((prevent) => {
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

            if (datos.message) {

                setErrors((prevent) => {
                    if (!prevent.includes(datos.message)) {
                        return [
                            ...prevent,
                            datos.message
                        ]
                    }
                    return prevent
                })
            }
        }
    }

    const allMethods = {
        errors,
        responseMessage,
        postPqrs
    }

    return (
        <PublicPqrsContext.Provider value={allMethods}>
            {children}
        </PublicPqrsContext.Provider>
    )
}