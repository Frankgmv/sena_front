import Table from '../Table/Table'
import dayjs from "dayjs";
import data from '../../../../assets/data/users.json'

function UsersList() {

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
            <Table data={data} columns={columns} />
        </div>
    );
}

export default UsersList;
