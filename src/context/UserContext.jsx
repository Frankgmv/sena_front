import { createContext, useContext, useEffect, useState } from "react";
import { getRolesRequest, getUsuarioRequest } from "../api/data";
import toastr from "../assets/includes/Toastr";

const UserContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("Error en el credential context");
    }

    return context;
}

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
    const [errorsUser, setErrorsUser] = useState([]);
    const [responseMessageUser, setResponseMessageUser] = useState([]);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        getRoles();
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (errorsUser.length != 0) {
                setErrorsUser([]);
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, [errorsUser])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (responseMessageUser.length != 0) {
                setResponseMessageUser([]);
            }
        }, 5000);
        return () => { clearTimeout(timer) }
    }, [responseMessageUser])

    const getRoles = async () => {
        try {
            const response = await getRolesRequest()
            const data = await response.data
            if (data.ok) {
                setRoles(data.data)
            }
        } catch (error) {
            if (error.response.message) {
                setErrorsUser((prevent) => {
                    return [
                        ...prevent,
                        error.message
                    ]
                })
            }
        }
    }

    const getUsers = async () => {
        try {
            const response = await getUsuarioRequest()
            const data = await response.data
            if (data.ok) {
                console.log(data.data)
                data.data.map((user)=>{
                    toastr.info(JSON.stringify(user.nombre, user.apellido))
                })
            }
        } catch (error) {
            console.log(error)
            if (error.message) {
                setErrorsUser((prevent) => {
                    if (!errorsUser.includes(error.message)) {
                        return [
                            ...prevent,
                            error.message
                        ]
                    }
                    return prevent
                })
            }

            if (error.response.data.message) {
                setErrorsUser((prevent) => {
                    if (!errorsUser.includes(error.response.data.message)) {
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
        errorsUser,
        setErrorsUser,
        responseMessageUser,
        roles,
        getUsers
    }

    return (
        <UserContext.Provider value={allMethods}>
            {children}
        </UserContext.Provider>
    )
}