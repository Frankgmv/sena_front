import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Button, Grid, TextField, Tooltip } from "@mui/material";
import Swal from 'sweetalert2'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useMediaQuery } from '@mui/material';


import { BsTrash3 } from "react-icons/bs";
import { FiEdit2, FiEye } from "react-icons/fi";
import SendIcon from '@mui/icons-material/Send';
import { formateFecha } from "../../../../../assets/includes/funciones";
import toastr from "../../../../../assets/includes/Toastr";
import { getLocalStorage, setLocalStorage } from "../../../../../assets/includes/localStorage";
import { MOSTRAR_ARCHIVO } from "../../../../../assets/includes/variables";
import { useDataContext } from "../../../../../context/migration/DataContext";
import { useMultimediaContext } from "../../../../../context/migration/MultimediaContext";
import { useAuthContext } from "../../../../../context/migration/AuthContext";

function Videos() {

    const isSmallScreen = useMediaQuery('(max-width: 700px)');

    const { usuarios, getUsers} = useDataContext()
    const { videos, success, errorsR, putVideo, getVideo, postVideo, deleteVideo, getVideos } = useMultimediaContext()
    const { perfil } = useAuthContext()

    const [titulo, setTitulo] = useState('')
    const [link, setLink] = useState('')
    const [imagen, setImagen] = useState('')

    const [tituloView, setTituloView] = useState('')
    const [linkView, setLinkView] = useState('')
    const [imagenView, setImagenView] = useState('')

    const [tituloUpt, setTituloUpt] = useState('')
    const [linkUpt, setLinkUpt] = useState('')

    const [openView, setOpenView] = useState(false);
    const handleOpenView = () => setOpenView(true);
    const handleCloseView = () => setOpenView(false);

    const getViewEditGaleria = async () => {
        let id = getLocalStorage('verImagenVideoId')
        id = parseInt(id)
        const dataGaleria = await getVideo(id)
        if (dataGaleria.ok) {
            let dt = dataGaleria.data
            setTituloView(dt.titulo)
            setLinkView(dt.link)
            setImagenView(dt.imgPath)
        }
    }

    useEffect(() => {
        if(usuarios.length == 0) getUsers()
        if(videos.length == 0) getVideos()
    }, [])

    useEffect(() => {
        if (openView) {
            getViewEditGaleria()
        } else {
            setTituloView('')
            setLinkView('')
            setImagenView('')
        }
    }, [openView])

    useEffect(() => {
        if (errorsR.length != 0) {
            errorsR.map(error => {
                return toastr.error(error)
            })
        }

        if (success.length != 0) {
            success.map(msg => {
                toastr.success(msg)
            })
            handleCloseNew()
        }
    }, [errorsR, success])
    
    const columns = [
        {
            field: "actions",
            headerName: "Acciones",
            width: 250,
            renderCell: (params) => (
                <div
                    style={{
                        textAlign: "center"
                    }}>
                    <Tooltip title="Ver">
                        <Button>
                            <FiEye
                                onClick={() => {
                                    handleOpenView()
                                    setLocalStorage('verImagenVideoId', params.row.id)
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
                                    setLocalStorage('editVideoId', params.row.id)
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
                                    setLocalStorage('deleteVideoId', params.row.id)
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
            field: "link",
            headerName: "Link",
            width: 150,
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
                let id = getLocalStorage('deleteVideoId')
                id = parseFloat(id)
                deleteVideo(id, perfil?.id)
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
        let id = getLocalStorage('editVideoId')
        id = parseInt(id)

        const dataVideo = await getVideo(id)
        if (dataVideo.ok) {
            let dt = dataVideo.data
            setLinkUpt(dt.link)
            setTituloUpt(dt.titulo)
        }
    }

    useEffect(() => {
        if (openEdit) {
            getDataEditGaleria()
        }
    }, [openEdit])

    const submitFormNew = (e) => {
        e.preventDefault()
        const dataVideo = new FormData(e.currentTarget)
        postVideo(dataVideo, perfil?.id)
    }

    const submitUpdate = (event) => {
        event.preventDefault()
        const formularioDataUpdate = new FormData(event.currentTarget);
        setOpenEdit(false);
        const idItem = parseInt(getLocalStorage('editVideoId'));
        putVideo(idItem, formularioDataUpdate, perfil?.id);
    };

    return (
        <>
            <div style={{ height: isSmallScreen ? '80%' : '70%', width: isSmallScreen ? '100%' : '85%', marginTop: '-100px' }}>
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
                    rows={videos.map(imagen => {
                        for (let user of usuarios) {
                            if (user.id === imagen.UsuarioId) {
                                return { ...imagen, Creador: `${user.nombre} ${user.apellido}` }
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
                        <h1 style={{ textAlign: 'center' }}>Crea un nuevo Archivo</h1>
                        <Grid container spacing={2}>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="titulo"
                                    label="Titulo"
                                    variant="standard"
                                    type="text"
                                    fullWidth
                                    value={titulo}
                                    name="titulo"
                                    onChange={e => setTitulo(e.target.value)}
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="link"
                                    label="Link"
                                    variant="standard"
                                    type="text"
                                    value={link}
                                    multiline
                                    maxRows={6}
                                    fullWidth
                                    name="link"
                                    onChange={e => setLink(e.target.value)}
                                />
                            </Grid>
                            <Grid item sx={{ width: '100%' }}>
                                <TextField
                                    id="imgPath"
                                    label="Imagen"
                                    variant="standard"
                                    type="File"
                                    fullWidth
                                    name="imagen"
                                    value={imagen}
                                    onChange={e => setImagen(e.target.value)}
                                />
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
                    <Box sx={{ ...style, width: isSmallScreen ? '100%' : '50%', height: isSmallScreen ? '60%' : '500px' }}
                        component="div"
                        id="crear"
                        noValidate
                        autoComplete="off"
                    >
                        <h1 style={{ textAlign: 'center' }}>{tituloView}</h1>
                        <span style={{ textAlign: 'center' }}><small style={{ fontSize: '1.2em' }}><a href={linkView} target="_blank" style={{ textDecoration: 'none' }}>{linkView}</a> </small></span>
                        <Grid container style={{ maxWidth: isSmallScreen ? '100%' : '600px', height: isSmallScreen ? '200px' : '320px'}}>
                            <img src={MOSTRAR_ARCHIVO(imagenView)} style={{ display: imagenView ? '' : 'none', width: '100%', height: '100%', objectFit: 'cover'}} alt={imagenView} />
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
                        autoComplete="off"
                        onSubmit={submitUpdate}
                    >
                        <h1 style={{ textAlign: 'center' }}>Actualiza tus datos</h1>
                        <Grid container spacing={2} sx={{ width: '100%' }}>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="titulo"
                                    label="Titulo"
                                    variant="standard"
                                    type="text"
                                    name="titulo"
                                    fullWidth
                                    value={tituloUpt}
                                    onChange={e => setTituloUpt(e.target.value)}
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="link"
                                    label="Link"
                                    variant="standard"
                                    type="text"
                                    name="link"
                                    value={linkUpt}
                                    multiline
                                    maxRows={6}
                                    fullWidth
                                    onChange={e => setLinkUpt(e.target.value)}
                                />
                            </Grid>
                            <Grid item sx={{ width: '100%' }}>
                                <TextField
                                    id="imgPath"
                                    label="Imagen"
                                    variant="standard"
                                    type="File"
                                    fullWidth
                                    name="imagen"
                                />
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

export default Videos;
