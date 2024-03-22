import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  Slide,
  useTheme
} from '@mui/material';
import { Form, useFormikContext } from 'formik';
import { useDialog } from '@/hooks/useDialog';
import RoundedButton from '@/components/shared-components/RoundedButton';
import DialogAlert from '@/components/shared-components/DialogAlert';
import HRMFormButton from '../buttons/HRMFormButton';
import HRMFormHelperText from '@/components/shared-components/HRMFormHelperText';
import type { DialogProps, GridProps, ButtonProps } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import type { TransitionProps } from '@mui/material/transitions';
import type { FormikContextType, FormikValues } from 'formik';
import type { HRMFormDialogTertiaryValue } from './types';

export type HRMFormDialogInnerProps<Values extends FormikValues> = {
  /** The secondary button text (Button located on left side of Dialog) */
  cancelButtonText?: string;
  /** The content to be rendered in the dialog body */
  children: React.ReactNode;
  /** If true, clicking the backdrop will not fire the onClose callback. */
  disableBackdropClick?: boolean;
  /** The current disabled state of the Dialog Save Button */
  isDisabled?: boolean;
  /** The current open/closed state of the Dialog */
  isOpen: boolean;
  /** Determine the max-width of the dialog. The dialog width grows with the size of the screen. Set to false to disable maxWidth. */
  maxWidth?: DialogProps['maxWidth'];
  /** Callback function invoked when the user clicks on the secondary button or outside the Dialog */
  onClose: (
    event: React.MouseEvent | undefined,
    reason?: 'backdropClick' | 'escapeKeyDown' | 'cancelClick'
  ) => void;
  shouldDisplaySaveButton: boolean;
  saveButtonText?: string;
  shouldRequireFieldUpdates?: boolean;
  title: string;
  tertiaryStatus: HRMFormDialogTertiaryValue;
  muiGridProps?: GridProps;
  showSecondaryButton?: boolean;
  tertiaryButtonText?: string;
  onTertiaryClick?: (formikContext: FormikContextType<Values>) => void;
  tertiaryButtonVariant?: ButtonProps['variant'];
  helperText?: string;
  helperTextType?: 'fail' | 'error' | 'valid';
  throwAlertOnCancel?: boolean;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<unknown, string> },
  ref: React.Ref<unknown>
) {
  const { children, ...rest } = props;
  return (
    <Slide direction="down" ref={ref} {...rest}>
      {children}
    </Slide>
  );
});

const stickyStyles = (theme: Theme) => ({
  position: 'sticky' as React.CSSProperties['position'],
  background: theme.palette.background.paper,
  Index: 1
});

const actionStyles = (theme: Theme) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flex: '1 1 100%',
  ...stickyStyles(theme),
  bottom: 0,
  borderTop: `1px solid #B3B3B3`,
  padding: '8px 16px',
  height: '47px'
});

const useClasses = (theme: Theme) => ({
  sticky: stickyStyles(theme),
  title: {
    ...stickyStyles(theme),
    top: 0,
    borderBottom: `1px solid #B3B3B3`,
    padding: '12px 16px',
    height: '49px'
  },
  action: actionStyles(theme),
  primaryAction: {
    ...actionStyles(theme),
    justifyContent: 'flex-end'
  },
  dialogContent: {
    overflowY: 'visible',
    padding: '16px 16px 32px 16px'
  }
});

