import React, { useState, useRef } from 'react';
import { MouseEvent } from 'react';
import { GridCellParams, GridColDef, GridRowParams } from '@mui/x-data-grid';
import DataTable from '@/components/shared-components/DataTable';
import { Button, Grid, Modal, Typography } from '@mui/material';
import HrDashboardRightCards from '@/components/DashboardRightCards';
import { Avatar, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

export default function EmployeeLeavesInfoTable() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleRowClick = (params: GridRowParams) => {
    const employee = params.row;
    setSelectedEmployee(employee);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
  };

  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const renderModalContent = () => {
    if (!selectedEmployee) return null;

    const handleTypographyHover = (event: MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement;
      target.style.color = 'blue';
      target.style.textDecoration = 'underline';
    };

    const handleTypographyLeave = (event: MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement;
      target.style.color = '';
      target.style.textDecoration = 'none';
    };

    const {
      designation,
      name,
      profile,
      totalLeaves,
      availedLeaves,
      remainingLeaves
    } = selectedEmployee;

    return (
      <>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          style={{ background: 'white' }}
        >
          <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h5"
              component="h3"
              style={{ color: '#1273EB' }}
            >
              Leaves
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={6}
            justifyContent="flex-end"
            marginBottom="10px"
          >
            <Button color="primary">Edit</Button>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="center"
          marginBottom="20px"
        >
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Avatar
              src={profile}
              style={{
                width: '200px',
                height: '200px'
              }}
            />
            <IconButton
              style={{
                position: 'absolute',
                bottom: '4px',
                right: '7%',
                backgroundColor: '#1273EB',
                color: 'white'
              }}
            >
              <EditIcon />
            </IconButton>
          </div>

          <Typography
            variant="h4"
            component="h2"
            marginTop="10px"
            sx={{ color: '#1273EB' }}
          >
            {name}
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            marginTop="10px"
            onMouseEnter={handleTypographyHover}
            onMouseLeave={handleTypographyLeave}
          >
            {designation}
          </Typography>
        </Grid>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          style={{ background: 'white' }}
        >
          <Grid
            item
            xs={6}
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography
              variant="h5"
              component="h3"
              onMouseEnter={handleTypographyHover}
              onMouseLeave={handleTypographyLeave}
            >
              Total Leaves
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <div
              style={{
                padding: '10px',
                display: 'inline-block',
                marginRight: '15%'
              }}
            >
              <div
                style={{
                  border: '2px solid #1273EB',
                  borderRadius: '20%',
                  color: '#1273EB',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {totalLeaves}
              </div>
            </div>
          </Grid>
          <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h5"
              component="h3"
              onMouseEnter={handleTypographyHover}
              onMouseLeave={handleTypographyLeave}
            >
              Availed Leaves
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <div
              style={{
                padding: '10px',
                display: 'inline-block',
                marginRight: '15%'
              }}
            >
              <div
                style={{
                  border: '2px solid #1273EB',
                  borderRadius: '20%',
                  color: '#1273EB',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {availedLeaves}
              </div>
            </div>
          </Grid>
          <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h5"
              component="h3"
              onMouseEnter={handleTypographyHover}
              onMouseLeave={handleTypographyLeave}
            >
              Remaining Leaves
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <div
              style={{
                padding: '10px',
                display: 'inline-block',
                marginRight: '15%'
              }}
            >
              <div
                style={{
                  border: '2px solid #1273EB',
                  borderRadius: '20%',
                  color: '#1273EB',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {remainingLeaves}
              </div>
            </div>
          </Grid>
        </Grid>
      </>
    );
  };
  const dummyEmployees = [
    {
      id: 1,
      name: 'John Doe',
      designation: 'Software Engineer',
      totalLeaves: 14,
      availedLeaves: 12,
      remainingLeaves: 2
    },
    {
      id: 2,
      name: 'Jane Smith',
      designation: 'Product Manager',
      totalLeaves: 12,
      availedLeaves: 3,
      remainingLeaves: 9
    },
    {
      id: 3,
      name: 'Jane Smith',
      designation: 'Product Manager',
      totalLeaves: 12,
      availedLeaves: 3,
      remainingLeaves: 9
    },
    {
      id: 4,
      name: 'Jane Smith',
      designation: 'Product Manager',
      totalLeaves: 12,
      availedLeaves: 3,
      remainingLeaves: 9
    },
    {
      id: 5,
      name: 'Jane Smith',
      designation: 'Product Manager',
      totalLeaves: 12,
      availedLeaves: 3,
      remainingLeaves: 9
    },
    {
      id: 6,
      name: 'Jane Smith',
      designation: 'Product Manager',
      totalLeaves: 12,
      availedLeaves: 3,
      remainingLeaves: 9
    }
  ];

  const employees = dummyEmployees;

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: '#ID',
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'name',
      headerName: 'Employee Name',
      headerAlign: 'center',
      align: 'center',
      width: 192.8,
      renderCell: (params: GridCellParams) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}
          onClick={() => handleRowClick(params)}
        >
          <Avatar src={params.toString()} />
          <span>{params.row.name}</span>
        </div>
      )
    },
    {
      field: 'designation',
      headerName: 'Designation',
      headerAlign: 'center',
      align: 'center',
      width: 192.8
    },
    {
      field: 'totalLeaves',
      headerName: 'Total Leaves',
      headerAlign: 'center',
      align: 'center',
      width: 192.8
    },
    {
      field: 'availedLeaves',
      headerName: 'Availed Leaves',
      headerAlign: 'center',
      align: 'center',
      width: 192.8
    },
    {
      field: 'remainingLeaves',
      headerName: 'Remaining Leaves',
      headerAlign: 'center',
      align: 'center',
      width: 192.8
    }
  ];

  return (
    <>
      <Grid
        container
        columnSpacing={2}
        sx={{
          background: '#F5F6F9'
        }}
      >
        <Grid item xs={7} md={8.5} sx={{ marginTop: '0.5%' }}>
          <DataTable
            rows={employees}
            columns={columns}
            tableHeading="Leaves Status"
            pageSize={10}
            shouldFilterButtonRender={true}
            shouldViewAllButtonRender={false}
            onRowClick={handleRowClick}
            customComponent={undefined}
          />

          <Modal open={selectedEmployee !== null} onClose={handleCloseModal}>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                right: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'white',
                padding: '50px',
                width: '60%',
                maxWidth: '100%',
                maxHeight: 'calc(100vh - 100px)',
                overflow: 'auto'
              }}
              ref={modalRef}
              onClick={handleModalClick}
            >
              {renderModalContent()}
            </div>
          </Modal>
        </Grid>
        <Grid item xs={5} md={3.5}>
          <HrDashboardRightCards />
        </Grid>
      </Grid>
    </>
  );
}
