import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useGeneralContext } from "../../../../../context/GeneralContext";
import { Grid, useMediaQuery } from "@mui/material";
import BotonExcel from "../../../../publicComponents/botones/BotonExcel/BotonExcel";
import { Button } from "reactstrap";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Categoria() {

    const isSmallScreen = useMediaQuery('(max-width: 700px)');
    const {categorias} = useGeneralContext()
    const columns = [
        {
            field: "categoria",
            headerName: "Categoria",
            width: 300,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "categoriaKey",
            headerName: "Codigo de la Categoría",
            width: 300,
            headerAlign: "center",
            align: "center",
        },
    ];

    const [loader, setLoader] = useState(false);

    const downloadPDF = () => {
        const capture = document.querySelector('.datagrid');
        setLoader(true);
        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL('img/png');
            const doc = new jsPDF('p', 'mm', 'a4');
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
            setLoader(false);
            doc.save('data.pdf');
        })
    }

    return (
        <div style={{ height: isSmallScreen ? '80%' : '80%', width: isSmallScreen ? '100%' : '40%', marginTop: isSmallScreen ? '-10%' : '-5%' }}>
            <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                style={{ textAlign: 'center', marginBottom: '15px', }}
            >
                <BotonExcel data={categorias} />
                <Button
                    variant='contained'
                    color="success"
                    className="receipt-modal-download-button"
                    onClick={downloadPDF}
                    disabled={!(loader === false)}
                >
                    {loader ? (
                        <span>Downloading</span>
                    ) : (
                        <span>Descargar PDF</span>
                    )}

                </Button>
            </Grid>
            <DataGrid
                rows={categorias}
                columns={columns}
                pageSize={5}
                pageSizeOptions={[5, 10, 25, 100]}
                disablePageSizeSelector
                editMode='row'
                hideFooterSelectedRowCount
                ignoreDiacritics
                disableColumnSelector
                className="datagrid"
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
    );
}

export default Categoria;
