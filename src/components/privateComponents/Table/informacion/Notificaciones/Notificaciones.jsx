import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Button, Tooltip, useMediaQuery } from "@mui/material";
import Swal from 'sweetalert2'
import { BsTrash3 } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { getLocalStorage, setLocalStorage } from "../../../../../assets/includes/localStorage";
import toastr from "../../../../../assets/includes/Toastr";
import { formateFecha } from "../../../../../assets/includes/funciones";
import { useInfoContext } from "../../../../../context/migration/InfoContext";

function Notificacion() {
    const isSmallScreen = useMediaQuery('(max-width: 700px)');
<<<<<<< HEAD
    const { notificaciones, putNotificacion, deleteNotificacion, errorsData, responseMessageData, getNotificaciones} = useNotificacionContext()
=======
    const { notificaciones, putNotificacion, deleteNotificacion, errorsI, successI, getNotificaciones} = useInfoContext()
>>>>>>> improve_response

    useEffect(() => {
        if (errorsI.length != 0) {
            errorsI.map(error => {
                return toastr.error(error)
            })
        }

        if (successI.length != 0) {
            successI.map(msg => {
                toastr.success(msg)
            })
        }
<<<<<<< HEAD
    }, [responseMessageData])

    useEffect(() => {
        getNotificaciones()
=======
    }, [errorsI, successI]);

    useEffect(() => {
       if(notificaciones.length == 0) getNotificaciones()
>>>>>>> improve_response
    }, [])

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
                                onClick={() =>{
                                    showSwalRead()
                                    setLocalStorage('editNotificacionId', params.row.id)
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
                                onClick={()=>{
                                    showSwalDelete()
                                    setLocalStorage('deleteNotificacionId', params.row.id)
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
            field: "titulo",
            headerName: "Titulo",
            width: 170,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "descripcion",
            headerName: "Descripcion",
            width: 340,
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
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isSmallScreen ? '100%' : '50%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        alignItems: 'center',
    };

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
                let id = getLocalStorage('deleteNotificacionId')
                id = parseInt(id)
                deleteNotificacion(id)
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
                let id = getLocalStorage('editNotificacionId')
                id = parseInt(id)
                putNotificacion(id, {estado: true})
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
            <div style={{ height: isSmallScreen ? '90%' : '80%', width: isSmallScreen ? '100%' : '71%', marginTop: '-40px' }}>
                
                <DataGrid
                    rows={notificaciones.map(notif =>{
                        return{...notif, estado: notif.estado? 'Leida': 'No leida'}
                    }).map(notif => {
                        const createdAt = formateFecha(notif.createdAt);
                        return { ...notif, createdAt }
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

export default Notificacion;
