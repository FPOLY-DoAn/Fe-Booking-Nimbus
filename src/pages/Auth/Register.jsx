import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Link } from 'react-router';
import { CustomeTextField } from '../../components';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
  borderRadius: 16,
}));


const RegisterContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

const Register = () => {
  const [phoneNumberError, setphoneNumberError] = useState(false);
  const [phoneNumberErrorMessage, setphoneNumberErrorMessage] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (event) => {
    if (phoneNumberError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      phoneNumber: data.get('phoneNumber'),
      password: data.get('password'),
    });
  };

  const validateInputs = () => {
    const phoneNumber = document.getElementById('phoneNumber');

    let isValid = true;

    if (
      !phoneNumber.value ||
      !/^(03|05|07|08|09)\d{8}$/.test(phoneNumber.value)
    ) {
      setphoneNumberError(true);
      setphoneNumberErrorMessage('Vui lòng nhập số điện thoại hợp lệ.');
      isValid = false;
    } else {
      setphoneNumberError(false);
      setphoneNumberErrorMessage('');
    }

    return isValid;
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <RegisterContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
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
                error={phoneNumberError}
                helperText={phoneNumberErrorMessage}
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                label="Số điện thoại"
                autoComplete="phoneNumber"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={phoneNumberError ? 'error' : 'primary'}
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
        </Card>
      </RegisterContainer>
    </>
  );
}
export default Register;