import React from 'react';
import HRMFormDialog from '../shared-components/HRMFormDialog/HRMFormDialog';
import HRMFormTextField from '../shared-components/fields/HRMFormTextField/HRMFormTextField';

type Props = {
  isEditEmployeeDialogOpen: boolean;
  closeEditEmployeeDialog: () => void;
  openEditEmployeeDialog: () => void;
};

function EmployeeEditDialog({
  openEditEmployeeDialog,
  closeEditEmployeeDialog,
  isEditEmployeeDialogOpen
}: Props) {
  return (
    <HRMFormDialog
      title="Update Employee"
      initialValues={{}}
      onSave={closeEditEmployeeDialog}
      isOpen={isEditEmployeeDialogOpen}
      onClose={closeEditEmployeeDialog}
    >
      <HRMFormTextField label="Name" name="name" />
      <HRMFormTextField label="Father Name" name="fatherName" />
      <HRMFormTextField label="CNIC" name="cnic" />
      <HRMFormTextField label="Date Of Birth" name="dob" type="date" />
      <HRMFormTextField label="Official Email" name="email" />
      <HRMFormTextField label="Designation" name="designation" />
      <HRMFormTextField label="Mobile" name="mobile" />
      <HRMFormTextField label="Emergency Contact" name="emergencyContact" />
      <HRMFormTextField
        label="Date of Confirmation"
        name="dateOfConfirmation"
      />
      <HRMFormTextField label="Date of Joining" name="dateOfJoining" />
      <HRMFormTextField label="Current Address" name="currentAddress" />
      <HRMFormTextField label="Permanent Address" name="permanentAddress" />
      <HRMFormTextField
        label="Passport Size Image"
        name="passportSizeImage"
        type="file"
      />
      <HRMFormTextField label="Offer Letter" name="offerLetter" type="file" />
      <HRMFormTextField label="NDA" name="nda" type="file" />
      <HRMFormTextField
        label="Experience Letter"
        name="experienceLetter"
        type="file"
      />
      <HRMFormTextField
        label="Increment Letter"
        name="incrementLetter"
        type="file"
      />
      <HRMFormTextField
        label="Termination Letter"
        name="terminationLetter"
        type="file"
      />
      <HRMFormTextField label="Degree/Transcript" name="Degree" type="file" />
      <HRMFormTextField label="Resume" name="resume" type="file" />
      <HRMFormTextField
        label="Appointment Letter"
        name="appointmentLetter"
        type="file"
      />
      <HRMFormTextField
        label="Hardware issuance form"
        name="hardwareIssuanceForm"
        type="file"
      />
      <HRMFormTextField
        label="Confirmation Letter"
        name="confirmationLetter"
        type="file"
      />
      <HRMFormTextField
        label="Resignation Letter"
        name="resignationLetter"
        type="file"
      />
    </HRMFormDialog>
  );
}

export default EmployeeEditDialog;
