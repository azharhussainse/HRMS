import React from 'react';
import { Box, Typography, Button, Modal, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import IconTextField from '@/components/shared-components/fields/IconEndTextField';
import LockIcon from '@mui/icons-material/Lock';
import logo from '../../../public/asset/Allzone Technologies_FF-02.png';
import Image from 'next/image';
import { useDialog } from '@/hooks/useDialog';
<i></i>;
import { Close, Done } from '@mui/icons-material';

const card = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  background:
    'linear-gradient(153.31deg, #1273EB 1.1%, rgba(22, 180, 235, 0.4) 100%)',
  boxSizing: 'border-box',
  boxShadow: '0 5px 10px rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center'
};

const cardLeft = {
  flex: '0.6',
  padding: '20px'
};
const cardRight = {
  flex: '0.75',
  height: '100%',
  background: 'white',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)'
};

const leftCardTextField = {
  width: '430px'
};

const buttonStyle = {
  width: '229px',
  height: '48px',
  borderRadius: '20px',
  background: 'linear-gradient(90deg, #17CBEB 0%, #1273EB 100%)',
  color: 'white',

  fontWeight: '700',
  fontSize: '20px'
};

const initialValues = {
  newPassword: '',
  confirmNewPassword: ''
};

const ForgotPasswordValidationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('New Password is required'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm New Password is required')
});

function ForgotPassword() {
  const { isDialogOpen, openDialog, closeDialog } = useDialog(false);
  const formik = useFormik({
    initialValues,
    validationSchema: ForgotPasswordValidationSchema,
    onSubmit: async values => {
      // Handle the password reset process here, e.g., send the data to the backend for processing.
      openDialog();
    }
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        {/* Your JSX code for the forgot password page */}
        <Box sx={card}>
          <Box sx={cardLeft}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '30px'
              }}
            >
              {/* Title */}
              <Typography
                variant="h5"
                color="white"
                sx={{ fontSize: '36px', fontWeight: '700' }}
              >
                Forgot Password
              </Typography>
              {/* Description */}
              <Typography
                color="white"
                variant="h6"
                sx={{ fontSize: '24px', fontWeight: '400' }}
              >
                Please enter your new password
              </Typography>

              {/* New Password input field */}
              <IconTextField
                variant="outlined"
                label="New Password"
                sx={leftCardTextField}
                name="newPassword"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                iconEnd={<LockIcon sx={{ color: '#FFFFFF' }} />}
              />

              {/* Confirm New Password input field */}
              <IconTextField
                variant="outlined"
                label="Confirm New Password"
                sx={leftCardTextField}
                name="confirmNewPassword"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmNewPassword}
                iconEnd={<LockIcon sx={{ color: '#FFFFFF' }} />}
              />

              {/* Display validation errors */}
              {formik.errors.newPassword && formik.touched.newPassword && (
                <span style={{ color: 'red' }}>
                  {formik.errors.newPassword}
                </span>
              )}
              {formik.errors.confirmNewPassword &&
                formik.touched.confirmNewPassword && (
                  <span style={{ color: 'red' }}>
                    {formik.errors.confirmNewPassword}
                  </span>
                )}

              {/* Reset Password button */}
              <Button type="submit" sx={buttonStyle}>
                Reset Password
              </Button>
            </Box>
          </Box>
          <Box sx={cardRight}>
            {/* Your right card content */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
                position: 'absolute',
                top: '36%',
                left: '30%'
              }}
            >
              <Typography variant="h4" color="rgba(18, 123, 235, 1)">
                WELCOME TO HRMS
              </Typography>
              <Image src={logo} width="500px" height="300px" alt="Logo" />
            </Box>
          </Box>
        </Box>
      </form>
      <Modal open={isDialogOpen} onClose={closeDialog}>
        {/* Your dialog content goes here */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 356,
            height: 384,
            bgcolor: 'white',
            boxShadow: 24,
            p: 2,
            borderRadius: 3,
            outline: 'none' // Remove the outline on focus
          }}
        >
          <IconButton
            aria-label="close"
            onClick={closeDialog}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <Close sx={{ color: '#1273EB' }} />
          </IconButton>
          <Done
            sx={{
              height: '221px',
              width: '170px',
              marginLeft: '65px',
              marginTop: '40px',
              color: '#1273EB'
            }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: '400',
                align: 'center',
                color: '#1273EB'
              }}
            >
              Your Password has been reset
            </Typography>
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: '600',
                align: 'center',
                color: '#1273EB'
              }}
            >
              Successfully
            </Typography>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ForgotPassword;
