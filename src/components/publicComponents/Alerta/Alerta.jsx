import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MOSTRAR_ARCHIVO } from '../../../assets/includes/variables';
import { useNavigate } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import { useDataContext } from '../../../context/migration/DataContext';
import { useMediaQuery } from '@mui/material';

const AlertaAnuncios = () => {
    const navegate = useNavigate()
    const { noticias: data, getNoticias } = useDataContext();

    useEffect(() => {
        if (data.length == 0) getNoticias()
    }, [])
    const [sizeModal, setSizeModal] = useState('20px');

    const [open, setOpen] = useState(true);
    const [noticiaAlerta, setNoticiaAlerta] = useState({});

    useEffect(() => {
        if (data) {
            const ultimasNoticias = data
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 2);
            setNoticiaAlerta(ultimasNoticias[0]);
        }
    }, [data]);

    const handleClose = () => {
        setOpen(false);
    };

    const isMenor768 = useMediaQuery('(max-width: 768px)');
    const isMenor480 = useMediaQuery('(max-width: 480px)');
    const ismayor1140 = useMediaQuery('(min-width: 1024px)');

    useEffect(() => {
        if (ismayor1140) setSizeModal('33vw')
        if (isMenor768) setSizeModal('70vw')
        if (isMenor480) setSizeModal('90vw')
    }, [ismayor1140, isMenor768, isMenor480])

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <div style={{ backgroundColor: 'var(--grey-2)', height: 'auto', width: sizeModal }}>
                    <div className="icon">
                        <CloseIcon style={{ position: 'absolute', right: '10', top: '10', cursor: 'pointer', color: '#000' }} onClick={handleClose} />
                    </div>
                    <DialogTitle style={{ color: '#000', marginBlock: '2vh', borderBottom: '2px solid var(--black)', textAlign: 'center', fontSize: '2em', fontWeight: 'bolder' }}>
                        Atención
                    </DialogTitle>
                    <DialogContent>
                        {noticiaAlerta ? (
                            <DialogContentText style={{ fontWeight: 'bolder', color: '#000', fontSize: '1.7em', marginBlock: '2vh', textAlign: 'center', marginInline: 'auto' }}>
                                {noticiaAlerta.titulo}
                            </DialogContentText>
                        ) : (
                            <DialogContentText style={{ fontWeight: 'bolder', color: '#000', marginBlock: '2vh', textAlign: 'center', }}>
                                Cargando Contenido...
                            </DialogContentText>
                        )}
                        <div style={{ fontWeight: '500', color: '#000', textAlign: 'center', padding: '5px' }}>
                            {noticiaAlerta?.encabezado && (
                                <DialogContentText style={{ fontWeight: '500', color: '#000', textAlign: 'center', borderBottom: '1px solid #000', padding: '5px', fontSize: '1.2em', width: '90%', margin: "auto" }}>
                                    {noticiaAlerta.encabezado}
                                </DialogContentText>
                            )}
                            {noticiaAlerta?.descripcion && (
                                <DialogContentText style={{
                                    fontWeight: '500',
                                    color: '#000',
                                    textAlign: 'center', marginTop: '20px',
                                    padding: '20px 10%', borderRadius: '7px',
                                }}>
                                    {noticiaAlerta.descripcion}
                                </DialogContentText>

                            )}
                        </div>
                        {/* <Button type='button' variant="contained" onClick={() => navegate('/noticias')} fullWidth style={{ marginBlock: '2vh' }}>
                            Ver noticias
                        </Button> */}
                        {noticiaAlerta?.imgPath && (
                            <div style={{ width: '100%', marginTop: '10px', height: '25vh', display: 'grid', placeItems: 'center' }}>
                                <img style={{ width: '100%', objectFit: 'cover' }} src={MOSTRAR_ARCHIVO(noticiaAlerta.imgPath)} alt={noticiaAlerta.title} title={noticiaAlerta.title} />
                            </div>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button type='button' variant="contained" onClick={() => navegate('/noticias')} fullWidth style={{ marginBlock: '2vh' }}>
                            Ver noticias
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>

    );
};

export default AlertaAnuncios;
