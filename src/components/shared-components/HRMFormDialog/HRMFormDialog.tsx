import React from 'react';
import { Formik } from 'formik';
import HRMFormDialogInner from './HRMFormDialogInner';
import { useInitialRequiredErrors } from '@/hooks/useInitialRequiredErrors';
import type {
  FormikHelpers,
  FormikValues,
  FormikContextType,
  FormikConfig
} from 'formik';
import type { DialogProps, GridProps, ButtonProps } from '@mui/material';
import type { AnyObjectSchema } from 'yup';
import type { HRMFormDialogInnerProps } from './HRMFormDialogInner';
import type { HRMFormDialogTertiaryValue } from './types';

export type HRMFormDialogProps<Values extends FormikValues> = {
  cancelButtonText?: string;
  children: React.ReactNode;
  disableBackdropClick?: boolean;
  isDisabled?: boolean;
  isOpen: boolean;
  maxWidth?: DialogProps['maxWidth'];
  onClose: HRMFormDialogInnerProps<Values>['onClose'];
  onSave: (
    values: Values,
    formikHelpers: FormikHelpers<Values>
  ) => void | Promise<unknown>;
  onReset?: FormikConfig<Values>['onReset'];
  showSecondaryButton?: boolean;
  tertiaryStatus?: HRMFormDialogTertiaryValue;
  tertiaryButtonText?: string;
  onTertiaryClick?: (formikContext: FormikContextType<Values>) => void;
  tertiaryButtonVariant?: ButtonProps['variant'];
  shouldDisplaySaveButton?: boolean;
  saveButtonText?: string;
  title: string;
  enableReinitialize?: boolean;
  initialValues: Values;
  muiGridProps?: GridProps;
  shouldRequireFieldUpdates?: boolean;
  validationSchema?: AnyObjectSchema;
  helperText?: string;
  helperTextType?: 'fail' | 'error' | 'valid';
  throwAlertOnCancel?: boolean;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
};

function HRMFormDialog<Values extends FormikValues>({
  cancelButtonText = 'Cancel',
  children,
  disableBackdropClick = false,
  isDisabled = false,
  isOpen,
  maxWidth = 'sm',
  onClose,
  onSave,
  onReset,
  shouldDisplaySaveButton = true,
  saveButtonText = 'Save',
  tertiaryButtonText,
  title,
  enableReinitialize = false,
  initialValues,
  muiGridProps = {},
  shouldRequireFieldUpdates = false,
  validationSchema,
  showSecondaryButton = true,
  onTertiaryClick,
  tertiaryStatus = 'HIDE_BUTTON',
  tertiaryButtonVariant = 'outlined',
  helperText,
  helperTextType = 'error',
  throwAlertOnCancel = true,
  validateOnBlur,
  validateOnChange
}: HRMFormDialogProps<Values>): React.ReactElement {
  const initialErrors = useInitialRequiredErrors<Values>(
    validationSchema,
    initialValues
  );

  const [value, setValue] = React.useState<string | number>(3)

  return (
    <Formik
      enableReinitialize={enableReinitialize}
      initialErrors={initialErrors}
      initialValues={initialValues}
      onSubmit={onSave}
      onReset={onReset}
      validationSchema={validationSchema}
      validateOnMount={true}
      validateOnBlur={validateOnBlur}
      validateOnChange={validateOnChange}
    >
      <HRMFormDialogInner<Values>
        cancelButtonText={cancelButtonText}
        // eslint-disable-next-line react/no-children-prop
        children={children}
        disableBackdropClick={disableBackdropClick}
        isDisabled={isDisabled}
        isOpen={isOpen}
        maxWidth={maxWidth}
        onClose={onClose}
        shouldDisplaySaveButton={shouldDisplaySaveButton}
        saveButtonText={saveButtonText}
        shouldRequireFieldUpdates={shouldRequireFieldUpdates}
        title={title}
        muiGridProps={muiGridProps}
        showSecondaryButton={showSecondaryButton}
        tertiaryStatus={tertiaryStatus}
        tertiaryButtonText={tertiaryButtonText}
        onTertiaryClick={onTertiaryClick}
        tertiaryButtonVariant={tertiaryButtonVariant}
        helperText={helperText}
        helperTextType={helperTextType}
        throwAlertOnCancel={throwAlertOnCancel}
      />
    </Formik>
  );
}

export default HRMFormDialog;
