// import React from 'react';
// import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
// import { Avatar, Card, CardContent, Typography } from '@mui/material';
// import { GridToolbarFilterButton } from '@mui/x-data-grid-pro';

// type DataTablePropTypes = {
//   columns: GridColDef[];
//   rows: GridRowsProp;
//   style?: object;
//   pageSize: number;
//   tableHeading: string;
//   shouldViewAllButtonRender: boolean;
//   shouldFilterButtonRender: boolean;
//   customComponent: React.ReactNode;
//   isLoading: boolean;
//   isError: boolean;
// };

// export default function CustomError({
//   columns,
//   rows,
//   style = {
//     backgroundColor: '#fff',
//     border: 'white',

//     '& .MuiDataGrid-columnHeader': {
//       backgroundColor: '#F5F6F9'
//     },
//     '& .MuiDataGrid-row': {
//       borderRadius: '100px'
//     }
//   },
//   pageSize,
//   tableHeading,
//   shouldViewAllButtonRender = true,
//   shouldFilterButtonRender = false,
//   customComponent,
//   isLoading,
//   isError
// }: DataTablePropTypes) {
//   return (
//     <Card
//       sx={{
//         backgroundColor: '#fff',
//         border: 'white',
//         boxShadow: 'unset',
//         width: '100%',
//         height: '100%'
//       }}
//     >
//       <CardContent>
//         <div style={{ height: '100%', width: '100%' }}>
//           <DataGrid
//             sx={style}
//             columns={columns}
//             rows={rows}
//             initialState={{
//               pagination: {
//                 paginationModel: {
//                   pageSize: pageSize
//                 }
//               }
//             }}
//             autoHeight
//             components={{
//               Toolbar: () => (
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                   <div
//                     style={{
//                       display: 'flex',
//                       marginTop: '10px',
//                       width: '100%'
//                     }}
//                   >
//                     <div style={{ flexGrow: '1' }}>
//                       <h2 style={{ margin: '2%' }}>{tableHeading}</h2>
//                     </div>
//                     <Typography
//                       component="h6"
//                       sx={{
//                         color: 'blue',
//                         textDecoration: 'underline',
//                         padding: '1%',
//                         margin: '1% 2%'
//                       }}
//                     >
//                       {shouldViewAllButtonRender && 'View all'}
//                     </Typography>
//                     {customComponent}
//                     {shouldFilterButtonRender && (
//                       <div
//                         style={{
//                           padding: '0.5%',
//                           margin: '1% 2%'
//                         }}
//                       >
//                         <GridToolbarFilterButton
//                           sx={{
//                             border: 2,
//                             borderColor: 'grey.200'
//                           }}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )
//             }}
//           />
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
