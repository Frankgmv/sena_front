import { Link } from 'react-router-dom'
import logo from '../../../assets/img/logo.png'
import './NavBar.css'
import { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Drawer, Grid, useMediaQuery } from '@mui/material'
import { IoIosArrowDown } from 'react-icons/io'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const NavBar = () => {


    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const isSmallScreen = useMediaQuery('(max-width: 700px)');

    const DrawerList = (
        <div className='sideMenu' onClick={toggleDrawer(true)}>
            <Grid container spacing={2} sx={{ width: '100%' }}>
                <Grid item sx={{ width: isSmallScreen ? '100%' : '50%' }}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Accordion 1
                        </AccordionSummary>
                        <AccordionDetails>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
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
                            Accordion 1
                        </AccordionSummary>
                        <AccordionDetails>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
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
                <Link className='link' to='/'>Noticias</Link>
                <Link className='link' to='/'>Menu</Link>
                <Link className='link' to='/'>Videos</Link>
                <Link className='link' to='/'>Calendario</Link>
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