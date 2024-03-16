import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useGeneralContext } from "../../../../../context/GeneralContext";

function Categoria() {

    const {categorias} = useGeneralContext()
    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        {
            field: "categoria",
            headerName: "Categoria",
            width: 245,
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

    const [rows, setRows] = useState([]);

    const endPoint = "https://sena-project.onrender.com/api/v1/data/categorias";

    const getData = async () => {
        const response = await axios.get(endPoint);
        setRows(response.data.data);
    };

    useEffect(() => {
        getData();
    }, []);


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        alignItems: 'center',
    };


    return (
        <div style={{ height: 400, width: '47%'}}>
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