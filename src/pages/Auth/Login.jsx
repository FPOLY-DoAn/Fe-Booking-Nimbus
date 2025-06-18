import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Checkbox from '@mui/material/Checkbox'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import { AuthContainer, CardCostome, CustomeTextField } from '../../components'
import { Box, Button } from '@mui/material'
import { loginService } from '../../services/LoginService'

const Login = () => {
  const navigate = useNavigate()
  const [emailError, setemailError] = useState(false)
  const [emailErrorMessage, setemailErrorMessage] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (emailError || passwordError) {
      return
    }

    const data = new FormData(event.currentTarget)
    const email = data.get('email')
    const password = data.get('password')

    if (!validateInputs()) {
      return
    }

    try {
      setLoading(true)
      const response = await loginService.login(email, password)
      // Lưu token vào localStorage hoặc state management system
      localStorage.setItem('token', response)
      // Redirect to home page or dashboard based on user role
      navigate('/')
      alert('Đăng nhập thành công!')
    } catch (error) {
      console.error('Login error:', error)
      // Hiển thị thông báo lỗi cho người dùng
      alert(error.message || 'Đăng nhập thất bại. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  const validateInputs = () => {
    const email = document.getElementById('email')
    const password = document.getElementById('password')

    let isValid = true

    if (!email.value || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
      setemailError(true)
      setemailErrorMessage('Vui lòng nhập email hợp lệ.')
      isValid = false
    } else {
      setemailError(false)
      setemailErrorMessage('')
    }

    if (!password.value || password.value.length < 3) {
      setPasswordError(true)
      setPasswordErrorMessage('Password must be at least 3 characters long.')
      isValid = false
    } else {
      setPasswordError(false)
      setPasswordErrorMessage('')
    }

    return isValid
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
                id="email"
                type="text"
                name="email"
                label="Email"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <CustomeTextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Nhớ mật khẩu"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
            <Link
              component="button"
              type="button"
              // onClick={handleClickOpen}
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
