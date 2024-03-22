import * as Yup from 'yup';

const EmployeeAddSchema = Yup.object().shape({
  fullName: Yup.string().required('Name is required'),
  fatherName: Yup.string().required('Father Name is required'),
  cnic: Yup.string()
    .matches(
      /^\d{5}-\d{7}-\d{1}$/,
      'CNIC must be in the format "12345-1234567-1"'
    )
    .required('CNIC is required'),
  niNumber: Yup.string()
    .matches(
      /^\d{5}-\d{7}-\d{1}$/,
      'niNumber must be in the format "12345-1234567-1"'
    )
    .required('CNIC is required'),
  dob: Yup.date().required('Date of Birth is required'),
  personalEmail: Yup.string()
    .email('Invalid email')
    .required('Personal Email is required'),
  officialEmail: Yup.string()
    .email('Invalid email')
    .required('Official Email is required'),
  // profile: Yup.string().required('Profile is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Official Email is required'),
  designation: Yup.string().required('Designation is required'),
  mobile: Yup.string()
    .matches(/^\d{11}$/, 'Mobile must be exactly 11 digits')
    .required('Mobile is required'),
  emergencyContact: Yup.string()
    .matches(/^\d{11}$/, 'Emergency Contact must be exactly 11 digits')
    .required('Emergency Contact is required'),
  dateOfConfirmation: Yup.date().required('Date of Confirmation is required'),
  dateOfJoining: Yup.date().required('Date of Joining is required'),
  currentAddress: Yup.string().required('Current Address is required'),
  permanentAddress: Yup.string().required('Permanent Address is required'),
  role: Yup.string().required('Role is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one special character, and one number'
    ),
  username: Yup.string().required('Username is required')
});

export default EmployeeAddSchema;
