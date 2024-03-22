import React from 'react';
import HRMFormDialog from '../shared-components/HRMFormDialog/HRMFormDialog';
import HRMFormTextField from '../shared-components/fields/HRMFormTextField/HRMFormTextField';
import EmployeeAddSchema from 'validation/EmployeeAddSchema';
import { FormikHelpers } from 'formik';
import {
  Box,
  Button,
  Grid,
  Typography,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { useDesignations } from '@/hooks/Designation/useDesignations';
import { useAddEmployee } from '@/hooks/employee/useAddEmployee';
import { useRoles } from '@/hooks/Role/useRoles';
import type { RoleType } from 'types/RoleType';
import type { NewEmployeeType } from 'types/EmployeeType';
import HRMFormSelect from '../shared-components/fields/HRMFormSelect/HRMFormSelect';
import { useToasts } from 'react-toast-notifications';
import HRMFormFileField from '../shared-components/fields/HRMFormFileField/HRMFormFileField';

type EmployeeAddDialogProps = {
  isAddEmployeeDialogOpen: boolean;
  closeAddEmployeeDialog: () => void;
  openAddEmployeeDialog: () => void;
};
const initialEmployeeAddValues = {
  FullName: '',
  FatherName: '',
  DOB: new Date('2003-01-01'),
  CNIC: '',
  ProfilePictureFile: '',
  PersonalEmail: '',
  OfficialEmail: '',
  NiNumber: '',
  Mobile: '',
  Role: '',
  DesignationId: '',
  EmergencyContact: '',
  CurrentAddress: '',
  PermanentAddress: '',
  Email: '',
  Username: '',
  Password: '',
  DateOfConfirmation: new Date(),
  DateOfJoining: new Date()
};

function EmployeeAddDialog({
  openAddEmployeeDialog,
  closeAddEmployeeDialog,
  isAddEmployeeDialogOpen
}: EmployeeAddDialogProps) {
  const [activeStep, setActiveStep] = React.useState(0);
  const { addToast } = useToasts();
  const { isLoading, isError, data: designations } = useDesignations();
  const {
    isLoading: isRoleLoading,
    isError: isRoleError,
    data: roles
  } = useRoles();
  const addEmployeeMutation = useAddEmployee();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const steps = [
    'Credential Information',
    'Credential Information',
    'Document Information'
  ];

  const designationOptions = designations?.map(designation => ({
    value: designation.id,
    label: designation.name
  }));

  const roleOptions = roles?.map((role: RoleType) => ({
    value: role.name,
    label: role.name
  }));

  const handleSave = async (
    values: NewEmployeeType,
    formikHelpers: FormikHelpers<NewEmployeeType>
  ) => {
    formikHelpers.setSubmitting(true);

    const newEmployee = {
      FullName: values.FullName,
      FatherName: values.FatherName,
      CNIC: values.CNIC,
      DOB: values.DOB,
      ProfilePictureFile: values.ProfilePictureFile,
      PersonalEmail: values.PersonalEmail,
      OfficialEmail: values.OfficialEmail,
      NiNumber: values.NiNumber,
      Email: values.Email,
      DesignationId: values.DesignationId,
      Mobile: values.Mobile,
      EmergencyContact: values.EmergencyContact,
      DateOfConfirmation: values.DateOfConfirmation,
      DateOfJoining: values.DateOfJoining,
      CurrentAddress: values.CurrentAddress,
      PermanentAddress: values.PermanentAddress,
      Username: values.Username,
      Password: values.Password,
      Role: values.Role
    };

    await addEmployeeMutation.mutateAsync(newEmployee).finally(() => {
      formikHelpers.setSubmitting(false);
    });

    closeAddEmployeeDialog();
  };

  return (
    <HRMFormDialog
      title="Add Employee"
      initialValues={initialEmployeeAddValues}
      // validationSchema={EmployeeAddSchema}
      enableReinitialize={true}
      onSave={handleSave}
      isOpen={isAddEmployeeDialogOpen}
      onClose={closeAddEmployeeDialog}
      maxWidth="md"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{ width: '100%' }}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                StepIconProps={{
                  classes: {
                    active: 'step-active',
                    completed: 'step-completed'
                  }
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      {activeStep === 0 && (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ position: 'unset', padding: '2%', overflow: 'hidden' }}
        >
          <Grid item xs={6}>
            <HRMFormTextField
              label="Full Name"
              name="FullName"
              type="text"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <HRMFormTextField
              label="Father Name"
              name="FatherName"
              type="text"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <HRMFormFileField
              label="Profile Picture"
              name="ProfilePictureFile"
              type="file"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <HRMFormTextField
              label="CNIC"
              name="CNIC"
              type="text"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <HRMFormTextField
              label="NINumber"
              name="NiNumber"
              type="text"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <HRMFormTextField
              label="Date Of Birth"
              name="DOB"
              type="date"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <HRMFormTextField
              label="Official Email"
              name="OfficialEmail"
              type="email"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <HRMFormTextField
              label="Personal Email"
              name="PersonalEmail"
              type="email"
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              top: '-16px'
            }}
          >
            <Typography>Designation:</Typography>
            <HRMFormSelect
              name={'DesignationId'}
              options={designationOptions || []}
              isMulti={false}
            />
            {isLoading && <span>Loading...</span>}
            {isError && <span>Error loading designations.</span>}
          </Grid>
          <Grid item xs={6}>
            <HRMFormTextField
              label="Mobile"
              name="Mobile"
              type="text"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <HRMFormTextField
              label="Emergency Contact"
              name="EmergencyContact"
              type="text"
              variant="outlined"
            />
          </Grid>

          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              top: '-16px'
            }}
          >
            <Typography>Role:</Typography>
            <HRMFormSelect
              name={'Role'}
              options={roleOptions || []}
              isMulti={false}
            />
            {isRoleLoading && <span>Loading...</span>}
            {isRoleError && <span>Error Roles.</span>}
          </Grid>
          <Grid item xs={6}>
            <HRMFormTextField
              label="Current Address"
              name="CurrentAddress"
              type="text"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <HRMFormTextField
              label="Permanent Address"
              name="PermanentAddress"
              type="text"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="text" onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ borderRadius: '20px' }}
              >
                Next
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
      {activeStep === 1 && (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ position: 'unset', padding: '2%', overflow: 'hidden' }}
        >
          <Grid item xs={6}>
            <HRMFormTextField
              label="Email"
              name="Email"
              type="text"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <HRMFormTextField
              label="Username"
              name="Username"
              type="text"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <HRMFormFileField
              label="Document"
              name="Document"
              type="file"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <HRMFormTextField
              label="Date Of Confirmation"
              name="DateOfConfirmation"
              type="date"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <HRMFormTextField
              label="DateOfJoining"
              name="DateOfJoining"
              type="date"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="text" onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ borderRadius: '20px' }}
              >
                Next
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </HRMFormDialog>
  );
}

export default EmployeeAddDialog;
