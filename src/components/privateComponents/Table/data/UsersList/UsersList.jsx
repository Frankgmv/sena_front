import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import Swal from 'sweetalert2'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import toastr from '../../../../../assets/includes/Toastr'
import { useMediaQuery } from '@mui/material';
import { useUserContext } from "../../../../../context/UserContext";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../../../../../assets/includes/localStorage";
import { formateFecha } from "../../../../../assets/includes/funciones";
import { useCredentialContext } from "../../../../../context/AuthContext";

import { BsTrash3 } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import SendIcon from '@mui/icons-material/Send';
import { RiShieldKeyholeLine } from "react-icons/ri";
import { useGeneralContext } from "../../../../../context/GeneralContext";


function UserList() {
    const { usuarios, getUsers, errorsUser, responseMessageUser, registrarUsuario, getUsuario, updateUsuario, deleteUsuario } = useUserContext();
    const { roles } = useCredentialContext()
    const { getDataPermisos, permisosData, errors, responseMessage, setPermisosData, postDataPermisos, deleteDataPermisos } = useGeneralContext()

    const [showPasswordInput, setShowPasswordInput] = useState(false);

    const isSmallScreen = useMediaQuery('(max-width: 700px)');

    //  !Logica guardar usuarios
    const [id, setId] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [correo, setCorreo] = useState('')
    const [celular, setCelular] = useState('')
    const [password, setPassword] = useState('')
    const [estado, setEstado] = useState('')
    const [RolId, setRolId] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')

    const [nombreUpt, setNombreUpt] = useState('')
    const [apellidoUpt, setApellidoUpt] = useState('')
    const [correoUpt, setCorreoUpt] = useState('')
    const [celularUpt, setCelularUpt] = useState('')
    const [estadoUpt, setEstadoUpt] = useState('')
    const [RolIdUpt, setRolIdUpt] = useState('')

    const [passwordUpt, setPasswordUpt] = useState('')
    const [passwordValidUpt, setPasswordValidUpt] = useState('')

    const submitUpdateUsuario = (event) => {
        event.preventDefault()
        let dataUpdated = {
            nombre: nombreUpt,
            apellido: apellidoUpt,
            correo: correoUpt,
            celular: celularUpt,
            estado: estadoUpt,
            RolId: RolIdUpt
        }

        if (showPasswordInput) {
            if (passwordUpt === passwordValidUpt) {
                dataUpdated = {
                    ...dataUpdated,
                    'password': passwordUpt
                }
            } else {
                toastr.error('Las contraseñas no coinciden')
            }
        }
        setOpenEdit(false);
        setShowPasswordInput(false);
        const idUser = parseInt(getLocalStorage('UsuarioIdEdit'));
        updateUsuario(idUser, dataUpdated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const datosUsuario = {
            id: parseInt(id),
            nombre, apellido, correo, celular, password, estado, RolId, fechaNacimiento
        }
        registrarUsuario(datosUsuario)

    }

    const resetForm = () => {
        setId('');
        setNombre('');
        setApellido('');
        setCorreo('');
        setCelular('');
        setPassword('');
        setEstado('');
        setRolId('');
        setFechaNacimiento('');
    }

    useEffect(() => {
        if (errorsUser.length != 0) {
            const deleteDuplicidad = new Set(errorsUser);
            const errorsUser2 = [...deleteDuplicidad]
            errorsUser2.map(error => {
                return toastr.error(error)
            })
        }

        if (errors.length != 0) {
            const deleteDuplicidad = new Set(errors);
            const errors2 = [...deleteDuplicidad]
            errors2.map(error => {
                return toastr.error(error)
            })
        }

        if (responseMessage.length != 0) {
            const deleteDuplicidad = new Set(responseMessage);
            const responseMessage2 = [...deleteDuplicidad]
            responseMessage2.map(msg => {
                return toastr.success(msg)
            })
        }

        if (responseMessageUser.length != 0) {
            const deleteDuplicidad = new Set(responseMessageUser);
            const responseMessage2 = [...deleteDuplicidad]
            responseMessage2.map(msg => {
                toastr.success(msg)
            })
            getUsers();
            setOpenNew(false);
            resetForm();
        }
    }, [errorsUser, errors, responseMessage, responseMessageUser]);

    const navegarAUsuario = (usuarioId) => {
        setLocalStorage('UsuarioIdEdit', usuarioId)
    }

    const deleteUser = (usuarioId) => {
        setLocalStorage('UsuarioIdDelete', usuarioId)
    }


    const columns = [
        {
            field: "actions",
            headerName: "Acciones",
            width: 210,
            renderCell: (params) => (
                <div
                    style={{
                        textAlign: "center",
                    }}>
                    <Tooltip title="Permisos">
                        <Button>
                            <RiShieldKeyholeLine
                                onClick={() => {
                                    handleOpenPermit()
                                    setLocalStorage('idUsuarioPermisos', params.row.id)
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
                                    navegarAUsuario(params.row.id)
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
                                    deleteUser(params.row.id)
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
        { field: "id", headerName: "ID", width: 100 },
        {
            field: "nombre",
            headerName: "Nombres",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "apellido",
            headerName: "Apellido",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "correo",
            headerName: "Correo",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "celular",
            headerName: "Número de Celular",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "estado",
            headerName: "Estado",
            headerAlign: "center",
            align: "center",
        },
        {
            field: "RolId",
            headerName: "Rol",
            width: 200,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "fechaNacimiento",
            headerName: "Fecha de Nacimiento",
            width: 150,
            headerAlign: "center",
            align: "center",
            cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY"),
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

    const [openPermit, setOpenPermit] = useState(false);
    const handleOpenPermit = () => setOpenPermit(true);
    const handleClosePermit = () => setOpenPermit(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        height: isSmallScreen ? '75%' : '65%',
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

                const id = parseInt(getLocalStorage('UsuarioIdDelete'))
                deleteUsuario(id)
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "Acción cancelada",
                    icon: "error"
                });
            }
            removeLocalStorage('UsuarioIdDelete')
        });
    }

    const buscarUsuario = async () => {
        const idUsuario = parseInt(getLocalStorage('UsuarioIdEdit'));
        const usuario = await getUsuario(idUsuario);
        if (!usuario.ok || !idUsuario) {
            setOpenEdit(false)
        } else {
            let { apellido, nombre, RolId, estado, celular, correo } = usuario.data
            setApellidoUpt(apellido)
            setNombreUpt(nombre)
            setRolIdUpt(RolId),
                setEstadoUpt(estado)
            setCelularUpt(celular)
            setCorreoUpt(correo)
        }
    }
    const buscarPermisos = () => {
        const idUsuario = parseInt(getLocalStorage('idUsuarioPermisos'));
        getDataPermisos(idUsuario)
    }

    useEffect(() => {
        if (openEdit) {
            buscarUsuario()
        }
    }, [openEdit])

    useEffect(() => {
        if (openPermit) {
            buscarPermisos()
        } else {
            removeLocalStorage('idUsuarioPermisos')
            setPermisosData([])
        }
    }, [openPermit])

    const hadlerChangePermiso = (e) => {
        let { checked, name } = e.target
        let UsuarioId = parseInt(getLocalStorage('idUsuarioPermisos'));
        let PermisoId = parseInt(name)
        if (checked) {
            postDataPermisos(PermisoId, UsuarioId)
        } else {
            deleteDataPermisos(PermisoId, UsuarioId)
        }
    }

    return (
        <>
            <div style={{ height: isSmallScreen ? '80%' : '70%', width: "100%", marginTop: '-45px' }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    style={{ textAlign: 'center', marginBottom: '15px', }}
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
                    rows={usuarios.map((user) => {
                        if (user.estado) return { ...user, estado: 'activo' }
                        return { ...user, estado: 'inactivo' }
                    }).map(user => {
                        for (let rol of roles) {
                            if (rol.id === user.RolId) {
                                return { ...user, RolId: rol.rol }
                            }
                        }
                        return user
                    }).map(user => {
                        const createdAt = formateFecha(user.createdAt);
                        const fechaNacimiento = formateFecha(user.fechaNacimiento);
                        return { ...user, createdAt, fechaNacimiento }
                    })}
                    columns={columns}
                    pageSize={8}
                    pageSizeOptions={[8, 10, 25, 100]}
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
                        ".MuiDataGrid": {
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
                    <Box sx={style} style={{overflow: 'auto'}}
                        component="form"
                        id="crearUsuario"
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <h1 style={{ textAlign: 'center' }}>Crea un nuevo Usuario</h1>
                        <Grid container spacing={2}>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="Id"
                                    label="Identificación"
                                    variant="standard"
                                    type="number"
                                    maxLength="20"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <InputLabel id="fechaNacimiento">Fecha Nacimiento</InputLabel>
                                <TextField
                                    sx={{ width: '90%' }}
                                    id="fechaNacimiento"
                                    variant="standard"
                                    value={fechaNacimiento}
                                    type="date"
                                    onChange={(e) => setFechaNacimiento(e.target.value)}
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <FormControl variant="standard" sx={{ width: '90%' }}>
                                    <InputLabel id="rol">Rol</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={RolId}
                                        onChange={(e) => setRolId(e.target.value)}
                                        label="Rol"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {
                                            roles.map((rol, i) => {
                                                const disabled = rol.rolKey === 'WM'
                                                return (
                                                    <MenuItem key={i} value={rol.id} disabled={disabled}>{rol.rol}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <FormControl variant="standard" sx={{ width: '90%' }}>
                                    <InputLabel id="estado">Estado</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={estado}
                                        onChange={(e) => setEstado(e.target.value)}
                                        label="Estado"
                                    >
                                        <MenuItem value={false}>Inactivo</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    sx={{ width: '90%' }}
                                    id="nombre"
                                    label="Nombre"
                                    variant="standard"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    sx={{ width: '90%' }}
                                    id="apellido"
                                    label="Apellido"
                                    variant="standard"
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    sx={{ width: '90%' }}
                                    id="correo"
                                    label="Correo"
                                    variant="standard"
                                    type="email"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    sx={{ width: '90%' }}
                                    id="celular"
                                    label="Celular"
                                    variant="standard"
                                    type="number"
                                    value={celular}
                                    onChange={(e) => setCelular(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="standard" sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: '20px' }}>
                                    <TextField
                                        id="password"
                                        label="Contraseña"
                                        variant="standard"
                                        type="password"
                                        value={password}
                                        sx={{ width: '100%' }}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </FormControl>
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
                    <Box sx={style} style={{overflow: 'auto'}}
                        component="form"
                        id="editarUsuario"
                        noValidate
                        autoComplete="off"
                        onSubmit={submitUpdateUsuario}
                    >
                        <h1 style={{ textAlign: 'center' }}>Actualiza tus datos</h1>
                        <Grid container spacing={2} sx={{ width: '100%' }}>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <InputLabel id="RolId">Rol</InputLabel>
                                <Select
                                    sx={{ width: '90%' }}
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    label="RolId"
                                    variant="standard"
                                    name="RolId"
                                    value={RolIdUpt}
                                    defaultValue={1}
                                    onChange={(e) => setRolIdUpt(parseInt(e.target.value))}
                                >
                                    {
                                        roles.map((rol, i) => {
                                            const disabled = rol.rolKey === 'WM'
                                            const texto = RolIdUpt === rol.id
                                            return (
                                                <MenuItem key={i} value={rol.id} disabled={disabled}>{rol.rol} {texto ? 'por defecto' : ''}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <InputLabel id="estado">estado</InputLabel>
                                <Select
                                    sx={{ width: '90%' }}
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    name="estado"
                                    variant="standard"
                                    defaultValue={false}
                                    onChange={(e) => setEstadoUpt(e.target.value)}
                                >
                                    <MenuItem value={false}>Inactivo</MenuItem>
                                    <MenuItem value={true}>Activo</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField sx={{ width: '90%' }} id="nombre" value={nombreUpt} onChange={(e) => setNombreUpt(e.target.value)} name="nombre" label="Nombre" variant="standard" />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField sx={{ width: '90%' }} id="apellido" value={apellidoUpt} onChange={(e) => setApellidoUpt(e.target.value)} name="apellido" label="Apellido" variant="standard" />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField sx={{ width: '90%' }} id="correo" onChange={(e) => setCorreoUpt(e.target.value)} value={correoUpt} name="correo" label="Correo" variant="standard" />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField sx={{ width: '90%' }} id="celular" onChange={(e) => setCelularUpt(e.target.value)} value={celularUpt} name="celular" label="Celular" variant="standard" />
                            </Grid>

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
                                    <FormControl variant="standard" sx={{ width: '100%' }}>
                                        <Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', alignItems: 'flex-end', }} style={{ marginBottom: '20px' }}>
                                            <TextField
                                                sx={{ width: '90%' }}
                                                id="password"
                                                label="Contraseña"
                                                variant="standard"
                                                name="password"
                                                type="password"
                                                onChange={(e) => setPasswordUpt(e.target.value)}
                                                style={{ marginLeft: '12px' }}
                                            />
                                            <TextField
                                                sx={{ width: '90%' }}
                                                id="password_valid"
                                                label="Repetir Contraseña"
                                                variant="standard"
                                                name="password_valid"
                                                type="password"
                                                onChange={(e) => setPasswordValidUpt(e.target.value)}
                                                style={{ marginLeft: '12px' }}
                                            />
                                        </Box>
                                    </FormControl>
                                )}
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
            {/* //! Modal permisos */}
            <div>
                <Modal
                    open={openPermit}
                    onClose={handleClosePermit}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} style={{overflow: 'auto'}}
                        component="form"
                        id="editarUsuario"
                        noValidate
                        autoComplete="off"
                    >
                        <h1 style={{ textAlign: 'center' }}>Permisos</h1>
                        <Grid container spacing={2} sx={{ width: '100%' }} style={{ alignItems: 'center', textAlign: 'center' }}>
                            {openPermit && permisosData.map((item, i) => (
                                <Grid item sx={{ width: isSmallScreen ? '100%' : '50%', display: 'flex', alignItems: 'center' }} key={i}>
                                    <Checkbox onChange={hadlerChangePermiso} key={i} color="success" name={`${item.id}`} defaultChecked={item.value} value={item.PermisoId} />
                                    <div className="titulo">{item.permiso}</div>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item xs={12}>
                                <Button variant="contained" color="error" onClick={handleClosePermit} fullWidth style={{ marginTop: '20px', color: '#fff' }}>
                                    Cerrar
                                </Button>
                            </Grid>
                    </Box>
                </Modal>
            </div>
        </>
    );
}

export default UserList;