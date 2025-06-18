import { useState } from 'react';
import { Link } from 'react-router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { AuthContainer, CardCostome, CustomeTextField } from '../../components';



const Register = () => {
  const [emailError, setemailError] = useState(false);
  const [emailErrorMessage, setemailErrorMessage] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (event) => {
    if (emailError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const validateInputs = () => {
    const email = document.getElementById('email');

    let isValid = true;

     if (!email.value || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
      setemailError(true);
      setemailErrorMessage('Vui lòng nhập số điện thoại hợp lệ.');
      isValid = false;
    } else {
      setemailError(false);
      setemailErrorMessage('');
    }

    return isValid;
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <AuthContainer direction="column" justifyContent="space-between">
        <CardCostome variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: '100%',
              fontSize: 'clamp(2rem, 10vw, 2.15rem)',
              textAlign: 'center',
            }}
          >
            Đăng ký
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <CustomeTextField
                error={emailError}
                helperText={emailErrorMessage}
                id="fullName"
                type="text"
                name="fullName"
                label="Họ và tên"
                autoComplete="fullName"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <CustomeTextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="text"
                name="email"
                label="Email"
                autoComplete="email"
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl><FormControl>
              <CustomeTextField
                error={emailError}
                helperText={emailErrorMessage}
                id="sdt"
                type="text"
                name="sdt"
                label="Số điện thoại"
                autoComplete="sdt"
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <CustomeTextField
                error={emailError}
                helperText={emailErrorMessage}
                id="password"
                name="password"
                label="Mật khẩu"
                type="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
             <FormControl>
              <CustomeTextField
                error={emailError}
                helperText={emailErrorMessage}
                name="passwordconfirm"
                label="Xác nhận mật khẩu"
                type="password"
                id="passwordconfirm"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Đăng ký
            </Button>
          </Box>
          <Box>
            <Typography sx={{ textAlign: 'center' }}>
              Đã tài khoản?{' '}
              <Link to="/login" variant="body2" sx={{ alignSelf: 'center' }}>
                Đăng nhập
              </Link>
            </Typography>
          </Box>
        </CardCostome>
      </AuthContainer>
    </>
  );
}
export default Register;