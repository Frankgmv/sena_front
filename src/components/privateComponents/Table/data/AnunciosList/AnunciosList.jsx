import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Button, Grid, InputLabel, FormControl, Select, TextField, Tooltip, MenuItem } from "@mui/material";
import Swal from 'sweetalert2'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import toastr from '../../../../../assets/includes/Toastr'
import { useMediaQuery } from '@mui/material';

import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../../../../../assets/includes/localStorage";
import { formateFecha } from "../../../../../assets/includes/funciones";
import { useCredentialContext } from "../../../../../context/AuthContext";

import { BsTrash3 } from "react-icons/bs";
import { FiEdit2, FiEye } from "react-icons/fi";
import SendIcon from '@mui/icons-material/Send';
import { useAnunciosContext } from "../../../../../context/AnunciosContext";
import { useGeneralContext } from "../../../../../context/GeneralContext";
import { useUserContext } from "../../../../../context/UserContext";
import { MOSTRAR_ARCHIVO } from "../../../../../assets/includes/variables";

function AnunciosList() {
    const { anuncios, getAnuncios, errorsData, responseMessageData, postAnuncio, getAnuncio, putAnuncio, deleteAnuncio } = useAnunciosContext();
    const { secciones } = useGeneralContext()
    const { usuarios } = useUserContext()
    const { roles } = useCredentialContext()

    const isSmallScreen = useMediaQuery('(max-width: 700px)');

    //  !Logica guardar 
    const [id, setId] = useState('')
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [imgPath, setImgPath] = useState('')
    const [UsuarioId, setUsuarioId] = useState('')
    const [SeccionId, setSeccionId] = useState('')

    const [tituloUpt, setTituloUpt] = useState('')
    const [descripcionUpt, setDescripcionUpt] = useState('')
    const [imgPathUpt, setImgPathUpt] = useState('')
    const [UsuarioIdUpt, setUsuarioIdUpt] = useState('')
    const [SeccionIdUpt, setSeccionIdUpt] = useState('')

    const submitUpdate = (event) => {
        event.preventDefault()
        const formularioDataUpdate = new FormData(event.currentTarget);
        setOpenEdit(false);
        const idAnuncio = parseInt(getLocalStorage('AnuncioIdEdit'));
        putAnuncio(idAnuncio, formularioDataUpdate);
    };

    const handleSubmitCreate = (e) => {
        e.preventDefault()
        const formularioData = new FormData(e.currentTarget);
        postAnuncio(formularioData)
    }
    const resetForm = () => {
        setId('');
        setTitulo('');
        setDescripcion('');
        setImgPath('');
        setUsuarioId('');
        setSeccionId('');
    }

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
            getAnuncios();
            setOpenNew(false);
            resetForm();
        }

    }, [responseMessageData])

    const navegarAAnuncio = (anuncioId) => {
        setLocalStorage('AnuncioIdEdit', anuncioId)
    }

    const deleteUse = (anuncioId) => {
        setLocalStorage('AnuncioIdDelete', anuncioId)
    }

    const [tituloView, setTituloView] = useState('')
    const [imagenView, setImagenView] = useState('')
    const [descripcionView, setDescripcionView] = useState('')

    const [openView, setOpenView] = useState(false);
    const handleOpenView = () => setOpenView(true);
    const handleCloseView = () => setOpenView(false);

    const getViewAnuncio = async () => {
        let id = getLocalStorage('verAnuncioId')
        id = parseInt(id)
        const dataAnuncio = await getAnuncio(id)
        if (dataAnuncio.ok) {
            let dt = dataAnuncio.data
            setTituloView(dt.titulo)
            setImagenView(dt.imgPath)
            setDescripcionView(dt.descripcion)
        }
    }

    useEffect(() => {
        if (openView) {
            getViewAnuncio()
        } else {
            setTituloView('')
            setImagenView('')
            setDescripcionView('')
        }
    }, [openView])

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
                                    setLocalStorage('verAnuncioId', params.row.id)
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
                                    navegarAAnuncio(params.row.id)
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
                                    deleteUse(params.row.id)
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
            field: "descripcion",
            headerName: "Descripcion",
            width: 450,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "imgPath",
            headerName: "Imagen",
            width: 100,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "UsuarioId",
            headerName: "Usuario Id",
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
            field: "SeccionId",
            headerName: "Sección",
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

    useEffect(() => {
        getAnuncios();
    }, []);

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
        bgcolor: 'background.paper',
        border: '2px solid #000',
        width: isSmallScreen ? '100%' : '50%',
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

                let id = parseInt(getLocalStorage('AnuncioIdDelete'))
                id = parseInt(id)
                deleteAnuncio(id)
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "Acción cancelada",
                    icon: "error"
                });
            }
            removeLocalStorage('AnuncioIdDelete')
        });
    }

    const buscarAnuncio = async () => {
        const idAnuncio = parseInt(getLocalStorage('AnuncioIdEdit'));
        const anuncio = await getAnuncio(idAnuncio);
        if (!anuncio.ok || !idAnuncio) {
            setOpenEdit(false)
        } else {
            let { descripcion, titulo, imgPath, UsuarioId, SeccionId } = anuncio.data
            setDescripcionUpt(descripcion)
            setTituloUpt(titulo)
            setImgPathUpt(imgPath),
                setUsuarioIdUpt(UsuarioId)
            setSeccionIdUpt(SeccionId)
        }
    }

    useEffect(() => {
        if (openEdit) {
            buscarAnuncio()
        }
    }, [openEdit])

    return (
        <>
            <div style={{ height: isSmallScreen ? '70%' : '80%', width: isSmallScreen ? '100%' : '66%', marginTop: isSmallScreen ? '-10%' : '-5%' }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    style={{ textAlign: 'center', marginBottom: '10px', }}
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
                    rows={anuncios.map((anuncio) => {
                        if (anuncio.estado) return { ...anuncio, estado: 'activo' }
                        return { ...anuncio, estado: 'inactivo' }
                    }).map(anuncio => {
                        for (let rol of roles) {
                            if (rol.id === anuncio.RolId) {
                                return { ...anuncio, RolId: rol.rol }
                            }
                        }
                        return anuncio
                    }).map(anuncio => {
                        const createdAt = formateFecha(anuncio.createdAt);
                        return { ...anuncio, createdAt }
                    }).map(anuncio => {
                        for (let seccion of secciones) {
                            if (seccion.id === anuncio.SeccionId) {
                                return { ...anuncio, SeccionId: seccion.seccion }
                            }
                        }
                        return anuncio
                    }).map(anuncio => {
                        for (let user of usuarios) {
                            if (user.id === anuncio.UsuarioId) {
                                return { ...anuncio, Creador: `${user.nombre} ${user.apellido}` }
                            }
                        }
                        return anuncio
                    }).map(anuncio => {
                        if (anuncio.imgPath) return { ...anuncio, imgPath: 'Imagen' }
                        return { ...anuncio, imgPath: 'No Imagen' }
                    })}
                    columns={columns}
                    pageSize={5}
                    pageSizeOptions={[5, 10, 25, 100]}
                    disablePageSizeSelector
                    editMode='row'
                    hideFooterSelectedRowCount
                    ignoreDiacritic
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
                        id="crearData"
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmitCreate}
                    >
                        <h1 style={{ textAlign: 'center' }}>Crea un nuevo Registro</h1>
                        <Grid container spacing={2}>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <InputLabel id="titulo">Titulo</InputLabel>
                                <TextField
                                    sx={{ width: '90%' }}
                                    id="titulo"
                                    name="titulo"
                                    variant="standard"
                                    value={titulo}
                                    type="text"
                                    onChange={(e) => setTitulo(e.target.value)}
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    sx={{ width: '90%' }}
                                    id="descripcion"
                                    name="descripcion"
                                    label="Descripcion"
                                    variant="standard"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}

                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    sx={{ width: '90%' }}
                                    id="imagen"
                                    label="imagen"
                                    variant="standard"
                                    type="file"
                                    name="imagen"
                                    value={imgPath}
                                    onChange={(e) => setImgPath(e.target.value)}
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <FormControl variant="standard" sx={{ width: '90%' }}>
                                    <InputLabel id="SeccionId">Sección</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="SeccionId"
                                        name="SeccionId"
                                        value={SeccionId}
                                        onChange={(e) => setSeccionId(e.target.value)}
                                    >
                                        {
                                            secciones.map((seccion, i) => {
                                                const mostrar = seccion.seccionKey === 'S_PLAT_ACADEMICAS' || seccion.seccionKey === 'ARCHIVO_PDF'
                                                return (
                                                    <MenuItem value={seccion.id} hidden={mostrar} key={i}>{seccion.seccion}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" color="success" style={{ color: '#fff' }} type="submit" fullWidth>
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
                        id="editarData"
                        noValidate
                        autoComplete="off"
                        onSubmit={submitUpdate}
                    >
                        <h1 style={{ textAlign: 'center' }}>Actualizar Registros</h1>
                        <Grid container spacing={2} sx={{ width: '100%' }}>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField sx={{ width: '90%' }} id="titulo" name="titulo" value={tituloUpt} onChange={(e) => setTituloUpt(e.target.value)} label="Titulo" variant="standard" />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField sx={{ width: '90%' }} id="Apellido" name="descripcion" value={descripcionUpt} onChange={(e) => setDescripcionUpt(e.target.value)} label="Descripción" variant="standard" />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField sx={{ width: '90%' }} id="imagen" name="imagen" onChange={(e) => setImgPath(e.target.value)} label="Imagen" variant="standard" type="file" />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <FormControl variant="standard" sx={{ width: '90%' }}>
                                    <InputLabel id="SeccionId">Sección</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="SeccionId"
                                        name="SeccionId"
                                        value={SeccionIdUpt}
                                        onChange={(e) => setSeccionId(e.target.value)}
                                    >
                                        {
                                            secciones.map((seccion, i) => {
                                                const isSelect = seccion.id === SeccionIdUpt
                                                const mostrar = seccion.seccionKey === 'S_PLAT_ACADEMICAS' || seccion.seccionKey === 'ARCHIVO_PDF'
                                                return (
                                                    <MenuItem style={{ color: isSelect ? 'red' : '' }} hidden={mostrar} value={seccion.id} key={i}>{seccion.seccion}{isSelect ? <>&nbsp;Por defecto</> : ''}</MenuItem>
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
                                    type="submit"
                                    style={{ color: '#fff' }}
                                    fullWidth
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
                        <Grid container style={{ display: 'flex', justifyContent: 'space-evenly', flexGrow: '1', padding: '5px' }}>
                            <p>{descripcionView}</p>
                        </Grid>
                        <Grid container style={{ display: imagenView ? 'none' : 'none', maxWidth: isSmallScreen ? '100%' : '600px', height: isSmallScreen ? '100%' : '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={MOSTRAR_ARCHIVO(imagenView)} style={{ display: imagenView ? '' : 'none', width: '100%', height: '100%', objectFit: 'cover', border: '2px solid var(--black)', justifyContent: 'center', alignItems: 'center', marginLeft: isSmallScreen ? 10 : 66 }} alt={imagenView} />
                            <h3 style={{ display: imagenView ? 'none' : '', textAlign: 'center' }}>No hay imagen</h3>
                        </Grid>
                        <Grid item xs={12}>
                                <Button variant="contained" color="error" onClick={handleCloseView}  style={{ color: '#fff', marginTop: '5%' }} fullWidth>
                                    Cerrar
                                </Button>
                            </Grid>
                    </Box>
                </Modal>
            </div>
        </>
    );
}

export default AnunciosList;
