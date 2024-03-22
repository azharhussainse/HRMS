import React from 'react';
import DataTable from '@/components/shared-components/DataTable';
import type { GridColDef } from '@mui/x-data-grid';
import { Avatar, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEmployees } from '@/hooks/employee/useEmployees';
import { useDialog } from '@/hooks/useDialog';
import EmployeeAddDialog from '@/components/Employee/EmployeeAddDialog';
import EmployeeEditDialog from '@/components/Employee/EmployeeEditDialog';

export default function EmployeeInfoTable() {
  const {
    isDialogOpen: isAddEmployeeDialogOpen,
    closeDialog: closeAddEmployeeDialog,
    openDialog: openAddEmployeeDialog
  } = useDialog();
  const {
    isDialogOpen: isEditEmployeeDialogOpen,
    closeDialog: closeEditEmployeeDialog,
    openDialog: openEditEmployeeDialog
  } = useDialog();

  const { data: employees, isLoading, isError } = useEmployees();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || employees === undefined) {
    return <div>Something&apos;s wrong... Please try again</div>;
  }

  const columns: GridColDef[] = [
    {
      field: 'employeeCode',
      headerName: '#ID',
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'name',
      headerName: 'Employee Name',
      headerAlign: 'center',
      align: 'left',
      width: 200,
      renderCell: params => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <Avatar src={params.row.profile} />
          <span>{params.row.name} </span>
        </div>
      )
    },
    {
      field: 'fatherName',
      headerName: 'Father Name',
      headerAlign: 'center',
      align: 'center',
      width: 200
    },
    {
      field: 'cnic',
      headerName: 'CNIC',
      headerAlign: 'center',
      align: 'center',
      width: 200
    },
    {
      field: 'dob',
      headerName: 'DOB',
      headerAlign: 'center',
      align: 'center',
      width: 200
    },
    {
      field: 'email',
      headerName: 'Email',

      headerAlign: 'center',
      align: 'center',
      width: 200
    },
    {
      field: 'designation',
      headerName: 'Designation',

      headerAlign: 'center',
      align: 'center',
      width: 200
    },
    {
      field: 'mobile',
      headerName: 'Mobile',

      headerAlign: 'center',
      align: 'center',
      width: 200
    },
    {
      field: 'emergencyContact',
      headerName: 'Emergency Contact',

      headerAlign: 'center',
      align: 'center',
      width: 200
    },
    {
      field: 'dateOfConfirmation',
      headerName: 'Date Of Confirmation',

      headerAlign: 'center',
      align: 'center',
      width: 200
    },
    {
      field: 'dateOfJoining',
      headerName: 'Date Of Joining',

      headerAlign: 'center',
      align: 'center',
      width: 200
    },
    {
      field: 'currentAddress',
      headerName: 'Current Address',

      headerAlign: 'center',
      align: 'center',
      width: 200
    },
    {
      field: 'permanentAddress',
      headerName: 'Permanent Address',

      headerAlign: 'center',
      align: 'center',
      width: 200
    },
    {
      field: 'actions',
      headerName: 'Actions',

      headerAlign: 'center',
      align: 'center',
      renderCell: () => (
        <div>
          <IconButton
            color="primary"
            aria-label="Edit"
            onClick={openEditEmployeeDialog}
          >
            <EditIcon />
          </IconButton>
          <IconButton color="error" aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </div>
      )
    }
  ];

  return (
    <>
      <DataTable
        rows={employees}
        columns={columns}
        tableHeading="Employee Information"
        pageSize={10}
        shouldFilterButtonRender={true}
        shouldViewAllButtonRender={false}
        onRowClick={() => false}
        customComponent={
          <div style={{ display: 'flex' }}>
            <Button
              sx={{ margin: 'auto' }}
              variant="contained"
              color="primary"
              onClick={openAddEmployeeDialog}
            >
              Add Employee
            </Button>
          </div>
        }
        isLoading={isLoading}
        isError={isError}
      />
      {isAddEmployeeDialogOpen && (
        <EmployeeAddDialog
          isAddEmployeeDialogOpen={isAddEmployeeDialogOpen}
          closeAddEmployeeDialog={closeAddEmployeeDialog}
          openAddEmployeeDialog={openAddEmployeeDialog}
        />
      )}
      {isEditEmployeeDialogOpen && (
        <EmployeeEditDialog
          isEditEmployeeDialogOpen={isEditEmployeeDialogOpen}
          closeEditEmployeeDialog={closeEditEmployeeDialog}
          openEditEmployeeDialog={openEditEmployeeDialog}
        />
      )}
    </>
  );
}
