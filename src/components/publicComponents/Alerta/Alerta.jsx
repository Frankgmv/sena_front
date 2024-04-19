import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

class AlertaAnuncios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };
    }

    componentDidMount() {
        setTimeout(() => this.handleClose(), 30000);
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;

        return (
            <div>
                <Dialog open={open} onClose={this.handleClose}>
                    <DialogTitle style={{marginBlock: '2vh'}}>Pruebas con Material para abrir modal parte 1</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{marginBlock: '2vh'}}>Falta dar estilos y traer la informacion de la ultima noticia</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" fullWidth onClick={this.handleClose} style={{marginBlock: '2vh'}}>
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}

export default AlertaAnuncios;
