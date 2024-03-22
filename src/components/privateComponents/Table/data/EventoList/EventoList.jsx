import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import { Button, Grid, TextField, Tooltip } from "@mui/material";
import Swal from 'sweetalert2'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useMediaQuery } from '@mui/material';
import toastr from "../../../../../assets/includes/Toastr";

import { BsTrash3 } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import SendIcon from '@mui/icons-material/Send';
import { getLocalStorage, setLocalStorage } from "../../../../../assets/includes/localStorage";
import { useEventContext } from "../../../../../context/EventContext";
import { formateFecha, formateFechaGuion, getTodayDate } from "../../../../../assets/includes/funciones";

function EventoList() {

    const isSmallScreen = useMediaQuery('(max-width: 700px)');
    const [fechaEventCreate, setFechaEventCreate] = useState(getTodayDate())
    const [nameEvento, setNameEvento] = useState('')
    const { eventos, createEvento, responseMessage, errors, getEventos, deleteEvento, getEvento, putEvento } = useEventContext()
    const [fechaupt, setFechaUpt] = useState('')
    const [eventoUpt, setEventoUpt] = useState('')

    useEffect(() => {
        if (errors.length != 0) {
            const deleteDuplicidad = new Set(errors);
            const errors2 = [...deleteDuplicidad]
            errors2.map(error => {
                return toastr.error(error)
            })
        }
    }, [errors]);

    useEffect(() => {
        if (responseMessage.length != 0) {
            responseMessage.map(msg => {
                toastr.success(msg)
            })
        }
        getEventos()
    }, [responseMessage])



    const columns = [
        {
            field: "actions",
            headerName: "Acciones",
            headerAlign: "center",
            align: "center",
            width: 150,
            renderCell: (params) => (
                <div>
                    <Tooltip title="Editar">
                        <Button>
                            <FiEdit2
                                onClick={() => {
                                    handleOpenEdit()
                                    setLocalStorage('idEventedit', params.row.id)
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
                                    showSwal()
                                    setLocalStorage('idEventDelete', params.row.id)
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
            field: "evento",
            headerName: "Evento",
            width: 240,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "fecha",
            headerName: "Fecha",
            width: 250,
            headerAlign: "center",
            align: "center",
        },
    ];

    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const [openNew, setOpenNew] = useState(false);
    const handleOpenNew = () => setOpenNew(true);
    const handleCloseNew = () => setOpenNew(false);

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

    const showSwal = () => {
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

                let idEventDelete = getLocalStorage('idEventDelete')
                idEventDelete = parseInt(idEventDelete)
                deleteEvento(idEventDelete)
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

    useEffect(() => {
        if (openEdit) {
            let idEventEdit = getLocalStorage('idEventedit')
            idEventEdit = parseInt(idEventEdit)
            getDataEventUpt(idEventEdit)
        }
    }, [openEdit])

    const getDataEventUpt = async (idEventEdit) => {
        const eventData = await getEvento(idEventEdit)
        let fechaNueva = formateFechaGuion(eventData.fecha)
        setFechaUpt(fechaNueva)
        setEventoUpt(eventData.evento)
    }

    const submitFormCreate = (e) => {
        e.preventDefault()
        const dataEvento = { evento: nameEvento, fecha: fechaEventCreate }
        createEvento(dataEvento)
        getEventos()
        handleCloseNew()
        setNameEvento('')
    }
    const handleSubmitEditar = (e) => {
        e.preventDefault()
        const dataEvento = { evento: eventoUpt, fecha: fechaupt }
        let idEventEdit = getLocalStorage('idEventedit')
        idEventEdit = parseInt(idEventEdit)
        putEvento(idEventEdit, dataEvento)
        getEventos()
        handleCloseEdit()
        setEventoUpt('')
        setFechaUpt('')
    }




    return (
        <>
            <div style={{ height: isSmallScreen ? '80%' : '75%', width: isSmallScreen ? '100%' : '45%', marginTop: '-100px' }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    style={{ textAlign: 'center', marginBottom: '30px', }}
                >
                    <Button
                        variant="contained"
                        color="success"
                        endIcon={<SendIcon />}
                        onClick={handleOpenNew}
                    >
                        Añadir
                    </Button>
                </Grid>
                <DataGrid
                    rows={eventos.map(event => {
                        const fecha = formateFechaGuion(event.fecha);
                        return { ...event, fecha }
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
            <div>
                {/* //! Modal Crear */}
                <Modal
                    open={openNew}
                    onClose={handleCloseNew}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}
                        component="form"
                        id="crear"
                        noValidate
                        autoComplete="off"
                        onSubmit={submitFormCreate}
                    >
                        <h1 style={{ textAlign: 'center' }}>Crea un nuevo Evento</h1>
                        <Grid container spacing={1}>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="evento"
                                    label="Evento"
                                    variant="standard"
                                    type="text"
                                    fullWidth
                                    value={nameEvento}
                                    onChange={(e) => setNameEvento(e.target.value)}
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="fecha"
                                    label="Fecha"
                                    variant="standard"
                                    value={fechaEventCreate}
                                    type="date"
                                    fullWidth
                                    onChange={(e) => setFechaEventCreate(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" color="success" type="submit" fullWidth style={{ color: '#fff' }}>
                                    Guardar
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" color="error" onClick={handleCloseNew} fullWidth style={{ color: '#fff' }}>
                                    Cerrar
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
            </div>
            {/* //! Modal Editar */}
            <div>
                <Modal
                    open={openEdit}
                    onClose={handleCloseEdit}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}
                        component="form"
                        id="editarUsuario"
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmitEditar}
                    >
                        <h1 style={{ textAlign: 'center' }}>Actualizar evento</h1>
                        <Grid container spacing={2} sx={{ width: '100%' }}>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="evento"
                                    label="Evento"
                                    variant="standard"
                                    fullWidth
                                    type="text"
                                    value={eventoUpt}
                                    onChange={(e) => setEventoUpt(e.target.value)}
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="fecha"
                                    label="Fecha"
                                    variant="standard"
                                    value={fechaupt}
                                    type="date"
                                    fullWidth
                                    onChange={(e) => setFechaUpt(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    style={{ color: '#fff' }}
                                    fullWidth
                                    type="submit"
                                >
                                    Actualizar
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" color="error" onClick={handleCloseEdit} fullWidth style={{ color: '#fff' }}>
                                    Cerrar
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
            </div>
        </>
    );
}

export default EventoList;
