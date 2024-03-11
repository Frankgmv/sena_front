// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import dayjs from "dayjs";
// import { useEffect } from "react";
// import { Grid } from "@mui/material";
// import toastr from '../../../../assets/includes/Toastr'

// import { useCredentialContext } from "../../../../context/AuthContext";

// import { useSeccionContext } from "../../../../context/SeccionContext";

// function SeccionList() {
//     const { 
//         getSecciones,
//         seccion,
//         getSeccionesMenu,
//         getSeccion,
//         errorsData,
//         responseMessageData,
        
//         } = useSeccionContext();
//         const { secciones } = useCredentialContext()

//     useEffect(() => {
//         if (errorsData.length != 0) {
//             errorsData.map(error => {
//                 return toastr.error(error)
//             })
//         }
//     }, [errorsData]);

//     useEffect(() => {
//         if (responseMessageData.length != 0) {
//             responseMessageData.map(msg => {
//                 toastr.success(msg)
//             })
//             getSecciones();
//             setOpenNew(false);
//             resetForm();
//         }

//     }, [responseMessageData])


//     const columns = [
//         { field: "id", headerName: "ID", width: 100 },
//         {
//             field: "titulo",
//             headerName: "Titulo",
//             width: 150,
//             headerAlign: "center",
//             align: "center",
//         },
//         {
//             field: "descripcion",
//             headerName: "Descripcion",
//             width: 350,
//             headerAlign: "center",
//             align: "center",
//         },
//         {
//             field: "imgPath",
//             headerName: "Imagen",
//             width: 210,
//             headerAlign: "center",
//             align: "center",
//         },
//         {
//             field: "UsuarioId",
//             headerName: "Id del Usuario",
//             width: 150,
//             headerAlign: "center",
//             align: "center",
//         },
//         {
//             field: "SeccionId",
//             headerName: "Id de la Sección",
//             width: 150,
//             headerAlign: "center",
//             align: "center",
//         },
//         {
//             field: "createdAt",
//             headerName: "Fecha de Creación",
//             width: 150,
//             headerAlign: "center",
//             align: "center",
//             cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY"),
//         }
//     ];

//     useEffect(() => {
//         getSecciones();
//     }, []);

//     return (
//         <>
//             <div style={{ height: 500, width: "100%", marginTop: '-50px' }}>
//                 <Grid
//                     container
//                     direction="row"
//                     justifyContent="space-evenly"
//                     alignItems="center"
//                     style={{ textAlign: 'center', marginBottom: '30px', }}
//                 >
//                 </Grid>
//                 <DataGrid
//                     rows={secciones}
//                     columns={columns}
//                     pageSize={5}
//                     pageSizeOptions={[5, 10, 25, 100]}
//                     disablePageSizeSelector
//                     editMode='row'
//                     hideFooterSelectedRowCount
//                     ignoreDiacritic
//                     disableDensitySelector
//                     slots={{
//                         toolbar: GridToolbar,
//                     }}
//                     slotProps={{
//                         toolbar: {
//                             showQuickFilter: true,
//                         },
//                     }}
//                     initialState={{
//                         sorting: {
//                             sortModel: [{ field: "id", sort: "asc" }],
//                         },
//                     }}
//                     scrollbarSize={10}
//                     scrollbarColor="#000"
//                     scrollbarTrackColor="#ccc"
//                     scrollbarThumbColor="#ff0000"
//                     style={{ color: "var(--black)", border: "1px solid var(--black)" }}
//                     sx={{
//                         "..MuiDataGrid": {
//                             borderRadius: 0
//                         },
//                         ".MuiDataGrid-toolbarContainer": {
//                             background: "var(--black-background)",
//                             color: "var(--white)",
//                         },
//                         ".MuiInputBase-root": {
//                             color: "var(--white)",
//                         },
//                         ".MuiDataGrid-columnHeader": {
//                             background: "var(--black-background)",
//                             color: "var(--white)",
//                             borderRadius: 0
//                         },
//                         ".MuiToolbar-root": {
//                             background: "var(--black-background)",
//                             color: "var(--white)",
//                             textAlign: 'center',
//                             display: 'flex',
//                             alignItems: 'center'
//                         },
//                         '.MuiTablePagination-actions': {
//                             color: "var(--white)",
//                         },
//                         '.MuiTablePagination-selectLabel': {
//                             color: "var(--white)",
//                             marginTop: '14px',
//                             textAlign: 'center'
//                         },
//                         '.MuiTablePagination-displayedRows': {
//                             color: "var(--white)",
//                             marginTop: '14px',
//                         },
//                         '.MuiDataGrid-footerContainer': {
//                             background: "var(--black-background)",
//                             color: "var(--white)",
//                             textAlign: 'center'
//                         },
//                         "& .MuiDataGrid-row:hover": {
//                             backgroundColor: "var(--hover)",
//                             color: "#000",
//                             fontWeight: "500",
//                             transition: "all 0.3s ease-in-out",
//                         },
//                     }}
//                 />
//             </div>
//         </>
//     );
// }

// export default SeccionList;
