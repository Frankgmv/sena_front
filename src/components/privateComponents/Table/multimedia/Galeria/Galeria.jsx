import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import Swal from 'sweetalert2'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useMediaQuery } from '@mui/material';


import { BsTrash3 } from "react-icons/bs";
import { FiEdit2, FiEye } from "react-icons/fi";
import SendIcon from '@mui/icons-material/Send';
import { useGaleriaContext } from "../../../../../context/GaleriaContext";
import { useUserContext } from "../../../../../context/UserContext";
import { formateFecha } from "../../../../../assets/includes/funciones";
import { useEventContext } from "../../../../../context/EventContext";
import toastr from "../../../../../assets/includes/Toastr";
import { getLocalStorage, setLocalStorage } from "../../../../../assets/includes/localStorage";
import { MOSTRAR_ARCHIVO } from "../../../../../assets/includes/variables";

function Galeria() {

    const isSmallScreen = useMediaQuery('(max-width: 700px)');
    const { galeria, errorsData, responseMessageData, getGaleria, postGaleria, deleteGaleria, putGaleria } = useGaleriaContext()

    const { usuarios } = useUserContext()
    const { eventos } = useEventContext()

    const [evento, setEvento] = useState('')
    const [titulo, setTitulo] = useState('')
    const [imagen, setImagen] = useState('')

    const [eventoUpt, setEventoUpt] = useState('')
    const [tituloUpt, setTituloUpt] = useState('')
    const [imagenUpt, setImagenUpt] = useState('')

    const [eventoView, setEventoView] = useState('')
    const [tituloView, setTituloView] = useState('')
    const [imagenView, setImagenView] = useState('')

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
            const responseMessageData2 = [...deleteDuplicidad]
            responseMessageData2.map(msg => {
                toastr.success(msg)
            })
            handleCloseNew()
            resetNew()
        }
    }, [responseMessageData])

    const resetNew = () => {
        setImagen('')
        setEvento('')
        setTitulo('')
    }

    const columns = [
        {
            field: "actions",
            headerName: "Acciones",
            width: 250,
            renderCell: (params) => (
                <div
                    style={{
                        textAlign: "center",
                    }}>
                    <Tooltip title="Ver">
                        <Button>
                            <FiEye
                                onClick={() => {
                                    handleOpenView()
                                    setLocalStorage('verImagenId', params.row.id)
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
                    <Tooltip title="Editar">
                        <Button>
                            <FiEdit2
                                onClick={() => {
                                    handleOpenEdit()
                                    setLocalStorage('editGaleriaId', params.row.id)
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
                                    setLocalStorage('deleteGaleriaId', params.row.id)
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
            width: 250,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "Evento",
            headerName: "Evento",
            width: 200,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "Creador",
            headerName: "Creador",
            width: 200,
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
            field: "imgPath",
            headerName: "Imagen",
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

    const [openView, setOpenView] = useState(false);
    const handleOpenView = () => setOpenView(true);
    const handleCloseView = () => setOpenView(false);

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
                let id = getLocalStorage('deleteGaleriaId')
                id = parseInt(id)
                deleteGaleria(id)
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


    const getDataEditGaleria = async () => {
        let id = getLocalStorage('editGaleriaId')
        id = parseInt(id)

        const dataGaleria = await getGaleria(id)
        if (dataGaleria.ok) {
            let dt = dataGaleria.data
            setEventoUpt(dt.EventoId)
            setTituloUpt(dt.titulo)
            setImagenUpt(dt.imgPath)
        }
    }

    const getViewEditGaleria = async () => {
        let id = getLocalStorage('verImagenId')
        id = parseInt(id)
        const dataGaleria = await getGaleria(id)
        if (dataGaleria.ok) {
            let dt = dataGaleria.data
            setEventoView(dt.EventoId)
            setTituloView(dt.titulo)
            setImagenView(dt.imgPath)
        }
    }

    useEffect(() => {
        if (openView) {
            getViewEditGaleria()
        } else {
            setEventoView('')
            setTituloView('')
            setImagenView('')
        }
    }, [openView])

    useEffect(() => {
        if (openEdit) {
            getDataEditGaleria()
        }
    }, [openEdit])

    const submitFormNew = (e) => {
        e.preventDefault()
        const dataGaleria = new FormData(e.currentTarget)
        postGaleria(dataGaleria)
    }

    const submitUpdate = (event) => {
        event.preventDefault()
        const formularioDataUpdate = new FormData(event.currentTarget);
        setOpenEdit(false);
        const idItem = parseInt(getLocalStorage('editGaleriaId'));
        putGaleria(idItem, formularioDataUpdate);
    };

    return (
        <>
            <div style={{ height: isSmallScreen ? '80%' : '70%', width: isSmallScreen ? '100%' : '92%', marginTop: '-100px' }}>
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
                    rows={galeria.map(imagen => {
                        for (let user of usuarios) {
                            if (user.id === imagen.UsuarioId) {
                                return { ...imagen, Creador: `${user.nombre} ${user.apellido}` }
                            }
                        }
                        return imagen
                    }).map(imagen => {
                        for (let evento of eventos) {
                            if (evento.id === imagen.EventoId) {
                                return { ...imagen, Evento: evento.evento }
                            }
                        }
                        return imagen
                    }).map(imagen => {
                        const createdAt = formateFecha(imagen.createdAt);
                        return { ...imagen, createdAt }
                    }).map(item => {
                        if (item.imgPath) return { ...item, imgPath: 'Imagen' }
                        return { ...item, imgPath: 'No Imagen' }
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
                        onSubmit={submitFormNew}
                    >
                        <h1 style={{ textAlign: 'center' }}>Crea una Galeria</h1>
                        <Grid container spacing={2}>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="titulo"
                                    label="Titulo"
                                    variant="standard"
                                    type="text"
                                    name="titulo"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="imgPath"
                                    label="Imagen"
                                    variant="standard"
                                    type="File"
                                    name="imagen"
                                    value={imagen}
                                    onChange={(e) => setImagen(e.target.value)}
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <FormControl variant="standard" sx={{ width: '90%' }}>
                                    <InputLabel id="evento">Evento</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Evento"
                                        name="EventoId"
                                        value={evento}
                                        onChange={(e) => setEvento(e.target.value)}
                                    >
                                        {
                                            eventos.map((evento, i) => {
                                                return (
                                                    <MenuItem value={evento.id} key={i}>{evento.evento}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" color="success" type="submit" style={{ marginTop: '20px', color: 'white' }} fullWidth>
                                    Guardar
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" color="error" onClick={handleCloseNew} style={{ marginTop: '20px', color: 'white' }} fullWidth>
                                    Cerrar
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
            </div>
            <div>
                {/* //! Modal Ver */}
                <Modal
                    open={openView}
                    onClose={handleCloseView}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{ ...style, width: isSmallScreen ? '100%' : '50%', }}
                        component="form"
                        id="crear"
                        noValidate
                        autoComplete="off"
                    >
                        <h1 style={{ textAlign: 'center' }}>{tituloView}</h1>
                        <Grid container style={{ maxWidth: isSmallScreen ? '100%' : '600px', height: isSmallScreen ? '100%' : '460px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={MOSTRAR_ARCHIVO(imagenView)} style={{ width: '100%', height: '100%', objectFit: 'cover', marginLeft: isSmallScreen ? 10 : 100 }} alt={imagenView} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="error" onClick={handleCloseView} style={{ marginTop: '20px', color: 'white' }} fullWidth>
                                Cerrar
                            </Button>
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
                        onSubmit={submitUpdate}
                        autoComplete="off"
                    >
                        <h1 style={{ textAlign: 'center' }}>Actualizar Imagen</h1>
                        <Grid container spacing={2} sx={{ width: '100%' }}>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="titulo"
                                    label="Titulo"
                                    variant="standard"
                                    type="text"
                                    name="titulo"
                                    value={tituloUpt}
                                    onChange={(e) => setTituloUpt(e.target.value)}
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="imgPath"
                                    label="Imagen"
                                    variant="standard"
                                    type="File"
                                    name="imagen"
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <FormControl variant="standard" sx={{ width: '90%' }}>
                                    <InputLabel id="evento">Evento</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Evento"
                                        name="EventoId"
                                        value={eventoUpt}
                                        onChange={(e) => setEventoUpt(e.target.value)}
                                    >
                                        {
                                            eventos.map((evento, i) => {
                                                return (
                                                    <MenuItem value={evento.id} key={i}>{evento.evento}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    style={{ marginTop: '20px', color: 'white' }}
                                    type="submit"
                                    fullWidth
                                >
                                    Actualizar
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" color="error" onClick={handleCloseEdit} style={{ marginTop: '20px', color: 'white' }} fullWidth>
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

export default Galeria;
