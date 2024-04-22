import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useDataGeneralContext } from '../../../context/publicContexts/DataGeneralContext';

class AlertaAnuncios extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };
    }

    componentDidMount() {

        axios.get('http://localhost:9000/api/v1/data/noticias')
            .then(response => {
                this.setState({ data: response.data.data });
                console.log(response);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        setTimeout(() => this.handleClose(), 30000);
    }

    handleClose = () => {
        this.setState({ open: false });
    };



    render() {
        const { open, data } = this.state;

        return (
            <div>
                <Dialog open={open} onClose={this.handleClose}>
                    <DialogTitle style={{ marginBlock: '2vh' }}>Noticias Sobre Nuestra Institución</DialogTitle>
                    <DialogContent>
                        {data ? (
                            <DialogContentText style={{ marginBlock: '2vh' }}>
                                {data.titulo}
                            </DialogContentText>
                        ) : (
                            <DialogContentText style={{ marginBlock: '2vh' }}>Loading data...</DialogContentText>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" fullWidth onClick={this.handleClose} style={{ marginBlock: '2vh' }}>
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AlertaAnuncios;
