import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Button, Grid, TextField, Tooltip } from "@mui/material";
import Swal from 'sweetalert2'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useMediaQuery } from '@mui/material';
import toastr from "../../../../../assets/includes/Toastr";


import { BsTrash3 } from "react-icons/bs";
import { FiEdit2, FiEye } from "react-icons/fi";
import SendIcon from '@mui/icons-material/Send';
import { useNoticiaContext } from "../../../../../context/NoticiaContext";
import { useUserContext } from "../../../../../context/UserContext";
import { getLocalStorage, setLocalStorage } from "../../../../../assets/includes/localStorage";
import { formateFecha } from "../../../../../assets/includes/funciones";
import { MOSTRAR_ARCHIVO } from "../../../../../assets/includes/variables";

function Noticias() {

    const isSmallScreen = useMediaQuery('(max-width: 700px)');
    const { noticias, getNoticia, getNoticias, postNoticia, errorsData, responseMessageData, deleteNoticia, putNoticia } = useNoticiaContext()
    const { usuarios } = useUserContext()

    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [imagen, setImagen] = useState('')
    const [encabezado, setEncabezado] = useState('')

    const [tituloUpt, setTituloUpt] = useState('')
    const [descripcionUpt, setDescripcionUpt] = useState('')
    const [imagenUpt, setImagenUpt] = useState('')
    const [encabezadoUpt, setEncabezadoUpt] = useState('')

    const [tituloView, setTituloView] = useState('')
    const [descripcionView, setDescripcionView] = useState('')
    const [imagenView, setImagenView] = useState('')
    const [encabezadoView, setEncabezadoView] = useState('')

    const [openView, setOpenView] = useState(false);
    const handleOpenView = () => setOpenView(true);
    const handleCloseView = () => setOpenView(false);

    const getViewNoticia = async () => {
        let id = getLocalStorage('verNoticiaId')
        id = parseInt(id)
        const dataNotice = await getNoticia(id)
        if (dataNotice.ok) {
            let dt = dataNotice.data
            setTituloView(dt.titulo)
            setDescripcionView(dt.descripcion)
            setImagenView(dt.imgPath)
            setEncabezadoView(dt.encabezado)
        }
    }

    useEffect(() => {
        if (openView) {
            getViewNoticia()
        } else {
            setTituloView('')
            setDescripcionView('')
            setImagenView('')
            setEncabezadoView('')
        }
    }, [openView])

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
            responseMessageData.map(msg => {
                toastr.success(msg)
            })
            getNoticias();
            setOpenNew(false);
        }

    }, [responseMessageData])

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
                                    setLocalStorage('verNoticiaId', params.row.id)
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
                                    setLocalStorage('editNoticiaId', params.row.id)
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
                                    setLocalStorage('deleteNoticiaId', params.row.id)
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
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "encabezado",
            headerName: "Encabezado",
            width: 250,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "descripcion",
            headerName: "Descripcion",
            width: 350,
            headerAlign: "center",
            align: "center"
        },
        {
            field: "imgPath",
            headerName: "Imagen",
            width: 100,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "estado",
            headerName: "Estado",
            width: 100,
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
            field: "Creador",
            headerName: "Creador",
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
        textAlign: 'center',
        border: 'none'
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
                let id = getLocalStorage('deleteNoticiaId')
                id = parseFloat(id)
                deleteNoticia(id)
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

    const getDataEditNoticia = async () => {
        let id = getLocalStorage('editNoticiaId')
        id = parseInt(id)

        const dataNoticia = await getNoticia(id)
        if (dataNoticia.ok) {
            let dt = dataNoticia.data
            setTituloUpt(dt.titulo)
            setEncabezadoUpt(dt.encabezado)
            setDescripcionUpt(dt.descripcion)
        }
    }

    useEffect(() => {
        if (openEdit) {
            getDataEditNoticia()
        }
    }, [openEdit])

    const submitFormCreateNoticia = (e) => {
        e.preventDefault()
        const dataNoticia = new FormData(e.currentTarget)
        postNoticia(dataNoticia)
    }

    const submitUpdate = (event) => {
        event.preventDefault()
        const formularioDataUpdate = new FormData(event.currentTarget);
        setOpenEdit(false);
        const idItem = parseInt(getLocalStorage('editNoticiaId'));
        putNoticia(idItem, formularioDataUpdate);
    };

    return (
        <>
            <div style={{ height: isSmallScreen ? '80%' : '70%', width: isSmallScreen ? '100%' : '99%', marginTop: '-100px' }}>
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
                    rows={noticias.map(noticia => {
                        for (let user of usuarios) {
                            if (user.id === noticia.UsuarioId) {
                                return { ...noticia, Creador: `${user.nombre} ${user.apellido}` }
                            }
                        }
                        return noticia
                    }).map(noticia => {
                        if (noticia.imgPath) return { ...noticia, imgPath: 'Imagen' }
                        return { ...noticia, imgPath: 'No Imagen' }
                    }).map(noticia => {
                        if (noticia.estado) return { ...noticia, estado: 'Activo' }
                        return { ...noticia, estado: 'Inactivo' }
                    }).map(noticia => {
                        const createdAt = formateFecha(noticia.createdAt);
                        return { ...noticia, createdAt }
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
                        id="crearNoticia"
                        noValidate
                        autoComplete="off"
                        onSubmit={submitFormCreateNoticia}
                    >
                        <h1 style={{ textAlign: 'center' }}>Crea un nueva noticia</h1>
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
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="encabezado"
                                    label="Encabezado (Opcional)"
                                    variant="standard"
                                    type="text"
                                    name="encabezado"
                                    value={encabezado}
                                    onChange={(e) => setEncabezado(e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="descripcion"
                                    label="Descripcion"
                                    variant="standard"
                                    type="text"
                                    name="descripcion"
                                    value={descripcion}
                                    onChange={e => setDescripcion(e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="imagen"
                                    label="Imagen"
                                    variant="standard"
                                    type="file"
                                    name="imagen"
                                    value={imagen}
                                    onChange={e => setImagen(e.target.value)}
                                    fullWidth
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
                        onSubmit={submitUpdate}
                    >
                        <h1 style={{ textAlign: 'center' }}>Actualizar noticia</h1>
                        <Grid container spacing={2}>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="titulo"
                                    label="Titulo"
                                    variant="standard"
                                    type="text"
                                    name="titulo"
                                    value={tituloUpt}
                                    fullWidth
                                    onChange={(e) => setTituloUpt(e.target.value)}
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="encabezado"
                                    label="Encabezado (Opcional)"
                                    variant="standard"
                                    type="text"
                                    name="encabezado"
                                    fullWidth
                                    value={encabezadoUpt}
                                    onChange={(e) => setEncabezadoUpt(e.target.value)}
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="descripcion"
                                    label="Descripcion"
                                    variant="standard"
                                    type="text"
                                    name="descripcion"
                                    fullWidth
                                    value={descripcionUpt}
                                    onChange={e => setDescripcionUpt(e.target.value)}
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="imagen"
                                    label="Imagen"
                                    variant="standard"
                                    type="file"
                                    name="imagen"
                                    value={imagenUpt}
                                    fullWidth
                                    onChange={e => setImagenUpt(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    style={{ marginTop: '20px', color: '#fff' }}
                                    fullWidth
                                    type="submit"
                                >
                                    Actualizar
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" color="error" onClick={handleCloseEdit} fullWidth style={{ marginTop: '20px', color: '#fff' }}>
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
                        <h2 style={{ textAlign: 'center' }}>{tituloView}</h2>
                        <Grid container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', flexGrow: '1', padding: '5px' }}>
                            <h5>{encabezadoView}</h5>
                            <p>{descripcionView}</p>
                        </Grid>
                        <Grid container style={{ display: imagenView ? 'none' : 'none', maxWidth: isSmallScreen ? '100%' : '600px', height: isSmallScreen ? '100%' : '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={MOSTRAR_ARCHIVO(imagenView)} style={{ display: imagenView ? '' : 'none', width: '100%', height: '100%', objectFit: 'cover', marginLeft: isSmallScreen ? 10 : 66 }} alt={imagenView} />
                            <h3 style={{ display: imagenView ? 'none' : '', textAlign: 'center' }}>No hay imagen</h3>
                        </Grid>
                        <Grid item xs={12}>
                                <Button variant="contained" color="error" onClick={handleCloseView} fullWidth style={{ marginTop: '20px', color: '#fff' }}>
                                    Cerrar
                                </Button>
                            </Grid>
                    </Box>
                </Modal>
            </div>
        </>
    );
}

export default Noticias;
