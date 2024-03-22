import React from 'react';
import { Grid, InputAdornment, TextField, Button, Box } from '@mui/material';
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

function HRMFormTextField({
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
  const {
    formikField: { field },
    fieldState: { isFieldError, isFieldRequired },
    fieldHelpers: {
      handleBlur,
      handleChange: handleChangeHelper,
      HelperTextComponent
    }
  } = useForm({
    name,
    onBlur,
    onChange
  });
  const {
    handleDroppedFile,
    handleFileDialog,
    imageContainerRef,
    inputFileRef,
    openDialog,
    selectedFile,
    stopDragEvent
  } = useFileInput();

  const [valueLength, setValueLength] = React.useState(() => {
    if (typeof field.value === 'string') {
      return field.value.length;
    }

    return 0;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setValueLength(file.name.length);
      handleFileDialog(e);
      handleChangeHelper(e, file.name); // Pass the selected file name to handleChangeHelper
    } else {
      setValueLength(e.target.value.length);
      handleChangeHelper(e); // Pass an empty string when no file is selected
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
      {type === 'file' ? (
        <Box sx={{ display: 'flex' }}>
          <input
            type="file"
            accept="image/*"
            ref={inputFileRef}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ display: 'none' }}
          />
          <TextField
            id={toKebabCase(name)}
            sx={{ marginRight: '0.5rem' }}
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
                <InputAdornment position="start">
                  {startAdornment}
                </InputAdornment>
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
            label={labelText}
            helperText={!isDisabled && displayHelperText && HelperTextComponent}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
            required={isFieldRequired}
            value={selectedFile || 'Choose the file' || field.value}
            {...muiFieldProps}
          />
          <Button
            variant="contained"
            color="primary"
            size="medium"
            sx={{ height: '50%', marginTop: '2%' }}
            startIcon={<CloudUploadIcon />}
            onClick={openDialog} // Trigger file input element click
          >
            Upload
          </Button>
        </Box>
      ) : (
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
          onChange={handleChange}
          onBlur={handleBlur}
          required={isFieldRequired}
          value={field.value}
          {...muiFieldProps}
        />
      )}
    </Grid>
  );
}

export default HRMFormTextField;
