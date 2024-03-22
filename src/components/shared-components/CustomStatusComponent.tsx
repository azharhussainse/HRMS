import React from 'react';
import { Grid, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
type Items = {
  fontSize: string | string[];
  color: string;
  label: string;
  md: number;
};
type CustomStatusComponentPropType = {
  items: Items[];
};
const CustomStatusComponent = ({ items }: CustomStatusComponentPropType) => {
  return (
    <Grid container direction="row" alignItems="center">
      {items.map((item, index) => (
        <Grid item xs={6} md={item.md} key={index} sx={{ margin: '2px' }}>
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              border: '1px solid #E1E1E1',
              height: '42px',
              borderRadius: '2px',
              fontSize: item.fontSize
            }}
          >
            <FiberManualRecordIcon
              fontSize="small"
              sx={{ color: item.color }}
            />
            {item.label}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default CustomStatusComponent;
