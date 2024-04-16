import { Link } from 'react-router-dom'
import logo from '../../../assets/img/logo.png'
import './NavBar.css'
import { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Drawer, Grid, useMediaQuery } from '@mui/material'
import { IoIosArrowDown, IoMdMenu } from 'react-icons/io'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDataGeneralContext } from '../../../context/publicContexts/DataGeneralContext'

const NavBar = () => {

    const { navbar } = useDataGeneralContext()
    const [open, setOpen] = useState(false);
    const [keyss, setKeyss] = useState([]);

    const toggleDrawer = (newOpen) => () => setOpen(newOpen)
    const isSmallScreen = useMediaQuery('(max-width: 820px)');

    useEffect(() => {
        const dato = Object.keys(navbar)
        setKeyss(dato)
    }, [navbar]);

    const DrawerList = (
        <div className='sideMenu' onClick={toggleDrawer(true)}>
            <Grid container spacing={2} sx={{ width: '100%', marginTop: '1em' }}>
                <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Páginas internas
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2} sx={{ width: '100%' }}>
                                <Grid item xs={12}>
                                    <Link style={{ textDecoration: 'none' }} className='link' to='/'>Principal</Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link style={{ textDecoration: 'none' }} className='link' to='/la-institucion'>La Institución</Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link style={{ textDecoration: 'none' }} className='link' to='/noticias'>Noticias</Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link style={{ textDecoration: 'none' }} className='link' to='/galeria'>Galeria</Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link style={{ textDecoration: 'none' }} className='link' to='/pqrs'>PQRS</Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link style={{ textDecoration: 'none' }} className='link' to='/magazine'>Magazine</Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link style={{ textDecoration: 'none' }} className='link' to='/anuncios'>Anuncios</Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link style={{ textDecoration: 'none' }} className='link' to='/archivos'> Archivos Institucionales</Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link style={{ textDecoration: 'none' }} className='link' to='/recuperar-contraseña'>Recuperar Contraseña</Link>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Blogs
                        </AccordionSummary>
                        <AccordionDetails>
                            {
                                keyss && keyss.map((item, i) => {
                                    return (
                                        <Grid key={i} container spacing={2} sx={{ width: '100%' }}>
                                            <Grid item xs={12}>
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1-content"
                                                        id="panel1-header"
                                                    >
                                                        {item}
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Grid container spacing={2} sx={{ width: '100%' }}>
                                                            {
                                                                navbar[item] && navbar[item].map((dato, a) => {
                                                                    return (
                                                                        <Grid key={a} item xs={12} style={{ textDecoration: 'none', textAlign: 'center' }}>
                                                                            <Link style={{ textDecoration: 'none' }} className='link' target='_blank' title={dato.descripcion ? dato.descripcion : `Ir a ${dato.titulo}`} to={dato.link}>{dato.titulo}</Link>
                                                                        </Grid>
                                                                    )
                                                                })
                                                            }

                                                            {
                                                                navbar[item].length === 0 && (<Grid item xs={12} style={{ textDecoration: 'none', textAlign: 'center' }}>Vacío</Grid>)
                                                            }
                                                        </Grid>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </Grid>

                                        </Grid>
                                    )
                                })
                            }
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }} >
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Administración
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2} sx={{ width: '100%' }}>
                                <Grid item xs={12}>
                                    <Link
                                        style={{ textDecoration: 'none' }}
                                        className='link' to='/login'>Inicio de sesión</Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link
                                        style={{ textDecoration: 'none' }} className='link' to='/register'>Registro</Link>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </div>
    );

    return (
        <div className='navbarBody'>
            <div className="logo">
                <img src={logo} alt="" />
                <div className="text">
                    <p>Institución Educativa</p>
                    <h3>Centenario Pereira</h3>
                </div>
            </div>
            <div className="links">
                <Link className='link' to='/'><span>Inicio</span> <p></p></Link>
                <Link className='link' to='/noticias'><span>Noticias</span> <p></p></Link>
                <Link className='link' to='/galeria'><span>Galería</span> <p></p></Link>
            </div>
            <div className="info" onClick={toggleDrawer(true)}>
                <div className="infoText">
                    {
                        isSmallScreen ? (
                            <p>Menú</p>

                        ) : (
                            <p>Bienvenido</p>
                        )
                    }
                </div>
                <div className="icon">
                    {
                        isSmallScreen ? (

                            <IoMdMenu
                                style={{ cursor: 'pointer', width: '22px', height: '22px' }}
                                className='navBar-icon'
                                id="demo-positioned-button"
                                aria-controls={open ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            />
                        ) : (

                            <IoIosArrowDown
                                style={{ cursor: 'pointer', width: '22px', height: '22px' }}
                                className='navBar-icon'
                                id="demo-positioned-button"
                                aria-controls={open ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            />
                        )
                    }
                </div>
            </div>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    )
};

export default NavBar