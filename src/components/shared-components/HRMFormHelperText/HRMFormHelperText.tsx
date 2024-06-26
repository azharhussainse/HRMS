import React from 'react';
import { useFormikContext } from 'formik';
import { Grid, Typography } from '@mui/material';
import {
  NewReleases as WarningIcon,
  VerifiedUser as VerifiedIcon,
  Report as FailIcon
} from '@mui/icons-material';

const helperStateMap = {
  fail: 'fail',
  error: 'error',
  valid: 'valid'
};

export type HRMFormHelperTextProps = {
  isFailedState?: boolean;
  isValidState?: boolean;
  errorText?: string;
  failText?: string;
  validText?: string;
};

function HRMFormHelperText({
  isFailedState = false,
  isValidState,
  errorText = 'There is an error in the form',
  failText = 'Cannot proceed',
  validText = 'All fields completed'
}: HRMFormHelperTextProps): JSX.Element {
  const { isValid } = useFormikContext();
  const { fail, error, valid } = helperStateMap;

  const getHelperTextType = () => {
    switch (true) {
      case isFailedState:
        return 'fail';
      case isValidState ?? isValid:
        return 'valid';
      default:
        return 'error';
    }
  };

  const helperTextType: keyof typeof helperStateMap = getHelperTextType();

  const getHelperTextIcon = () => {
    switch (helperTextType) {
      case 'fail':
        return FailIcon;
      case 'valid':
        return VerifiedIcon;
      default:
        return WarningIcon;
    }
  };

  const helperTextMap = {
    [valid]: validText,
    [error]: errorText,
    [fail]: failText
  };

  const Icon = getHelperTextIcon();
  const getColor = (helperTextType: keyof typeof helperStateMap) => {
    switch (helperTextType) {
      case 'fail':
        return 'var(--color-textErrorRed)';
      case 'valid':
        return 'var(--color-textSuccessGreen)';
      default:
        return 'var(--color-textWarningYellow)';
    }
  };

  return (
    <Grid
      container={true}
      justifyContent="flex-end"
      wrap="nowrap"
      sx={theme => {
        return {
          alignItems: 'center',
          p: `0 ${theme.spacing(2)}`,
          color: getColor(helperTextType)
        };
      }}
    >
      <Icon
        sx={theme => {
          return {
            mr: theme.spacing(1),
            fontSize: '22px'
          };
        }}
      />
      <Typography variant="subtitle2">
        {helperTextMap[helperTextType]}
      </Typography>
    </Grid>
  );
}

export default HRMFormHelperText;
