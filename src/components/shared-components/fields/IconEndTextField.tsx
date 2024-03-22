import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import { TextField } from '@mui/material';

export default function IconTextField({ iconEnd, InputProps, ...props }: any) {
  return (
    <TextField
      {...props}
      InputProps={{
        ...InputProps,
        endAdornment: iconEnd ? (
          <InputAdornment position="end">{iconEnd}</InputAdornment>
        ) : null
      }}
    />
  );
}
