import Table from '../Table/Table'
import dayjs from "dayjs";
// import data from '../../../../assets/data/users.json'
// import baseURL from '../../../../api/instance'
import { useEffect, useState } from 'react';
import axios from 'axios';

function UsersList() {

    const [users, setUsers] = useState( [] )

    const endPoint = 'http://localhost:9000/api/v1/data/usuarios'

    const getData = async () =>{
        await axios.get(endPoint).then((response) =>{
            const data = response.data
            console.log(data);
            setUsers(data.data)
        })
    }

    useEffect( () =>{
        getData()
    }, [])

    const columns = [
        {
            header: "ID",
            accessorKey: "id",
        },
        {
            header: "Nombres",
            accessorKey: "nombre",
        },
        {
            header: "Apellido",
            accessorKey: "apellido",
        },
        {
            header: "Correo",
            accessorKey: "correo",
        },
        {
            header: "Número de Celular",
            accessorKey: "celular",
        },
        {
            header: "Estado",
            accessorKey: "estado",
        },
        {
            header: "Rol ID",
            accessorKey: "rolId",
        },
        {
            header: "Fecha de Nacimiento",
            accessorKey: "fechaNacimiento",
            cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY"),
        },
        {
            header: "Fecha de Creación",
            accessorKey: "fechaCreacion",
            cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY"),
        },
    ];

    return (
        <div>
            <Table data={users} columns={columns} />
        </div>
    );
}

export default UsersList;
