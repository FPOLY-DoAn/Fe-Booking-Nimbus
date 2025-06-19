import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
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
import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema } from './../../validation/AuthValid'
import { register as registerApi } from '../../services/RegisterService'

const Register = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onChange', // Validate ngay khi người dùng nhập
  })
  const onSubmit = async (data) => {
    try {
      await registerApi(data)
      navigate('/login')
    } catch (error) {
      console.error('Registration error:', error)
      // TODO: Hiển thị thông báo lỗi cho người dùng
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
              <Select
                labelId="gender-label"
                label="Giới tính *"
                defaultValue=""
                {...register('gender')}
              >
                <MenuItem value="M">Nam</MenuItem>
                <MenuItem value="F">Nữ</MenuItem>
              </Select>
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
