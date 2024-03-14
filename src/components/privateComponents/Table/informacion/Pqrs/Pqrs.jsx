import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import Swal from 'sweetalert2'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useMediaQuery } from '@mui/material';


import SendIcon from '@mui/icons-material/Send';

function Pqrs() {

    const isSmallScreen = useMediaQuery('(max-width: 500px)');


    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        {
            field: "nombre",
            headerName: "Nombre",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "apellido",
            headerName: "Apellido",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "tipo",
            headerName: "Tipo",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "reminente",
            headerName: "Reminente",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "correo",
            headerName: "Correo",
            width: 250,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "numeroContacto",
            headerName: "Numero de Contacto",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "mensaje",
            headerName: "Mensaje",
            width: 300,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "estado",
            headerName: "Estado",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "createdAt",
            headerName: "Fecha de Creación",
            width: 150,
            headerAlign: "center",
            align: "center",
            cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY"),
        }
    ];

    const [rows, setRows] = useState([]);

    const endPoint = "https://sena-project.onrender.com/api/v1/informacion/pqrs";

    const getData = async () => {
        const response = await axios.get(endPoint);
        setRows(response.data.data);
    };

    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <div style={{ height: 400, width: '100%', marginTop: '-200px' }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    style={{ textAlign: 'center', marginBottom: '30px', }}
                >
                </Grid>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    pageSizeOptions={[5, 10, 25, 100]}
                    disablePageSizeSelector
                    editMode='row'
                    hideFooterSelectedRowCount
                    ignoreDiacritics
                    disableColumnSelector
                    disableDensitySelector
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: "id", sort: "asc" }],
                        },
                    }}
                    scrollbarSize={10}
                    scrollbarColor="#000"
                    scrollbarTrackColor="#ccc"
                    scrollbarThumbColor="#ff0000"
                    style={{ color: "var(--black)", border: "1px solid var(--black)" }}
                    sx={{
                        "..MuiDataGrid": {
                            borderRadius: 0
                        },
                        ".MuiDataGrid-toolbarContainer": {
                            background: "var(--black-background)",
                            color: "var(--white)",
                        },
                        ".MuiInputBase-root": {
                            color: "var(--white)",
                        },
                        ".MuiDataGrid-columnHeader": {
                            background: "var(--black-background)",
                            color: "var(--white)",
                            borderRadius: 0
                        },
                        ".MuiToolbar-root": {
                            background: "var(--black-background)",
                            color: "var(--white)",
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center'
                        },
                        '.MuiTablePagination-actions': {
                            color: "var(--white)",
                        },
                        '.MuiTablePagination-selectLabel': {
                            color: "var(--white)",
                            marginTop: '14px',
                            textAlign: 'center'
                        },
                        '.MuiTablePagination-displayedRows': {
                            color: "var(--white)",
                            marginTop: '14px',
                        },
                        '.MuiDataGrid-footerContainer': {
                            background: "var(--black-background)",
                            color: "var(--white)",
                            textAlign: 'center'
                        },
                        "& .MuiDataGrid-row:hover": {
                            backgroundColor: "var(--hover)",
                            color: "#000",
                            fontWeight: "500",
                            transition: "all 0.3s ease-in-out",
                        },
                    }}
                />
            </div>
        </>
    );
}

export default Pqrs;
