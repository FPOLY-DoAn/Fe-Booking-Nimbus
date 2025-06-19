import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import Checkbox from '@mui/material/Checkbox'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import { AuthContainer, CardCostome, CustomeTextField } from '../../components'
import { Box, Button } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../../validation/AuthValid'
import LoginService from '../../services/LoginService'
import {jwtDecode} from 'jwt-decode'

const Login = () => {
  const navigate = useNavigate()

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
      const decoded = jwtDecode(response)
    // console.log('Thông tin giải mã:', decoded)
    // console.log('Họ tên:', decoded.hoten)
      // Lưu token và thông tin user vào localStorage
      localStorage.setItem('token', response) 
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: data.email,
          hoten: decoded.hoten || 'User', 
        })
      )
      navigate('/')
      alert('Đăng nhập thành công!')
    } catch (error) {
      console.error('Login error:', error)
      alert(error.message || 'Đăng nhập thất bại. Vui lòng thử lại.')
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
                type="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                {...register('password')}
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
    </>
  )
}

export default Login
