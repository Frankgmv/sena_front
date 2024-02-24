import { useEffect } from "react";
import { useUserContext } from "../../context/UserContext"
import { useCredentialContext } from "../../context/AuthContext"
import toastr from "../../assets/includes/Toastr";

const Test = () => {
    const { getUsers, errorsUser, responseMessageUser } = useUserContext()
    const { logout } = useCredentialContext()

    useEffect(() => {
        if (errorsUser.length != 0) {
            errorsUser.map(error => {
                return toastr.error(error)
            })
        }
    }, [errorsUser]);

    const users = (e) => {
        e.preventDefault()
        getUsers()
    }
    const cierre = (e) => {
        e.preventDefault()
        logout()
    }

    useEffect(() => {
        if (responseMessageUser.length != 0) {
            responseMessageUser.map(msg => {
                toastr.success(msg)
            })
        }
    }, [responseMessageUser]);
    return (
        <div style={{ display: "flex", gap: '20px', padding: '20px' }}>
            <div>
                <button onClick={users} style={{ padding: '15px', background: '#000', color: '#ffff' }}>Get Users</button>
                <button onClick={cierre} style={{ padding: '15px', background: '#000', color: '#fadc' }}>Logout</button>
            </div>
        </div>
    )
}

export default Test
