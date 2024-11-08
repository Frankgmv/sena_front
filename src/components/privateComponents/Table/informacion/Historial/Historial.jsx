import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { useEffect } from "react";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { formateFecha } from "../../../../../assets/includes/funciones";
import toastr from "../../../../../assets/includes/Toastr";
import BotonExcel from "../../../../publicComponents/botones/BotonExcel/BotonExcel";
import { useDataContext } from "../../../../../context/migration/DataContext";
import { useInfoContext } from "../../../../../context/migration/InfoContext";

function Historial() {

    const isSmallScreen = useMediaQuery('(max-width: 700px)');
<<<<<<< HEAD
    const { historial, getHistorial, deleteAllHistorial, responseMessage } = useGeneralContext()
    const { usuarios, getUsers } = useUserContext()

    useEffect(() =>{
        getUsers()
        getHistorial()
=======
    const { usuarios, getUsers } = useDataContext()
    const { historial, getHistorial, deleteAllHistorial, errorsI, successI } = useInfoContext()

    useEffect(() =>{
        if(usuarios.length == 0) getUsers()
        if(historial.length == 0) getHistorial()
>>>>>>> improve_response
    }, [])
    
    useEffect(() => {
        if (errorsI.length != 0) {
            errorsI.map(msg => {
                toastr.error(msg)
            })
        }
        if (successI.length != 0) {
            successI.map(msg => {
                toastr.success(msg)
            })
        }

<<<<<<< HEAD
    }, [responseMessage])
=======
    }, [successI, errorsI])
>>>>>>> improve_response


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
                    style={{ textAlign: 'center', marginBottom: '15px', }}
                >
                    <BotonExcel data={historial} />
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    style={{ textAlign: 'center' }}
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
                        '.MuiDataGrid-icon': {
                            color: 'white',
                        },
                        '.MuiSvgIcon-root': {
                            color: 'white',
                        },
                        '.MuiTablePagination-actions .MuiIconButton-root': {
                            color: 'white',
                        }
                    }}
                />
            </div>
        </>
    );
}

export default Historial;
