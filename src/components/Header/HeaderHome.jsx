import { Link, useNavigate } from 'react-router'
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Button,
  Divider,
  ListItemIcon,
} from '@mui/material'
import { useState, useEffect } from 'react'
import logoNimbus from '../../assets/Nimbus.png'
import MuiAlertCustom from '../MuiAlertCustom'
import UserMenu from '../UserMenu'

const NavButton = ({ to, children }) => (
  <Button
    component={Link}
    to={to}
    sx={{
      color: 'white',
      textTransform: 'none',
      fontSize: '16px',
      fontWeight: 500,
      '&:hover': {
        color: '#1976d2',
        backgroundColor: 'transparent',
      },
    }}
  >
    {children}
  </Button>
)

const HeaderHome = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        setUser(JSON.parse(userStr))
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
    // Auto logout after 15 minutes of inactivity
    let logoutTimer
    const resetTimer = () => {
      if (logoutTimer) clearTimeout(logoutTimer)
      logoutTimer = setTimeout(
        () => {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('user')
          setUser(null)
          navigate('/')
        },
        15 * 60 * 1000
      ) // 15 phút
    }
    // Reset timer on user activity
    window.addEventListener('mousemove', resetTimer)
    window.addEventListener('keydown', resetTimer)
    window.addEventListener('click', resetTimer)
    resetTimer()
    return () => {
      if (logoutTimer) clearTimeout(logoutTimer)
      window.removeEventListener('mousemove', resetTimer)
      window.removeEventListener('keydown', resetTimer)
      window.removeEventListener('click', resetTimer)
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    setUser(null)
    setAlert({
      open: true,
      message: 'Đăng xuất thành công!',
      severity: 'success',
    })
    setTimeout(() => {
      setAlert((prev) => ({ ...prev, open: false }))
      navigate('/')
    }, 1200)
  }

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{ backgroundColor: '#6ec2f7' }}
    >
      <Container>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box>
            <Link to="/">
              <img src={logoNimbus} alt="Logo" style={{ height: 90 }} />
            </Link>
          </Box>

          {/* Navigation */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <NavButton to="/">Trang chủ</NavButton>
            <NavButton to="/lich-kham">Lịch hẹn</NavButton>
            {/* <NavButton to="/services">Hồ sơ</NavButton>
            <NavButton to="/blog">Tài khoản</NavButton> */}
            <NavButton to="/contact">Liên hệ</NavButton>

            {/* User Menu or Login Button */}
            {user ? (
              <UserMenu
                user={user}
                onLogout={handleLogout}
                onProfile={() => navigate('/profile')}
                showName={true}
                avatarSx={{
                  width: 32,
                  height: 32,
                  bgcolor: '#1976d2',
                  fontSize: '1rem',
                }}
              />
            ) : (
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  ml: 2,
                  fontWeight: 600,
                }}
              >
                Đăng nhập
              </Button>
            )}
          </Box>
        </Toolbar>
        <MuiAlertCustom
          open={alert.open}
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          message={alert.message}
        />
      </Container>
    </AppBar>
  )
}

export default HeaderHome
