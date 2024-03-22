import React from 'react';
import { useDialog } from '@/hooks/useDialog';
import DialogAlert from '@/components/shared-components/DialogAlert';
import TextButton from '@/components/shared-components/TextButton';
import { useFormButton, BUTTON_TYPES } from '@/hooks/useFormButton';
import type { FormikValues } from 'formik';

export type HRMFormResetInitialValuesButtonProps = {
  children: React.ReactNode;
  confirmationTitle?: string;
  confirmationContent: React.ReactNode;
  isDisabled?: boolean;
  initialValuesObject?: FormikValues;
  tooltip?: string;
};

function HRMFormResetInitialValuesButton({
  children,
  isDisabled = false,
  confirmationContent,
  confirmationTitle = 'Reset Form',
  tooltip = 'Reset Button',
  initialValuesObject = {},
  ...props
}: HRMFormResetInitialValuesButtonProps): JSX.Element {
  const { isDialogOpen, openDialog, closeDialog } = useDialog();
  const { values, resetForm } = useFormButton<typeof initialValuesObject>({
    isDisabled,
    shouldRequireFieldUpdates: false,
    buttonType: BUTTON_TYPES.RESET
  });

  const handlePrimaryButtonClick = (): void => {
    resetForm({
      values: {
        ...values,
        ...initialValuesObject
      }
    });

    closeDialog();
  };

  return (
    <>
      <TextButton
        tooltip={tooltip}
        isDisabled={isDisabled}
        onClick={openDialog}
        {...props}
      >
        {children}
      </TextButton>
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

export default HRMFormResetInitialValuesButton;
