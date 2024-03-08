import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import Swal from 'sweetalert2'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


import { BsTrash3 } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { VscCheckAll, VscMail } from "react-icons/vsc";
import { PiPasswordThin, PiUserPlusLight } from "react-icons/pi";
import { IoPhonePortraitOutline } from "react-icons/io5";

function RolList() {


    const [showPasswordInput, setShowPasswordInput] = useState(false);

    const [rol, setRol] = useState('');

  const handleChange = (event) => {
    setRol(event.target.value);
  };


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
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "rol",
            headerName: "Rol",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "rolKey",
            headerName: "Indicador de Rol",
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
    ];

    const [rows, setRows] = useState([]);

    const endPoint = "https://sena-project.onrender.com/api/v1/data/roles";

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
            <div style={{ height: 400, width: 692 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    pageSizeOptions={[5, 10, 25, 100]}
                    disablePageSizeSelector
                    editMode='row'
                    hideFooterSelectedRowCount
                    ignoreDiacritics
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
                        ".MuiDataGrid-columnHeader": {
                            background: "var(--black-background)",
                            color: "var(--white)",
                        },
                        '.MuiTablePagination-actions': {
                            color: "var(--white)",
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
                <Modal
                    open={openEdit}
                    onClose={handleCloseEdit}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}
                        component="form"
                        noValidate
                        autoComplete="off"
                    >
                        <h1 style={{ textAlign: 'center' }} >Actualiza tus datos</h1>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="center"
                        >
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 210 }}>
                                <InputLabel id="rol">Rol</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={rol}
                                    onChange={handleChange}
                                    label="Age"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>Estudiante Especial</MenuItem>
                                    <MenuItem value={2}>Docente</MenuItem>
                                    <MenuItem value={3}>Personal Administrativo</MenuItem>
                                    <MenuItem value={3}>Coordinador</MenuItem>
                                    <MenuItem value={5} disabled>Web Master</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant="standard">
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', }}>
                                    <VscCheckAll 
                                        sx={{ color: 'action.active', mr: 1, fontSize: '40px' }}
                                        style={{ marginBottom: '10', marginRight: '10' }}
                                    />
                                    <TextField id="status" label="Estado" variant="standard" />
                                </Box>
                            </FormControl>
                            <FormControl variant="standard">
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', }}>
                                <PiUserPlusLight 
                                        sx={{ color: 'action.active', mr: 1, fontSize: '40px' }}
                                        style={{ marginBottom: '10', marginRight: '10' }}
                                    />
                                    <TextField id="nombre" label="Nombre" variant="standard" />
                                </Box>
                            </FormControl>
                            <FormControl variant="standard">
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', }}>
                                    <PiUserPlusLight 
                                        sx={{ color: 'action.active', mr: 1, fontSize: '40px' }}
                                        style={{ marginBottom: '10', marginRight: '10' }}
                                    />
                                    <TextField id="apellido" label="Apellido" variant="standard" />
                                </Box>
                            </FormControl>
                            <FormControl variant="standard">
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', }}>
                                    <VscMail
                                        sx={{ color: 'action.active', mr: 1, fontSize: '40px' }}
                                        style={{ marginBottom: '10', marginRight: '10' }}
                                    />
                                    <TextField id="correo" label="Correo" variant="standard" />
                                </Box>
                            </FormControl>
                            <FormControl variant="standard">
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', }}>
                                    <IoPhonePortraitOutline
                                        sx={{ color: 'action.active', mr: 1, fontSize: '40px' }}
                                        style={{ marginBottom: '10', marginRight: '10' }}
                                    />
                                    <TextField id="celular" label="Celular" variant="standard" />
                                </Box>
                            </FormControl>

                            {/* //! Esconder Cambiar contraseña */}

                            <Grid
                                container
                                direction="column"
                                justifyContent="space-evenly"
                                alignItems="center"
                            >
                                <FormControlLabel
                                    style={{ textAlign: 'center', marginTop: '20px' }}
                                    control={<Checkbox checked={showPasswordInput} onChange={() => setShowPasswordInput(!showPasswordInput)} />}
                                    label="Cambiar Contraseña"
                                />
                                {showPasswordInput && (
                                    <FormControl variant="standard">
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end', }} style={{ marginBottom: '20px' }}>
                                            <PiPasswordThin
                                                sx={{ color: 'action.active', mr: 1, fontSize: '40px' }}
                                                style={{ marginBottom: '10', marginRight: '10' }}
                                            />
                                            <TextField
                                                id="password"
                                                label="Contraseña"
                                                variant="standard"
                                                type="password" />

                                            <PiPasswordThin
                                                sx={{ color: 'action.active', mr: 1, fontSize: '40px' }}
                                                style={{ marginBottom: '10', marginRight: '10' }}
                                            />
                                            <TextField
                                                id="password"
                                                label="Repetir Contraseña"
                                                variant="standard"
                                                type="password" />
                                        </Box>
                                    </FormControl>
                                )}
                            </Grid>
                            <Button
                                variant="contained"
                                color="success"
                                style={{ marginTop: '20px' }}
                                fullWidth
                            >
                                Guardar
                            </Button>
                        </Grid>
                    </Box>
                </Modal>
            </div>
        </>
    );
}

export default RolList;
