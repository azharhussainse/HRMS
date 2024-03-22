import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Typography, Button } from '@mui/material';
import { useFormik } from 'formik';
import logo from '../../public/asset/AllZoneLogo.png';
import Image from 'next/image';
import LoginValidaionSchema from 'validation/LoginValidationSchema';
import IconTextField from '@/components/shared-components/fields/IconEndTextField';
import styles from '../../styles/login.module.css';
import { LoginFormTypes } from '../../src/types/LoginFormTypes';
import { loginInitialValues } from '../../src/utils/loginInitialValues';

function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const onSubmit = async (value: LoginFormTypes) => {
    const status = await signIn('credentials', {
      redirect: false,
      username: value.username,
      password: value.password,
      callbackUrl: '/'
    });
    if (status?.ok) {
      const url = status?.url;
      url ? router.push(url) : router.push('/');
    }
  };

  const formik = useFormik({
    initialValues: loginInitialValues,
    validate: LoginValidaionSchema,
    onSubmit
  });

  return (
    <Box className={styles.card}>
      <Box className={styles.cardLeft}>
        <form onSubmit={formik.handleSubmit}>
          <Box className={styles.loginDetails}>
            <Box className={styles.loginForm}>
              <Typography variant="h4" className={styles.textLogin}>
                Log In
              </Typography>
              <Typography variant="body1" className={styles.textLogin2}>
                Please enter your details
              </Typography>
            </Box>
            <IconTextField
              variant="outlined"
              label="Username"
              className={styles.leftCardTextField}
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              iconEnd={<PersonIcon sx={{ color: '#FFFFFF' }} />}
            />

            {formik.errors.username && formik.touched.username && (
              <span className={styles.error}>{formik.errors.username}</span>
            )}
            <IconTextField
              variant="outlined"
              label="Password"
              className={styles.leftCardTextField}
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              type={`${showPassword ? 'text' : 'password'}`}
              iconEnd={
                <VisibilityIcon
                  sx={{
                    color: `${showPassword ? '#1273EB' : '#FFFFFF'}`,
                    cursor: 'pointer'
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                />
              }
            />

            {formik.errors.password && formik.touched.password && (
              <span className={styles.error}>{formik.errors.password}</span>
            )}
            <Box className={styles.forgotPassword}>
              <Link href="/forgot-password">
                <Typography variant="body2" className={styles.forgotPassword2}>
                  Forgot Password?
                </Typography>
              </Link>
            </Box>
            <Button type="submit" className={styles.loginbutton}>
              Log In
            </Button>
          </Box>
        </form>
      </Box>
      <Box className={styles.cardRight}>
        <Box className={styles.cardRightDetails}>
          <Typography variant="h4" className={styles.cardRightDetails2}>
            WELCOME TO HRMS
          </Typography>
          <Image src={logo} width={300} height={250} alt="Logo" />
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
