import React from 'react';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridRowParams,
  GridRowIdGetter
} from '@mui/x-data-grid';
import { Avatar, Button, Card, CardContent, Typography } from '@mui/material';
import { GridToolbarFilterButton } from '@mui/x-data-grid-pro';
import Link from 'next/link';
import type { AttendanceType } from 'types/AttendanceType';

type DataTablePropTypes = {
  columns: GridColDef[];
  rows: GridRowsProp;
  style?: object;
  pageSize: number;
  tableHeading: string;
  shouldViewAllButtonRender: boolean;
  shouldFilterButtonRender: boolean;
  customComponent?: React.ReactNode;
  getRowId?: GridRowIdGetter<AttendanceType>;
  isLoading?: boolean;
  isError?: boolean;
  onRowClick: (params: GridRowParams) => void;
};
type CustomErrorProps = {
  message: string;
};

type CustomLoadingProps = {};

const CustomError: React.FC<CustomErrorProps> = ({ message }) => (
  <div
    style={{
      height: '400px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Typography variant="h5">{message}</Typography>
  </div>
);

const CustomLoading: React.FC<CustomLoadingProps> = () => (
  <div
    style={{
      height: '400px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Typography variant="h5">Loading...</Typography>
  </div>
);

export default function DataTable({
  columns,
  rows,
  style = {
    backgroundColor: '#fff',
    border: 'white',

    '& .MuiDataGrid-columnHeader': {
      backgroundColor: '#F5F6F9'
    },
    '& .MuiDataGrid-row': {
      borderRadius: '100px'
    }
  },
  pageSize,
  tableHeading,
  shouldViewAllButtonRender = true,
  shouldFilterButtonRender = false,
  customComponent,
  getRowId,
  isLoading,
  isError,
  onRowClick
}: DataTablePropTypes) {
  const handleRowClick = (params: GridRowParams) => {
    onRowClick(params); // Call the onRowClick prop with the clicked row params
  };
  return (
    <Card
      sx={{
        backgroundColor: '#F5F6F9',
        border: 'white',
        boxShadow: 'unset',
        width: '100%',
        height: '100%'
      }}
    >
      <CardContent sx={{ padding: 0 }}>
        <div style={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={style}
            getRowId={getRowId}
            columns={columns}
            onRowClick={handleRowClick}
            loading={isLoading}
            rows={rows}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: pageSize
                }
              }
            }}
            autoHeight
            components={{
              Toolbar: () => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      marginTop: '10px',
                      width: '100%'
                    }}
                  >
                    <div style={{ flexGrow: '1' }}>
                      <h2 style={{ margin: '2%' }}>{tableHeading}</h2>
                    </div>
                    <Link href="/employee-attendance">
                      <Button
                        component="h6"
                        sx={{
                          color: 'blue',
                          textDecoration: 'underline',
                          padding: '1%',
                          margin: '1% 2%'
                        }}
                      >
                        {shouldViewAllButtonRender && 'View all'}
                      </Button>
                    </Link>

                    {customComponent}
                    {shouldFilterButtonRender && (
                      <div
                        style={{
                          padding: '0.5%',
                          margin: '1% 2%'
                        }}
                      >
                        <GridToolbarFilterButton
                          sx={{
                            border: 2,
                            borderColor: 'grey.200'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
