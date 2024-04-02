import { Box, Button, Grid, TextField, useMediaQuery } from '@mui/material'
import NavBar from '../../components/publicComponents/Navbar/NavBar'
import './Pqrs.css'

const Pqrs = () => {
    const isSmallScreen = useMediaQuery('(max-width: 700px)');
    return (
        <div>
            <NavBar />
            <div className="container-pqrs">
                <div className="informacion-pqrs">
                    <h2>Información de Contacto</h2>
                    <p>IntitucionCentarioPereira@gmail.com</p>
                    <p>528-78-35</p>
                </div>
                <div className="inputGoup-pqrs">
                    <h3>Envia tu Mensaje</h3>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                            width: '100%'
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Grid container spacing={2}>
                            <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                                <TextField
                                    id="standard-basic" label="Nombres" variant="standard"
                                />
                            </Grid>
                            <Grid sx={{ width: isSmallScreen ? '100%' : '50%' }} >
                                <TextField id="standard-basic" label="Telefono / Celular" variant="standard" />
                            </Grid>
                            <Grid sx={{ width: isSmallScreen ? '100%' : '50%' }} >
                                <TextField id="standard-basic" label="Correo Electronico" variant="standard" />
                            </Grid>
                            <Grid sx={{ width: isSmallScreen ? '100%' : '50%' }} >
                                <TextField
                                    id="standard-multiline-static"
                                    label="Mensaje"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{ margin: "1em auto", width: "40%", display: "flex" }}
                        style={{ textAlign: "end", background: "#97c7d0", color: "#000" }}
                    >Enviar Mensaje</Button>
                </div>
            </div>
        </div>
    )
}

export default Pqrs
