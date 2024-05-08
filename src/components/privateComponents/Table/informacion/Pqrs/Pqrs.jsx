import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect } from "react";
import { Button, Grid, Tooltip} from "@mui/material";
import Swal from 'sweetalert2'
import { useMediaQuery } from '@mui/material';
import { usePqrsContext } from "../../../../../context/PqrsContext";
import { FiEdit2 } from "react-icons/fi";
import { BsTrash3 } from "react-icons/bs";
import { getLocalStorage, setLocalStorage } from "../../../../../assets/includes/localStorage";
import toastr from "../../../../../assets/includes/Toastr";
import { formateFecha } from "../../../../../assets/includes/funciones";

function Pqrs() {
    const isSmallScreen = useMediaQuery('(max-width: 700px)');
    const { pqrs, errorsData, responseMessageData, putPqrs, deletePqrs } = usePqrsContext()


    useEffect(() => {
        if (errorsData.length != 0) {
            const deleteDuplicidad = new Set(errorsData);
            const errorsData2 = [...deleteDuplicidad]
            errorsData2.map(error => {
                return toastr.error(error)
            })
        }
    }, [errorsData]);

    useEffect(() => {
        if (responseMessageData.length != 0) {
            const deleteDuplicidad = new Set(responseMessageData);
            const responseMessage2 = [...deleteDuplicidad]
            responseMessage2.map(msg => {
                toastr.success(msg)
            })
        }
    }, [responseMessageData])

    const columns = [
        {
            field: "actions",
            headerName: "Acciones",
            width: 150,
            renderCell: (params) => (
                <div
                    style={{
                        textAlign: "center",
                    }}>
                    <Tooltip title="Editar">
                        <Button>
                            <FiEdit2
                                onClick={() => {
                                    showSwalRead()
                                    setLocalStorage('editPQRSId', params.row.id)
                                }}
                                style={{
                                    textAlign: "center",
                                    fontSize: "20px",
                                    borderRadius: "5px",
                                    color: "#000",
                                }}
                            />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <Button>
                            <BsTrash3
                                onClick={() => {
                                    showSwalDelete()
                                    setLocalStorage('deletePQRSId', params.row.id)
                                }}
                                style={{
                                    textAlign: "center",
                                    fontSize: "20px",
                                    borderRadius: "5px",
                                    color: "#000",
                                }}
                            />
                        </Button>
                    </Tooltip>
                </div>
            ),
        },
        {
            field: "estado",
            headerName: "Estado",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
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
            field: "remitente",
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
            wordWrap: true,
            renderCell: (params) => {

            }
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

    const showSwalDelete = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger me-4"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "¿Seguro que quieres borrarlo?",
            text: "No lo podras revertir",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, deseo borrarlo",
            cancelButtonText: "No, cancelar",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Borrado!",
                    text: "Tu archivo se ha borrado.",
                    icon: "success"
                });
                let id = getLocalStorage('deletePQRSId')
                id = parseInt(id)
                deletePqrs(id)
            }
        });
    }

    const showSwalRead = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger me-4"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Marcar como leido",
            text: "Una vez marcada como leida no podrás volver atrás",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Marcada como leida!",
                    text: "",
                    icon: "success"
                });
                let id = getLocalStorage('editPQRSId')
                id = parseInt(id)
                putPqrs(id, { estado: true })
            } else if (

                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "Acción cancelada",
                    icon: "error"
                });
            }
        });
    }

    return (
        <>
            <div style={{ height: isSmallScreen ? '90%' : '80%', width: '100%', marginTop: '-100px' }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    style={{ textAlign: 'center', marginBottom: '30px', }}
                >
                </Grid>
                <DataGrid
                    rows={pqrs.map(pqrs => {
                        return { ...pqrs, estado: pqrs.estado ? 'Leido' : 'No leido' }
                    }).map(pqrs => {
                        const createdAt = formateFecha(pqrs.createdAt);
                        return { ...pqrs, createdAt }
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

export default Pqrs;
