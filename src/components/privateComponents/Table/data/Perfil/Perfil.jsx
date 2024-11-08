import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Modal, Select, TextField, useMediaQuery } from '@mui/material'
import './Perfil.css'
import { useEffect, useState } from 'react';
import toastr from '../../../../../assets/includes/Toastr';
import { formateFechaGuion } from '../../../../../assets/includes/funciones';
import { useBasicallyContext } from '../../../../../context/migration/BasicallyContext';
import { useDataContext } from '../../../../../context/migration/DataContext';
import { useAuthContext } from '../../../../../context/migration/AuthContext';

const Perfil = () => {

    const isSmallScreen = useMediaQuery('(max-width: 700px)');
<<<<<<< HEAD
    const { updatePerfil, responseMessageUser, errorsUser } = useUserContext();
    const { perfil, getPerfil, errors, responseMessage} = useGeneralContext()
    const { roles, isAuthenticate, getRoles} = useCredentialContext()
=======
    const { roles, isAuthenticate } = useBasicallyContext()
    const {  perfil, getPerfil, errors: errorsAuth, message: responseMessage, setErrors: setErrorsAuth, setMessages: setResponseMessages } = useAuthContext()
    const { updatePerfil, errors, message } = useDataContext();
>>>>>>> improve_response

    const [dataPerfil, SetDataPerfil] = useState({});
    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);
    const [showPasswordInput, setShowPasswordInput] = useState(false);

    useEffect(() => {
<<<<<<< HEAD
        getRoles() 
        getPerfil()
        
=======
        if(!perfil?.id) getPerfil()

>>>>>>> improve_response
        let { nombre, apellido, correo, celular } = perfil
        SetDataPerfil({ nombre, apellido, correo, celular })
    }, [])

    const handleChangePerfil = (e) => {
        let { name, value } = e.target
        SetDataPerfil(prevent => {
<<<<<<< HEAD
            return {...prevent, [name]: value }
=======
            return { ...prevent, [name]: value }
>>>>>>> improve_response
        })
    }

    useEffect(() => {
        if (errors.length != 0) {
            errors.map(msg => {
                toastr.error(msg)
            })
        }
        if (errorsAuth.length != 0) {
            errorsAuth.map(msg => toastr.error(msg))
        }
        if (responseMessage.length != 0) {
            responseMessage.map(msg => toastr.success(msg))
        }
        if (message.length != 0) {
            getPerfil()
            handleCloseEdit()
            message.map(msg => {
                toastr.success(msg)
            })
        }

    }, [responseMessage, errorsAuth, message, errors])

    useEffect(() => {
        if (openEdit) {
            let { nombre, apellido, correo, celular } = perfil
            SetDataPerfil({ nombre, apellido, correo, celular })
        }

        if (!openEdit) {
            let { nombre, apellido, correo, celular } = perfil
            SetDataPerfil({ nombre, apellido, correo, celular })
        }
    }, [openEdit, perfil, isAuthenticate])

    const enviarForm = (e) => {
        e.preventDefault()
        if (showPasswordInput) {
            if (dataPerfil.password !== dataPerfil.passwordConfirm) {
                return toastr.error('Las contraseñas no coinciden')
            }
        }
        updatePerfil(dataPerfil)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        height: isSmallScreen ? '70%' : '60%',
        width: isSmallScreen ? '100%' : '60%',
        p: 4,
        alignItems: 'center',
    };


    return (
        <>
            <div className='perfil'>
                <Box sx={style} style={{ overflow: 'auto', height: '70vh' }}
                    component="form"
                    id="crearUsuario"
                    noValidate
                    autoComplete="off"
                >
                    <h1 style={{ textAlign: 'center', color: '#000' }}>Mi Perfil</h1>
                    <Grid container spacing={2}>
                        <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                            <TextField
                                id="Id"
                                label="Identificación"
                                variant="standard"
                                type="number"
                                maxLength="20"
                                name='id'
                                value={perfil.id ? perfil.id : ''}

                            />
                        </Grid>
                        <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                            <InputLabel id="fechaNacimiento">Fecha Nacimiento</InputLabel>
                            <TextField
                                sx={{ width: '90%' }}
                                id="fechaNacimiento"
                                variant="standard"
                                type="date"
                                value={perfil.fechaNacimiento ? formateFechaGuion(perfil.fechaNacimiento) : ''}
                            />
                        </Grid>
                        <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                            <FormControl variant="standard" sx={{ width: '90%' }}>
                                <InputLabel id="rol">Rol</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    label="Rol"
                                    value={perfil.RolId ? perfil.RolId : ''}
                                >
                                    {
                                        roles.map((rol, i) => {
                                            return (
                                                <MenuItem value={rol.id} key={i}>{rol.rol}</MenuItem>
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
                                    value={perfil.estado ? perfil.estado : false}
                                    label="Estado"
                                >
                                    <MenuItem value={false}>Inactivo</MenuItem>
                                    <MenuItem value={true}>Activo</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                            <TextField
                                sx={{ width: '90%' }}
                                id="nombre"
                                label="Nombre"
                                variant="standard"
                                value={perfil.nombre ? perfil.nombre : ''}
                            />
                        </Grid>
                        <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                            <TextField
                                sx={{ width: '90%' }}
                                id="apellido"
                                label="Apellido"
                                variant="standard"
                                value={perfil.apellido ? perfil.apellido : ''}
                            />
                        </Grid>
                        <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                            <TextField
                                sx={{ width: '90%' }}
                                id="correo"
                                label="Correo"
                                variant="standard"
                                type="email"
                                value={perfil.correo ? perfil.correo : ''}
                            />
                        </Grid>
                        <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                            <TextField
                                sx={{ width: '90%' }}
                                id="celular"
                                label="Celular"
                                variant="standard"
                                type="number"
                                value={perfil.celular ? perfil.celular : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="warning" type="button"
                                style={{ marginTop: '20px', color: 'white' }}
                                fullWidth
                                onClick={handleOpenEdit}>
                                Editar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        // ! Editar
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
                        onSubmit={enviarForm}
                    >
                        <h1 style={{ textAlign: 'center' }}>Actualiza tus datos</h1>
                        <Grid container spacing={2} sx={{ width: '100%' }}>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField sx={{ width: '90%' }} id="nombre" name="nombre" label="Nombre" variant="standard" value={dataPerfil.nombre ? dataPerfil.nombre : ''} onChange={handleChangePerfil} />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField sx={{ width: '90%' }} id="apellido" name="apellido" label="Apellido" variant="standard" value={dataPerfil.apellido ? dataPerfil.apellido : ''} onChange={handleChangePerfil} />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField sx={{ width: '90%' }} id="correo" name="correo" label="Correo" variant="standard" value={dataPerfil.correo ? dataPerfil.correo : ''} onChange={handleChangePerfil} />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField sx={{ width: '90%' }} id="celular" name="celular" label="Celular" variant="standard" value={dataPerfil.celular ? dataPerfil.celular : ''} onChange={handleChangePerfil} />
                            </Grid>

                            {/* //! Esconder Cambiar contraseña */}

                            <Grid
                                container
                                direction="column"
                                justifyContent="space-evenly"
                                alignItems="center"
                            >
                                <FormControlLabel
                                    control={<Checkbox checked={showPasswordInput} onChange={() => setShowPasswordInput(!showPasswordInput)} />}
                                    label="Cambiar Contraseña"
                                />
                                {showPasswordInput && (
                                    <FormControl variant="standard">
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                                <TextField sx={{ width: '90%' }} id="password" name="password" label="Nueva Contraseña" variant="standard" onChange={handleChangePerfil} />
                                            </Grid>
                                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                                <TextField sx={{ width: '90%' }} id="passwordConfirm" name="passwordConfirm" label="Confirmar Contraseña" variant="standard" onChange={handleChangePerfil} />
                                            </Grid>
                                        </Box>
                                    </FormControl>
                                )}
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
    )
}

export default Perfil
