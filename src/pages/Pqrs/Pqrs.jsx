import { Box, Button, Grid, TextField, useMediaQuery, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import NavBar from '../../components/publicComponents/Navbar/NavBar'
import './Pqrs.css'
import { useEffect, useState } from 'react';
import { usePublicPqrsContext } from '../../context/publicContexts/PublicPqrsContext';
import toastr from '../../assets/includes/Toastr';
import Footer from '../../components/publicComponents/Footer/Footer';

const Pqrs = () => {
    const isSmallScreen = useMediaQuery('(max-width: 700px)');
    const styleResponsive = { width: isSmallScreen ? '100%' : '50%' }
    const [datos, setDatos] = useState({})
    const [disable, setDisabled] = useState(false)

    const { errors, responseMessage, postPqrs } = usePublicPqrsContext()

    useEffect(() => {
        if (errors.length != 0) {
            const deleteDuplicidad = new Set(errors);
            const errors2 = [...deleteDuplicidad]
            errors2.map(error => {
                return toastr.error(error)
            })
        }
        setDisabled(false)
    }, [errors]);

    useEffect(() => {
        if (responseMessage.length != 0) {
            responseMessage.map(msg => {
                toastr.success(msg)
            })
        }
        setDatos({})
        setTimeout(() => {
            setDisabled(false)
        }, 1000)
    }, [responseMessage])

    const handlerDatos = (e) => {
        let { name, value } = e.target
        setDatos((prevent) => ({ ...prevent, [name]: value }))
    }

    const submitDatos = (e) => {
        e.preventDefault()
        postPqrs(datos)
        setDisabled(true)
    }

    return (
        <>
            <div>
                <NavBar />
                <div className="container-pqrs">
                    <div className="informacion-pqrs">
                        <h2>Información de Contacto</h2>
                        <p>IntitucionCentarioPereira@gmail.com</p>
                        <p>528-78-35</p>
                    </div>
                    <div className="inputGoup-pqrs">
                        <h3>Formulario PQRS</h3>
                        <Box onSubmit={submitDatos}
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                                width: '100%'
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Grid container spacing={2}>
                                <Grid item sx={styleResponsive}>
                                    <TextField id="standard-basic" name='nombre' label="Nombres" variant="standard"
                                        onChange={handlerDatos} value={datos?.nombre ? datos.nombre : ''}
                                    />
                                </Grid>
                                <Grid item sx={styleResponsive}>
                                    <TextField
                                        id="standard-basic" value={datos?.apellido ? datos.apellido : ''} name='apellido' label="Apellidos" variant="standard"
                                        onChange={handlerDatos}
                                    />
                                </Grid>
                                <Grid sx={styleResponsive} >
                                    <TextField id="standard-basic" name='correo' label="Correo Electronico" variant="standard" onChange={handlerDatos}
                                        value={datos?.correo ? datos.correo : ''} />
                                </Grid>
                                <Grid sx={styleResponsive} >
                                    <TextField id="standard-basic" name='numeroContacto' value={datos?.numeroContacto ? datos.numeroContacto : ''}
                                        label="Número de contacto" variant="standard" onChange={handlerDatos} />
                                </Grid>
                                <Grid item sx={styleResponsive}>
                                    <FormControl variant="standard" sx={{ width: '65%' }}>
                                        <InputLabel id="remitente">Remitente</InputLabel>
                                        <Select onChange={handlerDatos}
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            label="remitente"
                                            name="remitente"
                                            value={datos?.remitente ? datos.remitente : ''}
                                        >
                                            <MenuItem value="">Seleccionar</MenuItem>
                                            <MenuItem value="Maestro">Maestro</MenuItem>
                                            <MenuItem value="Padre de familia">Padre de familia</MenuItem>
                                            <MenuItem value="Estudiante">Estudiante</MenuItem>
                                            <MenuItem value="Interesado en la institución">Interesado en la institución</MenuItem>
                                            <MenuItem value="Otros">Otros...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item sx={styleResponsive}>
                                    <FormControl variant="standard" sx={{ width: '65%' }}>
                                        <InputLabel id="tipo">Tipo</InputLabel>
                                        <Select onChange={handlerDatos}
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            label="tipo"
                                            name="tipo"
                                            value={datos?.tipo ? datos.tipo : ''}
                                        >
                                            <MenuItem value="">Seleccionar</MenuItem>
                                            <MenuItem value="Petición">Petición</MenuItem>
                                            <MenuItem value="Queja">Queja</MenuItem>
                                            <MenuItem value="Reclamo">Reclamo</MenuItem>
                                            <MenuItem value="Solicitud">Solicitud</MenuItem>
                                            <MenuItem value="Felicitaciones">Felicitaciones</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid sx={{ ...styleResponsive, width: '100%' }} >
                                    <TextField onChange={handlerDatos}
                                        sx={{ minWidth: isSmallScreen ? '50%' : '83%' }}
                                        id="standard-multiline-static"
                                        label="Mensaje"
                                        multiline
                                        rows={3}
                                        value={datos?.mensaje ? datos.mensaje : ''}
                                        name='mensaje'
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                disabled={disable}
                                type="submit"
                                variant="contained"
                                sx={{ margin: "1em auto", width: "40%", display: "flex" }}
                                style={{ textAlign: "end", background: "#97c7d0", color: "#000" }}
                            >Enviar</Button>
                        </Box>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Pqrs
