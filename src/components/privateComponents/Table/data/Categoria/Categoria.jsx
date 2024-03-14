import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import Swal from 'sweetalert2'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useMediaQuery } from '@mui/material';


import { BsTrash3 } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import SendIcon from '@mui/icons-material/Send';

function Categoria() {

    const isSmallScreen = useMediaQuery('(max-width: 500px)');


    const columns = [
        {
            field: "actions",
            headerName: "Acciones",
            width: 150,
            renderCell: () => (
                <div
                    style={{
                        textAlign: "center",
                    }}>
                    <Tooltip title="Editar">
                        <Button>
                            <FiEdit2
                                onClick={handleOpenEdit}
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
                                onClick={showSwal}
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
        { field: "id", headerName: "ID", width: 100 },
        {
            field: "categoria",
            headerName: "Categoria",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "categoriaKey",
            headerName: "Codigo de la Categoría",
            width: 300,
            headerAlign: "center",
            align: "center",
        },
    ];

    const [rows, setRows] = useState([]);

    const endPoint = "https://sena-project.onrender.com/api/v1/data/categorias";

    const getData = async () => {
        const response = await axios.get(endPoint);
        setRows(response.data.data);
    };

    useEffect(() => {
        getData();
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
        width: 600,
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
            <div style={{ height: 400, width: '47%', marginTop: '-200px' }}>
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
                    rows={rows}
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
                    >
                        <h1 style={{ textAlign: 'center' }}>Crea un nueva Categoria</h1>
                        <Grid container spacing={2}>
                        <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="categoria"
                                    label="Categoria"
                                    variant="standard"
                                    fullWidth
                                    type="text"
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="categoriaKey"
                                    label="Codigo de la Categoria"
                                    variant="standard"
                                    fullWidth
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="success" type="submit" fullWidth>
                                    Guardar
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
                    >
                        <h1 style={{ textAlign: 'center' }}>Actualiza tus datos</h1>
                        <Grid container spacing={2} sx={{ width: '100%' }}>
                        <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="categoria"
                                    label="Categoria"
                                    variant="standard"
                                    fullWidth
                                    type="text"
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="categoriaKey"
                                    label="Codigo de la Categoria"
                                    variant="standard"
                                    fullWidth
                                    type="text"
                                />
                            </Grid>
                            <Button
                                variant="contained"
                                color="success"
                                style={{ marginTop: '20px' }}
                                fullWidth
                                type="submit"
                            >
                                Actualizar
                            </Button>
                        </Grid>
                    </Box>
                </Modal>
            </div>
        </>
    );
}

export default Categoria;