function HRMFormDialogInner<Values extends FormikValues>({
  cancelButtonText,
  children,
  disableBackdropClick,
  isDisabled = false,
  isOpen,
  maxWidth,
  onClose,
  saveButtonText,
  tertiaryButtonText,
  shouldRequireFieldUpdates = false,
  title,
  muiGridProps,
  shouldDisplaySaveButton = true,
  showSecondaryButton = true,
  tertiaryStatus = 'HIDE_BUTTON',
  onTertiaryClick,
  tertiaryButtonVariant,
  helperText,
  helperTextType = 'error',
  throwAlertOnCancel = true
}: HRMFormDialogInnerProps<Values>): React.ReactElement {
  const theme = useTheme();
  const classes = useClasses(theme);
  const formikContext = useFormikContext<Values>();

  function getIsDisabled() {
    switch (tertiaryStatus) {
      case 'IS_DISABLED':
        return true;
      case 'FORM_VALIDATION_ONLY':
        return !formikContext.isValid;
      default:
        return false;
    }
  }

  const {
    isDialogOpen: isDialogAlertOpen,
    openDialog: openDialogAlert,
    closeDialog: closeDialogAlert
  } = useDialog();

  const handleCancel = (
    event: React.MouseEvent,
    reason?: 'backdropClick' | 'escapeKeyDown' | 'cancelClick'
  ) => {
    if (disableBackdropClick && reason === 'backdropClick') {
      return;
    }

    if (!formikContext.dirty || !throwAlertOnCancel) {
      onClose && onClose(event, reason);
    } else {
      openDialogAlert();
    }
  };

  const confirmCancel = () => {
    formikContext.resetForm();
    onClose && onClose(undefined, 'escapeKeyDown');
    closeDialogAlert();
  };

  const renderTertiaryButton = () => {
    return (
      <Grid
        container={true}
        justifyContent={showSecondaryButton ? 'space-between' : 'flex-end'}
      >
        {showSecondaryButton && (
          <Grid item={true}>
            <RoundedButton
              title={cancelButtonText || ''}
              onClick={(event: React.MouseEvent) =>
                handleCancel(event, 'cancelClick')
              }
              color="secondary"
              variant="outlined"
            >
              {cancelButtonText}
            </RoundedButton>
          </Grid>
        )}

        {helperText && renderHelperText()}
        <Grid item={true}>
          <span style={{ paddingRight: '20px' }}>
            <RoundedButton
              title={tertiaryButtonText || ''}
              isDisabled={getIsDisabled()}
              onClick={() => onTertiaryClick?.(formikContext)}
              type="button"
              variant={tertiaryButtonVariant}
            >
              {tertiaryButtonText}
            </RoundedButton>
          </span>
          {shouldDisplaySaveButton && (
            <HRMFormButton
              title={saveButtonText}
              isDisabled={isDisabled}
              shouldRequireFieldUpdates={shouldRequireFieldUpdates}
            >
              {saveButtonText}
            </HRMFormButton>
          )}
        </Grid>
      </Grid>
    );
  };

  const renderHelperText = () => {
    switch (helperTextType) {
      case 'fail':
        return (
          <Grid item={true}>
            <HRMFormHelperText isFailedState={true} failText={helperText} />
          </Grid>
        );
      case 'valid':
        return (
          <Grid item={true}>
            <HRMFormHelperText isValidState={true} validText={helperText} />
          </Grid>
        );
      default:
        return (
          <Grid item={true}>
            <HRMFormHelperText isValidState={false} errorText={helperText} />
          </Grid>
        );
    }
  };

  return (
    <>
      <Dialog
        maxWidth={maxWidth}
        open={isOpen}
        TransitionComponent={Transition}
        onClose={
          showSecondaryButton || disableBackdropClick ? handleCancel : undefined
        }
      >
        <Form>
          <DialogTitle sx={classes.title}>
            <Typography variant="h5">{title}</Typography>
          </DialogTitle>
          <DialogContent
            // DialongContent paddingTop is overwritten by some title styling. Applying directly
            // See: https://github.com/mui/material-ui/issues/27851#issuecomment-998996294
            // Known problem in MUI v5, as of @mui/material@5.9.2
            style={{
              paddingTop: '24px'
            }}
            sx={classes.dialogContent}
          >
            <Grid
              {...muiGridProps}
              container
              spacing={muiGridProps?.spacing ?? 2}
            >
              {children}
            </Grid>
          </DialogContent>
          <DialogActions
            sx={showSecondaryButton ? classes.action : classes.primaryAction}
          >
            {tertiaryStatus !== 'HIDE_BUTTON'
              ? renderTertiaryButton()
              : showSecondaryButton && (
                  <RoundedButton
                    title={cancelButtonText || ''}
                    onClick={(event: React.MouseEvent) =>
                      handleCancel(event, 'cancelClick')
                    }
                    color="secondary"
                    variant="outlined"
                  >
                    {cancelButtonText}
                  </RoundedButton>
                )}
            {tertiaryStatus === 'HIDE_BUTTON' && shouldDisplaySaveButton && (
              <>
                {helperText && renderHelperText()}
                <HRMFormButton
                  title={saveButtonText}
                  isDisabled={isDisabled}
                  shouldRequireFieldUpdates={shouldRequireFieldUpdates}
                >
                  {saveButtonText}
                </HRMFormButton>
              </>
            )}
          </DialogActions>
        </Form>
      </Dialog>

      <DialogAlert
        isOpen={isDialogAlertOpen}
        primaryButtonText="Continue"
        secondaryButtonText="Go Back"
        onPrimaryButtonClick={confirmCancel}
        onSecondaryButtonClick={closeDialogAlert}
        title={`Cancel Changes`}
      >
        You currently have unsaved changes which will be lost if you continue.
      </DialogAlert>
    </>
  );
}

export default HRMFormDialogInner;
