import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useMediaQuery } from '@mui/material';
import { FiEdit2 } from "react-icons/fi";
import { getLocalStorage, setLocalStorage } from "../../../../../assets/includes/localStorage";
import { useCredentialContext } from "../../../../../context/AuthContext";
import toastr from "../../../../../assets/includes/Toastr";
import { useGeneralContext } from "../../../../../context/GeneralContext";
import BotonExcel from "../../../../publicComponents/botones/BotonExcel/BotonExcel";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function RolList() {
    const isSmallScreen = useMediaQuery('(max-width: 700px)');
    const [rolUpt, setRolUpt] = useState('')
    const [estadoUpt, setEstadoUpt] = useState('')
    const [valueEdit, setValueEdit] = useState(true)

    const { roles, getRoles } = useCredentialContext()
    const { putRol, getRol, responseMessage: response, errors } = useGeneralContext()

    useEffect(() => {
        if (response.length != 0) {
            response.map(msg => {
                toastr.success(msg)
            })
        }
        getRoles()
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

    const columns = [
        {
            field: "actions",
            headerName: "Acciones",
            width: 120,
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
                                    setLocalStorage('editRol', params.row.id)
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
            field: "rol",
            headerName: "Rol",
            width: 220,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "estado",
            headerName: "Estado",
            width: 160,
            headerAlign: "center",
            align: "center",
        },
    ];

    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

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

    const getRolData = async () => {
        let idRol = getLocalStorage('editRol')
        idRol = parseInt(idRol)
        const rolData = await getRol(idRol)
        if (rolData.ok) {
            setEstadoUpt(rolData.data.estado)
            setValueEdit(rolData.data.estado)
            setRolUpt(rolData.data.rol)
        }
    }

    useEffect(() => {
        if (openEdit) {
            getRolData()
        }
    }, [openEdit])

    const handleEditRol = (event) => {
        event.preventDefault()
        let idRol = getLocalStorage('editRol')
        idRol = parseInt(idRol)
        putRol(idRol, valueEdit)
        setOpenEdit(false)
        getRoles()
    }

    const [loader, setLoader] = useState(false);

    const downloadPDF = () => {
        const capture = document.querySelector('.datagrid');
        setLoader(true);
        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL('img/png');
            const doc = new jsPDF('p', 'mm', 'a4');
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
            setLoader(false);
            doc.save('data.pdf');
        })
    }

    return (
        <>
            <div style={{ height: isSmallScreen ? '90%' : '70%', width: isSmallScreen ? '100%' : '35%',}}>
            <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    style={{ textAlign: 'center', marginBottom: '15px', }}
                >
                    <BotonExcel data={roles} />
                    <Button
                    variant='contained'
                    color="success"
                    className="receipt-modal-download-button"
                    onClick={downloadPDF}
                    disabled={!(loader === false)}
                >
                    {loader ? (
                        <span>Downloading</span>
                    ) : (
                        <span>Descargar PDF</span>
                    )}
                </Button>
                </Grid>
                <DataGrid
                    rows={roles.map(rol => {
                        if (rol.estado) return { ...rol, estado: 'Activo' }
                        return { ...rol, estado: 'Inactivo' }
                    })}
                    columns={columns}
                    pageSize={5}
                    pageSizeOptions={[5, 10, 25, 100]}
                    disablePageSizeSelector
                    editMode='row'
                    hideFooterSelectedRowCount
                    ignoreDiacritics
                    disableColumnSelector
                    className="datagrid"    
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
                        onSubmit={handleEditRol}
                    >
                        <h1 style={{ textAlign: 'center' }}>Actualizar {rolUpt}</h1>
                        <Grid container spacing={2} sx={{ width: '100%' }}>
                            <Grid item sx={{ width: '100%' }}>
                                <FormControl variant="standard" sx={{ width: '90%' }}>
                                    <InputLabel id="estado">Estado</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={valueEdit}
                                        label="Estado"
                                        name="estado"
                                        onChange={(e) => setValueEdit(e.target.value)}
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
                                style={{ marginTop: '20px', color:'#fff'}}
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

export default RolList;
