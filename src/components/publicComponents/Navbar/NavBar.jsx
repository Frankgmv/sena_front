import { Link } from 'react-router-dom'
import logo from '../../../assets/img/logo.png'
import './NavBar.css'
import { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Drawer, Grid, useMediaQuery } from '@mui/material'
import { IoIosArrowDown } from 'react-icons/io'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BASE_URL_API } from '../../../assets/includes/variables'
import axios from 'axios'

const NavBar = () => {


    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const isSmallScreen = useMediaQuery('(max-width: 700px)');

    const [data, setData] = useState([]);

    const endPoint = `${BASE_URL_API}/data/links`

    const getData = async () => {
        const response = await axios.get(endPoint);
        setData(response.data.data);
    };

    useEffect(() => {
        getData();
    }, []);

    const DrawerList = (
        <div className='sideMenu' onClick={toggleDrawer(true)}>
            <Grid container spacing={2} sx={{ width: '100%', marginTop: '1em'}}>
                <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }} >
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Login
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2} sx={{ width: '100%' }}>
                                <Grid item xs={12}>
                                    <Link
                                        style={{ textDecoration: 'none' }}
                                        className='link' to='/login'>Login</Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link
                                        style={{ textDecoration: 'none' }} className='link' to='/register'>Register</Link>
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
                            Paginas internas
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2} sx={{ width: '100%' }}>
                                <Grid item xs={12}>
                                    <Link style={{ textDecoration: 'none' }} className='link' to='/'>Home</Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link style={{ textDecoration: 'none' }} className='link' to='/noticias'>Noticias</Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link style={{ textDecoration: 'none' }} className='link' to='/galeria'>Galeria</Link>
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <Link style={{ textDecoration: 'none' }} className='link' to='/la-institucion'>La Institución</Link>
                                </Grid> */}
                                <Grid item xs={12}>
                                    <Link style={{ textDecoration: 'none' }} className='link' to='/pqrs'>PQRS</Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link style={{ textDecoration: 'none' }} className='link' to='/recuperar-contraseña'>Recuperar Contraseña</Link>
                                </Grid>
                                    {/* <Grid item xs={12}>
                                        <Link style={{ textDecoration: 'none' }} className='link' to='/archivos'> Archivos Institucionales</Link>
                                    </Grid> */}
                                {/* <Grid item xs={12}>
                                    <Link style={{ textDecoration: 'none' }} className='link' to='/magazine'>Magazine</Link>
                                </Grid> */}
                                <Grid item xs={12}>
                                    <Link style={{ textDecoration: 'none' }} className='link' to='/admin'>Admin</Link>
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
                            Links
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2} sx={{ width: '100%' }}>
                                <Grid item xs={12}>
                                    <Link style={{ textDecoration: 'none' }} className='link' to='/'>Home</Link>
                                </Grid>
                                {data.map((item) => (
                                    <Grid item xs={12} key={item.id}>
                                        <Link style={{ textDecoration: 'none' }} className='link' to={item.link}>{item.titulo}</Link>
                                    </Grid>
                                ))}
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
                <Link className='link' to='/'>Inicio</Link>
                <Link className='link' to='/noticias'>Noticias</Link>
                <Link className='link' to='/galeria'>Eventos</Link>
            </div>
            <div className="info">
                <div className="infoText">
                    <p>Bienvenido</p>
                </div>
                <div className="icon">
                    <IoIosArrowDown
                        className='navBar-icon'
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={toggleDrawer(true)}
                    />
                </div>
            </div>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    )
};

export default NavBar