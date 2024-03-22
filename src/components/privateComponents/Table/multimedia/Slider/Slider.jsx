import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import Swal from 'sweetalert2'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useMediaQuery } from '@mui/material';


import { BsTrash3 } from "react-icons/bs";
import { FiEye } from "react-icons/fi";
import SendIcon from '@mui/icons-material/Send';
import { useSliderContext } from "../../../../../context/SliderContext";
import { formateFecha } from "../../../../../assets/includes/funciones";
import { useGaleriaContext } from "../../../../../context/GaleriaContext";
import toastr from "../../../../../assets/includes/Toastr"
import { getLocalStorage, setLocalStorage } from "../../../../../assets/includes/localStorage";
import { MOSTRAR_ARCHIVO } from "../../../../../assets/includes/variables";
function Slider() {

    const isSmallScreen = useMediaQuery('(max-width: 700px)');
    const { slider, responseMessageData, errorsData, postSlider, deleteSlider, getSlider, getSliderOne } = useSliderContext()
    const { galeria } = useGaleriaContext()

    const [imagenId, setImagenId] = useState('')

    const [tituloView, setTituloView] = useState('')
    const [imagenView, setImagenView] = useState('')


    const [openView, setOpenView] = useState(false);
    const handleOpenView = () => setOpenView(true);
    const handleCloseView = () => setOpenView(false);

    const getViewEditGaleria = async () => {
        let id = getLocalStorage('verSliderId')
        id = parseInt(id)
        const dataSlider = await getSliderOne(id)
        if (dataSlider.ok) {
            let dt = dataSlider.data
            setTituloView(dt.imagenes.titulo)
            setImagenView(dt.imagenes.imgPath)
        }
    }

    useEffect(() => {
        if (openView) {
            getViewEditGaleria()
        } else {
            setTituloView('')
            setImagenView('')
        }
    }, [openView])
    useEffect(() => {
        if (errorsData.length != 0) {
            const deleteDuplicidad = new Set(errorsData);
            const errorsData2 = [...deleteDuplicidad]
            errorsData2.map(error => {
                return toastr.error(error)
            })
        }
    }, [errorsData]);

    useEffect(() => {
        if (responseMessageData.length != 0) {
            const deleteDuplicidad = new Set(responseMessageData);
            const responseMessageData2 = [...deleteDuplicidad]
            responseMessageData2.map(msg => {
                toastr.success(msg)
            })
            handleCloseNew()
            getSlider()
            setImagenId('')
        }
    }, [responseMessageData])

    const columns = [
        {
            field: "actions",
            headerName: "Acciones",
            width: 150,
            renderCell: (params) => (
                <div
                    style={{
                        textAlign: "center",
                    }}>
                    <Tooltip title="Ver">
                        <Button>
                            <FiEye
                                onClick={() => {
                                    handleOpenView()
                                    setLocalStorage('verSliderId', params.row.id)
                                }}
                                style={{
                                    textAlign: "center",
                                    fontSize: "20px",
                                    borderRadius: "5px",
                                    color: "#000",
                                }}
                            />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <Button>
                            <BsTrash3
                                onClick={() => {
                                    showSwal()
                                    setLocalStorage('deleteSliderId', params.row.id)
                                }}
                                style={{
                                    textAlign: "center",
                                    fontSize: "20px",
                                    borderRadius: "5px",
                                    color: "#000",
                                }}
                            />
                        </Button>
                    </Tooltip>
                </div>
            ),
        },
        {
            field: "titulo",
            headerName: "Titulo Imagen",
            width: 350,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "imgPath",
            headerName: "Imagen",
            width: 200,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "createdAt",
            headerName: "Fecha de Creación",
            width: 190,
            headerAlign: "center",
            align: "center",
            cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY")
        }
    ];

    const [openNew, setOpenNew] = useState(false);
    const handleOpenNew = () => setOpenNew(true);
    const handleCloseNew = () => setOpenNew(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isSmallScreen ? '100%' : '50%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        alignItems: 'center',
    };

    const showSwal = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger me-4"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "¿Seguro que quieres borrarlo?",
            text: "No lo podras revertir",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, deseo borrarlo",
            cancelButtonText: "No, cancelar",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Borrado!",
                    text: "Tu archivo se ha borrado.",
                    icon: "success"
                });
                let id = parseInt(getLocalStorage('deleteSliderId'))
                id = parseInt(id)
                deleteSlider(id)
            } else if (

                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "Acción cancelada",
                    icon: "error"
                });
            }
        });
    }

    const submitFormSlider = (e) => {
        e.preventDefault()
        postSlider({ ImagenId: imagenId })
    }


    return (
        <>
            <div style={{ height: isSmallScreen ? '80%' : '70%', width: isSmallScreen ? '100%' : '62%', marginTop: '-100px' }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    style={{ textAlign: 'center', marginBottom: '30px', }}
                >
                    <Button
                        variant="contained"
                        color="success"
                        endIcon={<SendIcon />}
                        onClick={handleOpenNew}
                    >
                        Añadir
                    </Button>
                </Grid>
                <DataGrid
                    rows={slider.map(imagen => {
                        if (imagen.imagenes) {
                            return {
                                ...imagen, imgPath: 'Imagen de Galeria'
                            }
                        }
                        return imagen
                    }).map(imagen => {
                        return {
                            ...imagen, titulo: imagen?.imagenes?.titulo, createdAt: formateFecha(imagen?.createdAt)
                        }
                    })}
                    columns={columns}
                    pageSize={5}
                    pageSizeOptions={[5, 10, 25, 100]}
                    disablePageSizeSelector
                    editMode='row'
                    hideFooterSelectedRowCount
                    ignoreDiacritics
                    disableColumnSelector
                    disableDensitySelector
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: "id", sort: "asc" }],
                        },
                    }}
                    scrollbarSize={10}
                    scrollbarColor="#000"
                    scrollbarTrackColor="#ccc"
                    scrollbarThumbColor="#ff0000"
                    style={{ color: "var(--black)", border: "1px solid var(--black)" }}
                    sx={{
                        "..MuiDataGrid": {
                            borderRadius: 0
                        },
                        ".MuiDataGrid-toolbarContainer": {
                            background: "var(--black-background)",
                            color: "var(--white)",
                        },
                        ".MuiInputBase-root": {
                            color: "var(--white)",
                        },
                        ".MuiDataGrid-columnHeader": {
                            background: "var(--black-background)",
                            color: "var(--white)",
                            borderRadius: 0
                        },
                        ".MuiToolbar-root": {
                            background: "var(--black-background)",
                            color: "var(--white)",
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center'
                        },
                        '.MuiTablePagination-actions': {
                            color: "var(--white)",
                        },
                        '.MuiTablePagination-selectLabel': {
                            color: "var(--white)",
                            marginTop: '14px',
                            textAlign: 'center'
                        },
                        '.MuiTablePagination-displayedRows': {
                            color: "var(--white)",
                            marginTop: '14px',
                        },
                        '.MuiDataGrid-footerContainer': {
                            background: "var(--black-background)",
                            color: "var(--white)",
                            textAlign: 'center'
                        },
                        "& .MuiDataGrid-row:hover": {
                            backgroundColor: "var(--hover)",
                            color: "#000",
                            fontWeight: "500",
                            transition: "all 0.3s ease-in-out",
                        },
                    }}
                />
            </div>
            <div>
                {/* //! Modal Crear */}
                <Modal
                    open={openNew}
                    onClose={handleCloseNew}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}
                        component="form"
                        id="crear"
                        noValidate
                        autoComplete="off"
                        onSubmit={submitFormSlider}
                    >
                        <h1 style={{ textAlign: 'center' }}>Asignar imagen a Slider</h1>
                        <Grid container spacing={2}>
                            <Grid item sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <FormControl variant="standard" sx={{ width: '70%' }}>
                                    <InputLabel id="ImagenId">Imagen de galeria</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="ImagenId"
                                        name="ImagenId"
                                        value={imagenId}
                                        fullWidth
                                        onChange={e => setImagenId(e.target.value)}
                                    >
                                        {
                                            galeria.map((imagen, i) => {
                                                return (
                                                    <MenuItem value={imagen.id} key={i}>{imagen.titulo}&nbsp; del {formateFecha(imagen.createdAt)}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" color="success" type="submit" style={{ marginTop: '20px', color: 'white' }} fullWidth>
                                    Guardar
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" color="error" onClick={handleCloseNew} style={{ marginTop: '20px', color: 'white' }} fullWidth>
                                    Cerrar
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
            </div>
            <div>
                {/* //! Modal Ver */}
                <Modal
                    open={openView}
                    onClose={handleCloseView}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{ ...style, width: isSmallScreen ? '100%' : '50%', }}
                        component="form"
                        id="crear"
                        noValidate
                        autoComplete="off"
                    >
                        <h2 style={{ textAlign: 'center' }}>{tituloView}</h2>
                        <Grid container style={{ maxWidth: isSmallScreen ? '100%' : '600px', height: isSmallScreen ? '100%' : '460px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={MOSTRAR_ARCHIVO(imagenView)} style={{ width: '100%', height: '100%', objectFit: 'cover', border: '2px solid var(--black)' , marginLeft: isSmallScreen ? 10 : 66}} alt={imagenView} />
                        </Grid>
                        <Grid item xs={12}>
                                <Button variant="contained" color="error" onClick={handleCloseView} style={{ marginTop: '20px', color: 'white' }} fullWidth>
                                    Cerrar
                                </Button>
                            </Grid>
                    </Box>
                </Modal>
            </div>
        </>
    );
}

export default Slider;
