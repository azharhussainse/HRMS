import React from 'react';
import { Grid } from '@mui/material';
import { setLocale } from 'yup';
import { Formik, Form } from 'formik';
import { useDebouncedCallback } from 'use-debounce';
import { useInitialRequiredErrors } from '@/hooks/useInitialRequiredErrors';
import type { AnyObjectSchema } from 'yup';
import type { GridProps } from '@mui/material';
import type {
  FormikHelpers,
  FormikConfig,
  FormikValues,
  FormikFormProps
} from 'formik';

setLocale({
  mixed: {
    required: 'Required'
  }
});

export type HRMFormProps<Values extends FormikValues> = {
  children: React.ReactNode;
  enableReinitialize?: boolean;
  initialValues: Values;
  muiGridProps?: GridProps;
  onSubmit: FormikConfig<Values>['onSubmit'];
  onReset?: FormikConfig<Values>['onReset'];
  validationSchema?: AnyObjectSchema;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  formProps?: FormikFormProps;
};

function HRMForm<Values extends FormikValues>({
  children,
  enableReinitialize = false,
  initialValues,
  muiGridProps = {},
  onSubmit,
  onReset,
  validationSchema,
  validateOnBlur,
  validateOnChange,
  formProps
}: HRMFormProps<Values>): JSX.Element {
  const initialErrors = useInitialRequiredErrors<Values>(
    validationSchema,
    initialValues
  );

  const handleSubmit = useDebouncedCallback(
    (values: Values, formikHelpers: FormikHelpers<Values>) =>
      onSubmit(values, formikHelpers),
    500,
    { leading: true, trailing: false }
  );

  return (
    <Formik<Values>
      enableReinitialize={enableReinitialize}
      initialErrors={initialErrors}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onReset={onReset}
      validationSchema={validationSchema}
      validateOnMount={true}
      validateOnBlur={validateOnBlur}
      validateOnChange={validateOnChange}
    >
      {_props => {
        return (
          <Form {...formProps}>
            <Grid
              {...muiGridProps}
              container={true}
              spacing={muiGridProps.spacing ?? 2}
            >
              {children}
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}

export default HRMForm;
