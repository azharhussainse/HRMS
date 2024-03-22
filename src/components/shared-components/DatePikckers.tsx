import * as React from 'react';
import { Dayjs } from 'dayjs';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { UseDateFieldProps } from '@mui/x-date-pickers/DateField';
import {
  BaseSingleInputFieldProps,
  DateValidationError,
  FieldSection
} from '@mui/x-date-pickers/models';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface ButtonFieldProps
  extends UseDateFieldProps<Dayjs>,
    BaseSingleInputFieldProps<
      Dayjs | null,
      Dayjs,
      FieldSection,
      DateValidationError
    > {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ButtonField(props: ButtonFieldProps) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { 'aria-label': ariaLabel } = {}
  } = props;

  return (
    <Button
      variant="outlined"
      size="small"
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.(prev => !prev)}
      sx={{
        textTransform: 'capitalize',
        fontSize: '0.6rem',
        fontWeight: 'bold',
        color: '#696969',
        border: '1.5px solid #1E90FF'
      }}
    >
      {label ?? 'Pick a date'}
      <ArrowDropDownIcon
        sx={{
          fontSize: 'small'
        }}
      />
    </Button>
  );
}

function ButtonDatePicker(
  props: Omit<DatePickerProps<Dayjs>, 'open' | 'onOpen' | 'onClose'>
) {
  const [open, setOpen] = React.useState(false);

  return (
    <DatePicker
      slots={{ field: ButtonField, ...props.slots }}
      slotProps={{ field: { setOpen } as any }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    />
  );
}

export default function PickerWithButtonField() {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={1}>
        <ButtonDatePicker
          label={`Date  ${value == null ? '' : ''}`}
          value={value}
          onChange={newValue => setValue(newValue)}
        />
      </Stack>
    </LocalizationProvider>
  );
}
