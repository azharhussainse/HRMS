import React from 'react';
import type {
  GridColDef,
  GridRowIdGetter,
  GridRowParams
} from '@mui/x-data-grid';
import { Avatar } from '@mui/material';
import DataTable from '../shared-components/DataTable';
import EmployeeAttendanceStatus from '../Employee/EmployeeAttendanceStatus';
import { useAttendence } from '@/hooks/attendence/useAttendence';
import type { AttendanceType } from 'types/AttendanceType';
import { useDialog } from '@/hooks/useDialog';
import EmployeeAttendanceFullRecord from '../EmployeeAttendanceFullRecord';
const columns: GridColDef[] = [
  {
    field: 'employeeCode',
    headerName: 'ID',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'name',
    headerName: 'Employee Name',
    flex: 2,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'profile',
    headerName: 'Profile',
    flex: 2,
    headerAlign: 'center',
    align: 'center',
    renderCell: params => <Avatar src={params.value ? params.value.toString() : ''} />
  },
  {
    field: 'position',
    headerName: 'Position',
    flex: 2,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'mobile',
    headerName: 'Mobile',
    flex: 2,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 2,
    headerAlign: 'center',
    align: 'center',
    renderCell: params => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {params.value === 'Present' ? (
          <div
            style={{
              width: '0.75em',
              height: '0.75em',
              backgroundColor: '#6DD400'
            }}
          ></div>
        ) : (
          <div
            style={{
              width: '0.75em',
              height: '0.75em',
              backgroundColor: '#F03737'
            }}
          ></div>
        )}
        <span style={{ marginLeft: '0.5rem' }}>{params.value}</span>
      </div>
    )
  }
];

const EmployeeDataGrid: React.FC = () => {
  const { data: employees, isLoading, isError } = useAttendence();
  const {
    isDialogOpen: isEmployeeFullRecordDialogOpen,
    closeDialog: closeEmployeeFullRecordDialog,
    openDialog: openEmployeeFullRecordDialog
  } = useDialog();

  const getRowId: GridRowIdGetter<AttendanceType> = row => row.employeeCode;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || employees === undefined) {
    return <div>Something&apos;s wrong... Please try again</div>;
  }

  return (
    <>
      <DataTable
        rows={employees}
        columns={columns}
        tableHeading="Employee Attendance Status"
        pageSize={3}
        getRowId={getRowId}
        shouldFilterButtonRender={false}
        shouldViewAllButtonRender={true}
        onRowClick={openEmployeeFullRecordDialog}
      />
      {isEmployeeFullRecordDialogOpen && (
        <EmployeeAttendanceFullRecord
          isEmployeeFullRecordDialogOpen={isEmployeeFullRecordDialogOpen}
          closeEmployeeFullRecordDialog={closeEmployeeFullRecordDialog}
          openEmployeeFullRecordDialog={openEmployeeFullRecordDialog}
        />
      )}
    </>
  );
};

export default EmployeeDataGrid;
