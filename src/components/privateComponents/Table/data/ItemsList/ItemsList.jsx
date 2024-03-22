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
import { useItemContext } from "../../../../../context/ItemsContext";
import { useUserContext } from "../../../../../context/UserContext";
import { formateFecha } from "../../../../../assets/includes/funciones";
import toastr from '../../../../../assets/includes/Toastr'
import { getLocalStorage, setLocalStorage } from "../../../../../assets/includes/localStorage";
import { MOSTRAR_ARCHIVO } from "../../../../../assets/includes/variables";

function ItemList() {

    const isSmallScreen = useMediaQuery('(max-width: 700px)');

    const { items, postItem, errorsData, responseMessageData, getItems, deleteItem, getItem, putItem } = useItemContext()
    const { usuarios } = useUserContext()

    const [estado, setEstado] = useState(true)

    const [estadoUpt, setEstadoUpt] = useState(false)
    const [linkUpt, setLinkUpt] = useState('')
    const [tituloUpt, setTituloUpt] = useState('')

    const [estadoView, setEstadoView] = useState(false)
    const [linkView, setLinkView] = useState('')
    const [tituloView, setTituloView] = useState('')
    const [imagenView, setImagenView] = useState('')

    const [openView, setOpenView] = useState(false);
    const handleOpenView = () => setOpenView(true);
    const handleCloseView = () => setOpenView(false);

    const getViewItem = async () => {
        let id = getLocalStorage('verItemId')
        id = parseInt(id)
        const dataItem = await getItem(id)
        if (dataItem.ok) {
            let dt = dataItem.data
            setEstadoView(dt.estado)
            setLinkView(dt.link)
            setTituloView(dt.titulo)
            setImagenView(dt.imgPath)
        }
    }

    useEffect(() => {
        if (openView) {
            getViewItem()
        } else {
            setEstadoView('')
            setLinkView('')
            setTituloView('')
            setImagenView('')
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
            getItems();
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
                                    setLocalStorage('verItemId', params.row.id)
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
                                    setLocalStorage('editItemId', params.row.id)
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
                                    setLocalStorage('deleteItemId', params.row.id)
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
            width: 180,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "link",
            headerName: "Link",
            width: 280,
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
            field: "estado",
            headerName: "Estado",
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
        textAlign: 'center'
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
                let id = getLocalStorage('deleteItemId')
                id = parseInt(id)
                deleteItem(id)
                swalWithBootstrapButtons.fire({
                    title: "Borrado!",
                    text: "Tu archivo se ha borrado.",
                    icon: "success"
                });
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

    const getDataEditItem = async () => {
        let id = getLocalStorage('editItemId')
        id = parseInt(id)

        const dataItem = await getItem(id)
        if (dataItem.ok) {
            let dt = dataItem.data
            setEstadoUpt(dt.estado)
            setLinkUpt(dt.link)
            setTituloUpt(dt.titulo)
        }
    }

    useEffect(() => {
        if (openEdit) {
            getDataEditItem()
        }
    }, [openEdit])

    const submitFormCreateItem = (e) => {
        e.preventDefault()
        const dataItem = new FormData(e.currentTarget)
        postItem(dataItem)
    }

    const submitUpdate = (event) => {
        event.preventDefault()
        const formularioDataUpdate = new FormData(event.currentTarget);
        setOpenEdit(false);
        const idItem = parseInt(getLocalStorage('editItemId'));
        putItem(idItem, formularioDataUpdate);
    };


    return (
        <>
            <div style={{ height: isSmallScreen ? '80%' : '70%', width: isSmallScreen ? '100%' : '96%', marginTop: '-100px' }}>
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
                    rows={items.map(item => {
                        for (let user of usuarios) {
                            if (user.id === item.UsuarioId) {
                                return { ...item, Creador: `${user.nombre} ${user.apellido}` }
                            }
                        }
                        return item
                    }).map(item => {
                        if (item.imgPath) return { ...item, imgPath: 'Imagen' }
                        return { ...item, imgPath: 'No Imagen' }
                    }).map(item => {
                        if (item.estado) return { ...item, estado: 'Activo' }
                        return { ...item, estado: 'Inactivo' }
                    }).map(item => {
                        const createdAt = formateFecha(item.createdAt);
                        return { ...item, createdAt }
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
                        onSubmit={submitFormCreateItem}
                    >
                        <h1 style={{ textAlign: 'center' }}>Crea un nuevo Item</h1>
                        <Grid container spacing={2}>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="titulo"
                                    label="Titulo"
                                    variant="standard"
                                    type="text"
                                    name="titulo"
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
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="imgPath"
                                    label="Imagen"
                                    variant="standard"
                                    type="file"
                                    name="imagen"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <FormControl variant="standard" sx={{ width: '90%' }}>
                                    <InputLabel id="estado">Estado</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        name="estado"
                                        value={estado}
                                        label="Estado"
                                        fullWidth
                                        onChange={(e) => setEstado(e.target.value)}
                                    >
                                        <MenuItem value={false}>Inactivo</MenuItem>
                                        <MenuItem value={true}>activo</MenuItem>
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
                    <Box sx={{ ...style, width: isSmallScreen ? '100%' : '46%' }}
                        component="form"
                        id="crear"
                        noValidate
                        autoComplete="off"
                    >
                        <h1 style={{ textAlign: 'center' }}>{tituloView}</h1>
                        <span style={{ textAlign: 'center' }}><small style={{ fontSize: '1.2em' }}><a href={linkView} target="_blank" style={{ textDecoration: 'none' }}>{linkView}</a> </small></span>
                        <Grid container style={{ maxWidth: isSmallScreen ? '100%' : '600px', height: isSmallScreen ? '100%' : '380px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={MOSTRAR_ARCHIVO(imagenView)} style={{ width: '100%', height: '100%', objectFit: 'cover', border: '2px solid var(--black)' }} alt={imagenView}  />
                        </Grid>
                        <span style={{ textAlign: 'center' }}><small style={{ fontSize: '1.2em' }}>Esta {estadoView ? ' Activo' : ' Inactivo'}</small></span>
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
                        <h1 style={{ textAlign: 'center' }}>Actualizar Item</h1>
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
                                    value={linkUpt}
                                    onChange={(e) => setLinkUpt(e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="imgPath"
                                    label="Imagen"
                                    variant="standard"
                                    name="imagen"
                                    type="file"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <FormControl variant="standard" sx={{ width: '90%' }}>
                                    <InputLabel id="estado">Estado</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Estado"
                                        name="estado"
                                        value={estadoUpt}
                                        onChange={(e) => setEstadoUpt(e.target.value)}
                                        fullWidth
                                    >
                                        <MenuItem value={estadoUpt}>{estadoUpt ? 'Activo' : 'Inactivo'}</MenuItem>
                                        <MenuItem value={!estadoUpt}>{!estadoUpt ? 'Activo' : 'Inactivo'}</MenuItem>
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

export default ItemList;
