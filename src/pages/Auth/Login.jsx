import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import Checkbox from '@mui/material/Checkbox'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import {
  AuthContainer,
  CardCostome,
  CustomeTextField,
  MuiAlertCustom,
} from '../../components'
import { Box, Button, InputAdornment, IconButton } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../../validation/AuthValid'
import LoginService from '../../services/LoginService'
import { jwtDecode } from 'jwt-decode'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  const {
    register, // Hàm để đăng ký các trường input
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    try {
      const response = await LoginService(data.email, data.password)
      if (!response.success) {
        throw new Error(response.message)
      }
      const decoded = jwtDecode(response.data)
      console.log('Decoded JWT:', decoded) // Kiểm tra xem có trường role không
      localStorage.setItem('accessToken', response.data)
      // Xác định role từ các flag boolean trong token
      let role = 'user'
      if (decoded.isQuanLy) {
        role = 'admin'
      } else if (decoded.isLeTan) {
        role = 'receptionist'
      } else if (decoded.isBacSi) {
        role = 'doctor'
      } else if (decoded.isBenhNhan) {
        role = 'patient'
      }
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: data.email,
          hoten: decoded.hoten || 'User',
          role,
        })
      )
      setAlert({
        open: true,
        message: 'Đăng nhập thành công!',
        severity: 'success',
      })
      setTimeout(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user.role === 'admin') {
          navigate('/admin')
        } else {
          navigate('/')
        }
      }, 1200)
    } catch (error) {
      console.error('Login error:', error)
      setAlert({
        open: true,
        message: error.message || 'Đăng nhập thất bại. Vui lòng thử lại.',
        severity: 'error',
      })
    }
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)

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
            Đăng nhập
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
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
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                type="text"
                label="Email"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                {...register('email')} // tự động ánh giá trị email từ form vào đây (RHF tự động lắng nghe sự kiện thay đổi của input và cập nhật giá trị)
              />
            </FormControl>
            <FormControl>
              <CustomeTextField
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                label="Mật khẩu"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                {...register('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Nhớ mật khẩu"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
            <Link
              component="button"
              type="button"
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Quên mật khẩu?
            </Link>
          </Box>
          <Typography sx={{ textAlign: 'center' }}>
            Chưa có tài khoản?{' '}
            <Link to="/register" variant="body2" sx={{ alignSelf: 'center' }}>
              Tạo tài khoản
            </Link>
          </Typography>
        </CardCostome>
      </AuthContainer>
      <MuiAlertCustom
        open={alert.open}
        onClose={() => setAlert({ ...alert, open: false })}
        severity={alert.severity}
        message={alert.message}
      />
    </>
  )
}

export default Login
