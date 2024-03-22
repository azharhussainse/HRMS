import React, { useState } from 'react';
import {
  Grid,
  Typography,
  IconButton,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@mui/material';

type TableRowData = {
  date: string;
  checkIn: string;
  status: string;
  checkOut: string;
  workTime: string;
};

type TableData = {
  rows: TableRowData[];
};

type DateTableProps = {
  data: TableData;
  Date: string;
  Status: string;
  CheckIn: string;
  CheckOut: string;
  WorkTime: string;
};

export default function EmployeeAttendanceDetailTable({
  data,
  Date,
  Status,
  CheckIn,
  CheckOut,
  WorkTime
}: DateTableProps) {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none'}}>
      <Table>
        <TableHead
          style={{
            color: 'white',
            background: 'linear-gradient(90deg, #4DA7F0 64.06%, #83CFF5 100%)'
          }}
        >
          <TableRow>
            <TableCell sx={{ color: 'white' }}>{Date}</TableCell>
            <TableCell align="center" sx={{ color: 'white' }}>
              {Status}
            </TableCell>
            <TableCell align="center" sx={{ color: 'white' }}>
              {CheckIn}
            </TableCell>
            <TableCell align="center" sx={{ color: 'white' }}>
              {CheckOut}
            </TableCell>
            <TableCell align="center" sx={{ color: 'white' }}>
              {WorkTime}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.rows.map((row, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={8}>
                      <Typography variant="subtitle1">{row.date}</Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{row.checkIn}</TableCell>
                <TableCell align="center">{row.checkOut}</TableCell>
                <TableCell align="center">{row.workTime}</TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
