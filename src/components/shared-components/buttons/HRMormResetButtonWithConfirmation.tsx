import React from 'react';
import { useDialog } from '@/hooks/useDialog';
import DialogAlert from '@/components/shared-components/DialogAlert';
import RoundedButton from '@/components/shared-components/RoundedButton';
import { useFormButton, BUTTON_TYPES } from '@/hooks/useFormButton';

export type HRMFormResetButtonWithConfirmationProps = {
  children: React.ReactNode;
  confirmationTitle?: string;
  confirmationContent: React.ReactNode;
  isDisabled?: boolean;
  buttonTitle?: string;
  onReset?: () => void;
  variant?: 'contained' | 'outlined';
};

function HRMFormResetButtonWithConfirmation({
  children,
  isDisabled = false,
  buttonTitle = 'Form Reset',
  confirmationContent,
  confirmationTitle = 'Reset Form',
  variant = 'contained',
  onReset
}: HRMFormResetButtonWithConfirmationProps): JSX.Element {
  const { isDialogOpen, openDialog, closeDialog } = useDialog();
  const { dirty, handleReset } = useFormButton({
    isDisabled,
    buttonType: BUTTON_TYPES.RESET,
    shouldRequireFieldUpdates: false
  });

  const handlePrimaryButtonClick = () => {
    handleReset();

    // optional function prop consumer can pass to handle any additional side effects when resetting form
    onReset && onReset();

    closeDialog();
  };

  return (
    <>
      <RoundedButton
        title={buttonTitle}
        isDisabled={isDisabled || !dirty}
        onClick={openDialog}
        variant={variant}
      >
        {children}
      </RoundedButton>
      <DialogAlert
        isOpen={isDialogOpen}
        title={confirmationTitle}
        primaryButtonText="Reset"
        onPrimaryButtonClick={handlePrimaryButtonClick}
        secondaryButtonText="Cancel"
        onSecondaryButtonClick={closeDialog}
      >
        {confirmationContent}
      </DialogAlert>
    </>
  );
}

export default HRMFormResetButtonWithConfirmation;
