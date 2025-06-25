import { Link, useNavigate } from 'react-router'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'
import { AuthContainer, CardCostome, CustomeTextField } from '../../components'
import { registerSchema } from './../../validation/AuthValid'
import RegisterService from '../../services/RegisterService'

const Register = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      gender: '',
    },
  })

  const onSubmit = async (data) => {
    try {
      const response = await RegisterService(
        data.fullName,
        data.email,
        data.password,
        data.sdt,
        data.gender
      )
      console.log('Registration successful:', response)
      alert('Đăng ký thành công! Vui lòng nhập OTP.')
      navigate('/OTP')
    } catch (error) {
      console.error('Registration error:', error)
      alert(error.message || 'Đăng ký thất bại. Vui lòng thử lại.')
    }
  }

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
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl error={Boolean(errors.fullName)}>
              <CustomeTextField
                error={Boolean(errors.fullName)}
                helperText={errors.fullName?.message}
                type="text"
                label="Họ và tên"
                autoComplete="name"
                autoFocus
                required
                fullWidth
                variant="outlined"
                {...register('fullName')}
              />
            </FormControl>
            <FormControl error={Boolean(errors.gender)} fullWidth>
              <InputLabel id="gender-label">Giới tính *</InputLabel>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select {...field} labelId="gender-label" label="Giới tính *">
                    <MenuItem value="M">Nam</MenuItem>
                    <MenuItem value="F">Nữ</MenuItem>
                  </Select>
                )}
              />
              {errors.gender && (
                <FormHelperText>{errors.gender.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <CustomeTextField
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                type="text"
                label="Email"
                autoComplete="email"
                required
                fullWidth
                variant="outlined"
                {...register('email')}
              />
            </FormControl>
            <FormControl>
              <CustomeTextField
                error={Boolean(errors.sdt)}
                helperText={errors.sdt?.message}
                type="text"
                label="Số điện thoại"
                autoComplete="tel"
                required
                fullWidth
                variant="outlined"
                {...register('sdt')}
              />
            </FormControl>
            <FormControl>
              <CustomeTextField
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                label="Mật khẩu"
                type="password"
                autoComplete="new-password"
                required
                fullWidth
                variant="outlined"
                {...register('password')}
              />
            </FormControl>
            <FormControl>
              <CustomeTextField
                error={Boolean(errors.passwordconfirm)}
                helperText={errors.passwordconfirm?.message}
                label="Xác nhận mật khẩu"
                type="password"
                autoComplete="new-password"
                required
                fullWidth
                variant="outlined"
                {...register('passwordconfirm')}
              />
            </FormControl>

            <Button type="submit" fullWidth variant="contained">
              Đăng ký
            </Button>
          </Box>
          <Box>
            <Typography sx={{ textAlign: 'center' }}>
              Đã có tài khoản?{' '}
              <Link to="/login" variant="body2" sx={{ alignSelf: 'center' }}>
                Đăng nhập
              </Link>
            </Typography>
          </Box>
        </CardCostome>
      </AuthContainer>
    </>
  )
}

export default Register
