import React from 'react';
import { Grid, InputAdornment, TextField, Button, Box } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useForm } from '@/hooks/useForm';
import { toKebabCase } from '@/utils/index';
import type {
  TextFieldProps,
  InputProps,
  TextFieldVariants
} from '@mui/material';
import type Mask from 'types/MaskTypes';
import type { BaseFieldProps } from 'types';
import { useFileInput } from '@/hooks/useFileInput';

export type HRMFormTextFieldProps = BaseFieldProps & {
  placeholder?: string;
  isDisabled?: boolean;
  displayHelperText?: boolean;
  onBlur?: TextFieldProps['onBlur'];
  onChange?: TextFieldProps['onChange'];
  startAdornment?: React.ReactElement;
  endAdornment?: React.ReactElement;
  type?: string;
  InputProps?: InputProps;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> & { mask?: Mask };
  maxCharacters?: number;
  muiFieldProps?: TextFieldProps;
  multiline?: boolean;
  variant?: TextFieldVariants | undefined;
};

function HRMFormFileField({
  name,
  label,
  size = 'auto',
  isDisabled = false,
  displayHelperText = true,
  placeholder = '- -',
  onBlur,
  multiline = false,
  onChange,
  startAdornment,
  endAdornment,
  variant = 'standard',
  type = 'text',
  InputProps,
  inputProps = {},
  maxCharacters,
  muiFieldProps = {}
}: HRMFormTextFieldProps): React.ReactElement {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();
  const {
    fieldState: { isFieldError, isFieldRequired },
    fieldHelpers: { HelperTextComponent }
  } = useForm({
    name
  });

  const [valueLength, setValueLength] = React.useState(() => {
    if (typeof field.value === 'string') {
      return field.value.length;
    }

    return 0;
  });

  const convertToBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = error => {
        reject(error);
      };
    });
  };
  const handleImage = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target instanceof HTMLInputElement && e.target.files !== null) {
      const file = e.target.files[0];

      // check the size of the image

      const base64 = await convertToBase64(file);
      setFieldValue('image', base64);
    }
  };

  const maxCharactersValue = inputProps.maxLength || maxCharacters;
  const characterCounter = maxCharactersValue && (
    <small>
      : {valueLength}/{maxCharactersValue}
    </small>
  );

  const labelText = (
    <span>
      {label} {characterCounter}
    </span>
  );

  return (
    <Grid item={true} sm={size}>
      <TextField
        id={toKebabCase(name)}
        variant={variant}
        color="primary"
        disabled={isDisabled}
        error={isFieldError}
        fullWidth={true}
        multiline={multiline}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          ...InputProps,
          startAdornment: startAdornment ? (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ) : null,
          endAdornment: endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ) : null
        }}
        inputProps={{
          maxLength: maxCharacters,
          ...inputProps
        }}
        FormHelperTextProps={{ error: isFieldError }}
        name={name}
        type={type}
        label={labelText}
        helperText={!isDisabled && displayHelperText && HelperTextComponent}
        placeholder={placeholder}
        onChange={handleImage}
        required={isFieldRequired}
        value={undefined}
        {...muiFieldProps}
      />
    </Grid>
  );
}

export default HRMFormFileField;
