import { createContext, useContext, useEffect, useState } from "react";
import { crearCodigoRequest, nuevoPasswordRequest, validarCodigoRequest } from "../api/recuperacion";

const ResetPasswordContext = createContext({
    errors: [],
    responseMessage: [],
    crearCodigo: () => { },
    validarCodigo: () => { },
    cambiarPassword: () => { }
});

export const useResetPasswordContext = () => {
    const context = useContext(ResetPasswordContext);
    if (!context) {
        throw new Error("Error en el Reset password context");
    }

    return context;
}


// eslint-disable-next-line react/prop-types
export const PasswordContext = ({ children }) => {
    const [errors, setErrors] = useState([]);
    const [responseMessage, setResponseMessage] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (errors.length != 0) {
                setErrors([]);
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [errors])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (responseMessage.length != 0) {
                setResponseMessage([]);
            }
        }, 3000);
        return () => { clearTimeout(timer) }
    }, [responseMessage])

    const crearCodigo = async (data) => {
        try {
            const response = await crearCodigoRequest(data);
            return response.data
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

    const validarCodigo = async (data) => {
        try {
            const response = await validarCodigoRequest(data);
            return response.data

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
    const cambiarPassword = async (data) => {
        try {
            const response = await nuevoPasswordRequest(data);
            return response.data
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
        crearCodigo,
        validarCodigo,
        cambiarPassword
    }

    return (
        <ResetPasswordContext.Provider value={allMethods}>
            {children}
        </ResetPasswordContext.Provider>
    )
}