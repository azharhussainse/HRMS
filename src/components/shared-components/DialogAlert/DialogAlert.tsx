import React from 'react';
import {
  Box,
  Dialog as MUIDialog,
  DialogActions as MUIDialogActions,
  DialogContent as MUIDialogContent,
  DialogTitle as MUIDialogTitle,
  DialogContentText as MUIDialogContentText,
  Slide,
  Typography
} from '@mui/material';
import type {
  DialogContentTextProps as MUIDialogContentTextProps,
  DialogProps as MUIDialogProps,
  ButtonProps
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import RoundedButton from '../RoundedButton';

// eslint-disable-next-line react/display-name
const Transition = React.forwardRef(
  (
    props: TransitionProps & { children: React.ReactElement<unknown, string> },
    ref
  ) => {
    return <Slide direction="down" ref={ref} {...props} />;
  }
);

export type DialogAlertProps = {
  children: MUIDialogContentTextProps['children'];
  isDisabled?: boolean;
  isOpen: MUIDialogProps['open'];
  primaryButtonText?: string;
  onPrimaryButtonClick?: ButtonProps['onClick'];
  secondaryButtonText?: string;
  onSecondaryButtonClick?: ButtonProps['onClick'];
  title: string;
};

function DialogAlert({
  secondaryButtonText,
  children,
  isDisabled = false,
  isOpen,
  onSecondaryButtonClick,
  onPrimaryButtonClick,
  primaryButtonText,
  title
}: DialogAlertProps): JSX.Element {
  const shouldRenderSecondaryButton = React.useMemo(
    () => secondaryButtonText && onSecondaryButtonClick,
    [onSecondaryButtonClick, secondaryButtonText]
  );
  const shouldRenderPrimaryButton = React.useMemo(
    () => primaryButtonText && onPrimaryButtonClick,
    [onPrimaryButtonClick, primaryButtonText]
  );

  return (
    <MUIDialog open={isOpen} TransitionComponent={Transition}>
      <MUIDialogTitle>
        <Typography variant="h4">{title}</Typography>
      </MUIDialogTitle>
      <MUIDialogContent dividers={true}>
        <MUIDialogContentText>{children}</MUIDialogContentText>
      </MUIDialogContent>
      <MUIDialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flex: '1 1 100%',
          padding: '1.3333rem 2rem'
        }}
      >
        {shouldRenderSecondaryButton && (
          <Box
            component="span"
            sx={{
              mr: 'auto'
            }}
          >
            <RoundedButton
              onClick={onSecondaryButtonClick}
              color="secondary"
              variant="outlined"
              title={secondaryButtonText ?? ''}
            >
              {secondaryButtonText}
            </RoundedButton>
          </Box>
        )}
        {shouldRenderPrimaryButton && (
          <Box
            component="span"
            sx={{
              ml: 'auto'
            }}
          >
            <RoundedButton
              isDisabled={isDisabled}
              onClick={onPrimaryButtonClick}
              color="primary"
              title={primaryButtonText ?? ''}
            >
              {primaryButtonText}
            </RoundedButton>
          </Box>
        )}
      </MUIDialogActions>
    </MUIDialog>
  );
}

export default DialogAlert;
