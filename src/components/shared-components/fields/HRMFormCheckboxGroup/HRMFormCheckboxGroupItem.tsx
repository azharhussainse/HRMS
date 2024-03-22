import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useForm } from '@/hooks/useForm';
import type { CheckboxProps } from '@mui/material';
import type { HRMFormOption } from 'types';

export type HRMFormCheckboxGroupItemProps = {
  /** The name of the group this checkbox is a part of */
  groupName: string;
  /** Label for the checkbox */
  label: string;
  /** Value for the checkbox */
  value: string | boolean | number;
  /** Function to call when input value is changed */
  onChange: CheckboxProps['onChange'];
  /** Whether this group item is part of a group displayed in a row */
  isRowDisplay?: boolean;
  /** Whether the checkbox is disabled */
  isDisabled?: boolean;
  /** Props for the checkbox input */
  inputProps?: CheckboxProps;
};

function HRMFormCheckboxGroupItem({
  groupName,
  label,
  value,
  onChange,
  isRowDisplay = false,
  isDisabled = false,
  inputProps = {}
}: HRMFormCheckboxGroupItemProps): JSX.Element {
  const {
    formikField: { field },
    fieldHelpers: { handleChange }
  } = useForm<
    HRMFormOption['value'][] | HRMFormOption['value'],
    React.ChangeEvent<HTMLInputElement>
  >({ name: groupName, onChange });

  const isChecked = React.useMemo(() => {
    if (Array.isArray(field.value)) {
      return field.value.includes(value.toString());
    }

    return !!field.value;
  }, [value, field]);

  return (
    <FormControlLabel
      sx={theme => ({
        mb: theme.spacing(1.5),
        mr: isRowDisplay ? theme.spacing(3.75) : undefined
      })}
      label={label}
      control={
        <Checkbox
          name={groupName}
          checked={isChecked}
          value={value}
          disabled={isDisabled}
          onChange={handleChange}
          {...inputProps}
        />
      }
    />
  );
}

export default HRMFormCheckboxGroupItem;
