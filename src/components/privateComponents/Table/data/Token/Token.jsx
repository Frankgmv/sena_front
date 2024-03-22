import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Button, Grid, TextField, Tooltip } from "@mui/material";
import Swal from 'sweetalert2'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useMediaQuery } from '@mui/material';

import { BsTrash3 } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { useTokenProvider } from "../../../../../context/TokenContext";
import { useUserContext } from "../../../../../context/UserContext";
import { formateFecha } from "../../../../../assets/includes/funciones";
import { getLocalStorage, setLocalStorage } from "../../../../../assets/includes/localStorage";
import toastr from "../../../../../assets/includes/Toastr";

function Token() {

    const isSmallScreen = useMediaQuery('(max-width: 700px)');
    const { tokens, deleteToken, errorsData, responseMessageData, getTokens, getToken, putToken } = useTokenProvider()
    const { usuarios } = useUserContext()
    const [formDataToken, setFormDataToken] = useState({
        token: '',
        nombre: '',
        tokenKey: '',
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
            getTokens();
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
                                    setLocalStorage('editTokenId', params.row.id)
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
                                    setLocalStorage('deleteTokenId', params.row.id)
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
            field: "nombre",
            headerName: "Nombre",
            width: 250,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "tokenKey",
            headerName: "Codigo del Token",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "Creador",
            headerName: "Creador",
            width: 230,
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
            width: 180,
            headerAlign: "center",
            align: "center",
            cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY")
        }
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
                const id = parseInt(getLocalStorage('deleteTokenId'))
                deleteToken(id)
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

    const handlerChangeUpt = (e) => {
        let { name, value } = e.target
        setFormDataToken(prevent => {
            return {
                ...prevent,
                [name]: value
            }
        })
    }

    const getDataEditToken = async () => {
        let id = getLocalStorage('editTokenId')
        id = parseInt(id)

        const dataToken = await getToken(id)
        if (dataToken.ok) {
            let dt = dataToken.data
            setFormDataToken(( prevent )=>{
                return{
                    ...prevent,
                    nombre: dt.nombre,
                    tokenKey: dt.tokenKey
                }
            })
        }
    }

    useEffect(() => {
        if (openEdit) {
            getDataEditToken()
        }
    }, [openEdit])

    const submitUpdate = (event) => {
        event.preventDefault()
        setOpenEdit(false);
        let id = parseInt(getLocalStorage('editTokenId'));
        putToken(id, formDataToken);
        setFormDataToken(( prevent )=>{
            return{
                ...prevent,
                token: '',
                nombre: '',
                tokenKey: ''
            }
        })
    };


     const generalStyle = { width: isSmallScreen ? '100%' : '50%', display: 'flex', justifyContent: 'center' }

    return (
        <>
            <div style={{ height: isSmallScreen ? '90%' : '90%', width: isSmallScreen ? '100%' : '66%'}}>
                <DataGrid
                    rows={tokens.map(token => {
                        for (let user of usuarios) {
                            if (user.id === token.UsuarioId) {
                                return { ...token, Creador: `${user.nombre} ${user.apellido}` }
                            }
                        }
                        return token
                    }).map(token => {
                        const createdAt = formateFecha(token.createdAt);
                        return { ...token, createdAt }
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
                        method="POST"
                        onSubmit={submitUpdate}
                    >
                        <h1 style={{ textAlign: 'center' }}>Actualiza token</h1>
                        <Grid container spacing={2} sx={{ width: '100%' }}>
                            <Grid item sx={generalStyle}>
                                <TextField
                                    sx={{ width: isSmallScreen ? '100%' : '90%' }}
                                    id="nombre"
                                    label="Nombre"
                                    variant="standard"
                                    type="text"
                                    fullWidth
                                    name="nombre"
                                    value={formDataToken.nombre}
                                    onChange={handlerChangeUpt}
                                />
                            </Grid>
                            <Grid item sx={generalStyle}>
                                <TextField
                                    id="tokenKey"
                                    label="Codigo del Token"
                                    variant="standard"
                                    type="text"
                                    fullWidth
                                    name="tokenKey"
                                    value={formDataToken.tokenKey}
                                    onChange={handlerChangeUpt}
                                />
                            </Grid>
                            <Grid item sx={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
                                <TextField
                                    sx={{ text: 'center' }}
                                    id="token"
                                    label="Token"
                                    variant="standard"
                                    type="text"
                                    fullWidth
                                    name="token"
                                    value={formDataToken.token}
                                    onChange={handlerChangeUpt}
                                />
                            </Grid>
                            <Grid item xs={6}>
                            <Button
                                variant="contained"
                                color="success"
                                style={{ marginTop: '20px', color:'#fff' }}
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

export default Token;
