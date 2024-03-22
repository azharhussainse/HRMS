type LoginFormTypes = {
  username: string;
  password: string;
};
export default function LoginValidaionSchema(values: LoginFormTypes) {
  const errors: LoginFormTypes = {
    username: '',
    password: ''
  };

  if (!values.username) {
    errors.username = 'Username is required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)
  ) {
    errors.username = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is Required';
  } else if (values.password.length < 6 || values.password.length > 20) {
    errors.password = 'Must be greater then 8 and less then 20 charecters long';
  } else if (values.password.includes('')) {
    errors.password = 'Invalid Password';
  }
}
