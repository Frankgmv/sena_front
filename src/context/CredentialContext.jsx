import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const credentialContext = createContext();

export const useCredentialContext = () => {
    const context = useContext(credentialContext);
    if (!context) {
        throw new Error("Error en el credential context");
    }
    return context;
}

// eslint-disable-next-line react/prop-types
export const CredentialProvider = ({ children }) => {

    const [errorsCredential, setErrorsCredential] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [isLogged, setisLogged] = useState(false);
    const [roles, setRoles] = useState([]);
    
    useEffect(()=>{
        getRoles();
    }, [])


    useEffect(()=>{
        const timer = setTimeout(() => {
            setErrorsCredential([]);
        }, 10000);
        return () => clearTimeout(timer);
    }, [errorsCredential])

    const getRoles = async () => {
        try {
            const response = await api.get('/data/roles');
            const data = await response.data
            if (data.ok) {
                setRoles(data.data)
            }
        } catch (error) {
            setErrorsCredential(error)
            console.log(error)
        }
    }


    const login = async (dataLogin) => {
        try {
            const response = await api.post('/validacion/login', dataLogin);
            const data = await response.data
            setResponseMessage(data.message);

            if (data.status === 200) {
                setisLogged(true);
            }
            console.log(response);
        } catch (error) {
            setErrorsCredential(error)
            console.log(error)
        }
    }

    const allMethods = {
        errorsCredential,
        setErrorsCredential,
        isLogged,
        login,
        responseMessage,
        roles
    }

    return (
        <credentialContext.Provider value={allMethods}>
            {children}
        </credentialContext.Provider>
    )
}