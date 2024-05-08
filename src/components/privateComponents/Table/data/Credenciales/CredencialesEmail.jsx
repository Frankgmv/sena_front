import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useMediaQuery } from '@mui/material';
import { FiEdit2 } from "react-icons/fi";
import { getLocalStorage, setLocalStorage } from "../../../../../assets/includes/localStorage";
import { useCredentialContext } from "../../../../../context/AuthContext";
import toastr from "../../../../../assets/includes/Toastr";
import { useGeneralContext } from "../../../../../context/GeneralContext";
import { formateFecha } from "../../../../../assets/includes/funciones";

const CredencialesEmail = () => {
    const isSmallScreen = useMediaQuery('(max-width: 700px)');
    const { responseMessage: response, errors, credencialesEmail, getCredencialesEmail, putCredencialesEmail} = useGeneralContext()

    const [correo, setCorreo] = useState('')
    const [clave, setClave] = useState('')

    useEffect(() => {
        if (response.length != 0) {
            response.map(msg => {
                toastr.success(msg)
            })
        }
    }, [response])

    useEffect(() => {
        if (errors.length != 0) {
            const deleteDuplicidad = new Set(errors);
            const errors2 = [...deleteDuplicidad]
            errors2.map(msg => {
                toastr.error(msg)
            })
        }
    }, [errors])

    useEffect(() => {
        getCredencialesEmail()
    }, [])

    const columns = [
        {
            field: "actions",
            headerName: "Acciones",
            width: 120,
            renderCell: (params) => (
                <div
                    style={{ textAlign: "center" }}>
                    <Tooltip title="Editar">
                        <Button>
                            <FiEdit2
                                onClick={() => {
                                    handleOpenEdit()
                                    setLocalStorage('editCredentialId', params.row.id)
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
            field: "correo",
            headerName: "Correo",
            width: 220,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "clave",
            headerName: "Clave Terceros",
            width: 160,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "updatedAt",
            headerName: "Ultima actualización",
            width: 160,
            headerAlign: "center",
            align: "center",
        }   
    ];

    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    useEffect(() => {
        if (openEdit) {
            setCorreo(credencialesEmail[0].correo)
            setClave(credencialesEmail[0].clave)
        }
    }, [openEdit])


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

    const handleEditCredential = (event) => {
        event.preventDefault()
        let idCredencial = parseInt(getLocalStorage('editCredentialId'))
        let data = {correo, clave}
        setOpenEdit(false)
        putCredencialesEmail(idCredencial, data)

    }

    return (
        <>
            <div style={{ height: isSmallScreen ? '90%' : '70%', width: isSmallScreen ? '100%' : '40%', }}>
                <DataGrid
                    rows={credencialesEmail.map(credencial => {
                        return { ...credencial, updatedAt: formateFecha(credencial.updatedAt) }
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
                        onSubmit={handleEditCredential}
                    >
                        <h1 style={{ textAlign: 'center' }}>Credenciales de envios</h1>
                        <Grid container spacing={2} sx={{ width: '100%' }}>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="Correo"
                                    label="Correo"
                                    variant="standard"
                                    fullWidth
                                    type="text"
                                    value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="Clave Terceros"
                                    label="Clave Terceros"
                                    variant="standard"
                                    value={clave}
                                    type="text"
                                    fullWidth
                                onChange={(e) => setClave(e.target.value)}
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
        </>
    );
}

export default CredencialesEmail;
