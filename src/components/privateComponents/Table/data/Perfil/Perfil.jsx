import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Modal, Select, TextField, useMediaQuery } from '@mui/material'
import './Perfil.css'
import { useState } from 'react';

const Perfil = () => {

    const isSmallScreen = useMediaQuery('(max-width: 600px)');

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        width: 800,
        p: 4,
        alignItems: 'center',
    };

    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);
    const [showPasswordInput, setShowPasswordInput] = useState(false);

        return (
            <>
                <div className='perfil'>
                    <Box sx={style}
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
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <InputLabel id="fechaNacimiento">Fecha Nacimiento</InputLabel>
                                <TextField
                                    sx={{ width: '90%' }}
                                    id="fechaNacimiento"
                                    variant="standard"
                                    type="date"
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <FormControl variant="standard" sx={{ width: '90%' }}>
                                    <InputLabel id="rol">Rol</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Rol"
                                        value={1}
                                    >
                                        <MenuItem value={1}>Copiar y Pegar Roles Aqui</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <FormControl variant="standard" sx={{ width: '90%' }}>
                                    <InputLabel id="estado">Estado</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={false}
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
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    sx={{ width: '90%' }}
                                    id="apellido"
                                    label="Apellido"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    sx={{ width: '90%' }}
                                    id="correo"
                                    label="Correo"
                                    variant="standard"
                                    type="email"
                                />
                            </Grid>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    sx={{ width: '90%' }}
                                    id="celular"
                                    label="Celular"
                                    variant="standard"
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="warning" type="submit"
                                    style={{ marginTop: '20px', color: 'white' }}
                                    fullWidth
                                    onClick={() => {
                                        handleOpenEdit()
                                    }}>
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
                        >
                            <h1 style={{ textAlign: 'center' }}>Actualiza tus datos</h1>
                            <Grid container spacing={2} sx={{ width: '100%' }}>
                                <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                    <FormControl variant="standard" sx={{ width: '90%' }}>
                                        <InputLabel id="rol">Rol</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            label="Rol"
                                            value={1}
                                        >
                                            <MenuItem value={1}>
                                            Copiar y Pegar Roles Aqui
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                    <FormControl variant="standard" sx={{ width: '90%' }}>
                                        <InputLabel id="estado">Estado</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={false}
                                            label="Estado"
                                        >
                                            <MenuItem value={false}>Inactivo</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                    <TextField sx={{ width: '90%' }} id="nombre" name="nombre" label="Nombre" variant="standard" />
                                </Grid>
                                <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                    <TextField sx={{ width: '90%' }} id="apellido" name="apellido" label="Apellido" variant="standard" />
                                </Grid>
                                <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                    <TextField sx={{ width: '90%' }} id="correo" name="correo" label="Correo" variant="standard" />
                                </Grid>
                                <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                    <TextField sx={{ width: '90%' }} id="celular" name="celular" label="Celular" variant="standard" />
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
                                                <TextField
                                                    id="password"
                                                    label="Contraseña"
                                                    variant="standard"
                                                    type="password"
                                                />
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
