import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import Swal from 'sweetalert2'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useMediaQuery } from '@mui/material';


import { BsTrash3 } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import SendIcon from '@mui/icons-material/Send';
import { useLinkContext } from "../../../../../context/LinkContext";
import { getLocalStorage, setLocalStorage } from "../../../../../assets/includes/localStorage";
import toastr from "../../../../../assets/includes/Toastr";
import { useGeneralContext } from "../../../../../context/GeneralContext";
import { useUserContext } from "../../../../../context/UserContext";
import { formateFecha } from "../../../../../assets/includes/funciones";

function Links() {

    const isSmallScreen = useMediaQuery('(max-width: 700px)');
    const { links, errorsData, responseMessageData, getLink, getLinks, postLink, putLink, deleteLink } = useLinkContext()
    const { secciones, categorias } = useGeneralContext()
    const { usuarios } = useUserContext()
    const [formLink, setFormLink] = useState({
        CategoriaId: 9,
        SeccionId: 16,
        link: '',
        descripcion: '',
        tipo: 'pdf',
        titulo: ''
    })
    const [formLinkUpt, setFormLinkUpt] = useState({
        CategoriaId: 1,
        SeccionId: 1,
        link: '',
        descripcion: '',
        tipo: 'pdf',
        titulo: ''
    })

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
            getLinks();
            setOpenNew(false);
            setFormLink({
                CategoriaId: 1,
                SeccionId: 1,
                link: '',
                descripcion: '',
                tipo: 'pdf',
                titulo: ''
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
                                    handleOpenEdit()
                                    setLocalStorage('editLinkId', params.row.id)
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
                                    setLocalStorage('deleteLinkId', params.row.id)
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
            field: "descripcion",
            headerName: "Descripcion",
            width: 290,
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
            field: "UsuarioId",
            headerName: "Id del Usuario",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "Creador",
            headerName: "Creador",
            width: 250,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "SeccionId",
            headerName: "Seccion",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "CategoriaId",
            headerName: "Categoria",
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
                let id = parseInt(getLocalStorage('deleteLinkId'))
                deleteLink(id)
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

    const handlerChangeCreate = (e) => {
        let { name, value } = e.target
        setFormLink(prevent => {
            if (name == 'CategoriaId' || name == 'SeccionId') {
                return {
                    ...prevent,
                    [name]: parseInt(value)
                }
            }
            return {
                ...prevent,
                [name]: value
            }
        })
    }

    const handlerChangeUpt = (e) => {
        let { name, value } = e.target
        setFormLinkUpt(prevent => {
            if (name == 'CategoriaId' || name == 'SeccionId') {
                return {
                    ...prevent,
                    [name]: parseInt(value)
                }
            }
            return {
                ...prevent,
                [name]: value
            }
        })
    }

    const getDataEditLink = async () => {
        let id = getLocalStorage('editLinkId')
        id = parseInt(id)

        const dataLink = await getLink(id)
        if (dataLink.ok) {
            let dt = dataLink.data
            setFormLinkUpt({
                CategoriaId: dt.CategoriaId,
                SeccionId: dt.SeccionId,
                link: dt.link,
                descripcion: dt.descripcion ? dt.descripcion : '',
                tipo: dt.tipo,
                titulo: dt.titulo
            })
        }
    }

    useEffect(() => {
        if (openEdit) {
            getDataEditLink()
        }
    }, [openEdit])

    const submitFormCreateLink = (e) => {
        e.preventDefault()
        postLink(formLink)
    }

    const submitUpdate = (event) => {
        event.preventDefault()
        setOpenEdit(false);
        let id = parseInt(getLocalStorage('editLinkId'));
        putLink(id, formLinkUpt);
    };


    return (
        <>
            <div style={{ height:'80%', width: '100%', marginTop: '-100px' }}>
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
                    rows={links.map(link => {
                        for (let user of usuarios) {
                            if (user.id === link.UsuarioId) {
                                return { ...link, Creador: `${user.nombre} ${user.apellido}` }
                            }
                        }
                        return link
                    }).map(link => {
                        const createdAt = formateFecha(link.createdAt);
                        return { ...link, createdAt }
                    }).map(link => {
                        for (let seccion of secciones) {
                            if (seccion.id === link.SeccionId) {
                                return { ...link, SeccionId: seccion.seccion }
                            }
                        }
                        return link
                    }).map(link => {
                        for (let categoria of categorias) {
                            if (categoria.id === link.CategoriaId) {
                                return { ...link, CategoriaId: categoria.categoria }
                            }
                        }
                        return link
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
                        id="crearUsuario"
                        noValidate
                        autoComplete="off"
                        onSubmit={submitFormCreateLink}
                    >
                        <h1 style={{ textAlign: 'center' }}>Crea nuevo Link</h1>
                        <Grid container spacing={2} sx={{ width: '100%' }}>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="titulo"
                                    label="Titulo"
                                    variant="standard"
                                    type="text"
                                    name="titulo"
                                    value={formLink.titulo}
                                    onChange={handlerChangeCreate}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="link"
                                    label="Link"
                                    variant="standard"
                                    type="text"
                                    name="link"
                                    value={formLink.link}
                                    onChange={handlerChangeCreate}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <FormControl variant="standard" sx={{ width: '90%' }}>
                                    <InputLabel id="tipo">Tipo</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Tipo"
                                        name="tipo"
                                        value={formLink.tipo}
                                        onChange={handlerChangeCreate}
                                        fullWidth
                                    >
                                        <MenuItem value='pdf'>PDF</MenuItem>
                                        <MenuItem value='blog'>Blog</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="descripcion"
                                    label="Descripción (PDF)"
                                    variant="standard"
                                    type="text"
                                    name="descripcion"
                                    value={formLink.descripcion}
                                    onChange={handlerChangeCreate}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <FormControl variant="standard" sx={{ width: '90%' }}>
                                    <InputLabel id="estado">Sección</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Seccion"
                                        name="SeccionId"
                                        value={formLink.SeccionId}
                                        fullWidth
                                        onChange={handlerChangeCreate}
                                    >
                                        {
                                            secciones.map((seccion, i) => {
                                                const mostrar = seccion.seccionKey === 'S_PLAT_ACADEMICAS' || seccion.seccionKey === 'ARCHIVO_PDF'
                                                return (
                                                    <MenuItem value={seccion.id} hidden={!mostrar} key={i}>{seccion.seccion}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <FormControl variant="standard" sx={{ width: '90%' }}>
                                    <InputLabel id="estado">Categoria</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Categoria"
                                        name="CategoriaId"
                                        fullWidth
                                        value={formLink.CategoriaId}
                                        onChange={handlerChangeCreate}
                                    >
                                        {
                                            categorias.map((categoria, i) => {
                                                return (
                                                    <MenuItem value={categoria.id} key={i}>{categoria.categoria}</MenuItem>
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
                        <h1 style={{ textAlign: 'center' }}>Actualizar link</h1>
                        <Grid container spacing={2} sx={{ width: '100%' }}>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="titulo"
                                    label="Titulo"
                                    variant="standard"
                                    type="text"
                                    name="titulo"
                                    fullWidth
                                    value={formLinkUpt.titulo}
                                    onChange={handlerChangeUpt}
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="link"
                                    label="Link"
                                    variant="standard"
                                    type="text"
                                    fullWidth
                                    name="link"
                                    value={formLinkUpt.link}
                                    onChange={handlerChangeUpt}

                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <FormControl variant="standard" sx={{ width: '90%' }}>
                                    <InputLabel id="tipo">Tipo</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Tipo"
                                        name="tipo"
                                        value={formLinkUpt.tipo}
                                        fullWidth
                                        onChange={handlerChangeUpt}
                                    >
                                        <MenuItem value='pdf'>PDF</MenuItem>
                                        <MenuItem value='blog'>Blog</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="descripcion"
                                    label="Descripción (PDF)"
                                    variant="standard"
                                    type="text"
                                    name="descripcion"
                                    value={formLinkUpt.descripcion}
                                    fullWidth
                                    onChange={handlerChangeUpt}

                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <FormControl variant="standard" sx={{ width: '90%' }}>
                                    <InputLabel id="seccionId">Sección</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="SeccionId"
                                        name="SeccionId"
                                        value={formLinkUpt.SeccionId}
                                        onChange={handlerChangeUpt}
                                    >
                                        {
                                            secciones.map((seccion, i) => {
                                                const mostrar = seccion.seccionKey === 'S_PLAT_ACADEMICAS' || seccion.seccionKey === 'ARCHIVO_PDF'
                                                return (
                                                    <MenuItem value={seccion.id} hidden={!mostrar} key={i}>{seccion.seccion}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <FormControl variant="standard" sx={{ width: '90%' }}>
                                    <InputLabel id="estado">Categoria</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Categoria"
                                        name="CategoriaId"
                                        value={formLinkUpt.CategoriaId}
                                        onChange={handlerChangeUpt}
                                    >
                                        {
                                            categorias.map((categoria, i) => {
                                                return (
                                                    <MenuItem value={categoria.id} key={i}>{categoria.categoria}</MenuItem>
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

export default Links;
