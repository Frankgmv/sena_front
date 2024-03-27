import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { useEffect, useState } from "react";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { useGeneralContext } from "../../../../../context/GeneralContext";
import { useUserContext } from "../../../../../context/UserContext";
import { formateFecha } from "../../../../../assets/includes/funciones";
import toastr from "../../../../../assets/includes/Toastr";



function Historial() {

    const isSmallScreen = useMediaQuery('(max-width: 700px)');
    const { historial, deleteAllHistorial, responseMessage} = useGeneralContext()
    const { usuarios } = useUserContext()

    useEffect(() => {
        if (responseMessage.length != 0) {
            const deleteDuplicidad = new Set(responseMessage);
            const responseMessage2 = [...deleteDuplicidad]
            responseMessage2.map(msg => {
                toastr.success(msg)
            })
        }

    }, [responseMessage])
    const columns = [
        {
            field: "cambio",
            headerName: "Cambio",
            width: 250,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "descripcion",
            headerName: "Descipcion",
            width: 350,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "Creador",
            headerName: "Usuario de la acción",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "UsuarioId",
            headerName: "Id del Usuario",
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

    return (
        <>
            <div style={{ height: isSmallScreen ? '80%' : '70%', width: isSmallScreen ? '100%' : '67%', marginTop: '-100px' }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    style={{ textAlign: 'center'}}
                >
                    <Button
                        variant="contained"
                        color="warning"
                        endIcon={<RestoreFromTrashIcon />}
                        onClick={async (e) => await deleteAllHistorial()}
                    >
                        Limpiar Historial
                    </Button>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    style={{ textAlign: 'center', marginBottom: '30px', }}
                >
                </Grid>
                <DataGrid
                    rows={historial.map(historial => {
                        for (let user of usuarios) {
                            if (user.id === historial.UsuarioId) {
                                return { ...historial, Creador: `${user.nombre} ${user.apellido}` }
                            }
                        }
                        return historial
                    }).map(historial => {
                        const createdAt = formateFecha(historial.createdAt);
                        return { ...historial, createdAt }
                    })}
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

export default Historial;
