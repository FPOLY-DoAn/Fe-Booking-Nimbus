import { Link, useNavigate } from 'react-router'
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
} from '@mui/material'
import { useState, useEffect } from 'react'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import logoNimbus from '../../assets/Nimbus.png'
import MuiAlertCustom from '../MuiAlertCustom'
// import MuiAlertCustom from './MuiAlertCustom'

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
  const [anchorEl, setAnchorEl] = useState(null)
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
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  // const handleLogout = () => {
  //   localStorage.removeItem('token')
  //   localStorage.removeItem('user')
  //   setUser(null)
  //   handleClose()
  //   navigate('/')
  // }
   const handleLogout = () => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      setUser(null)
    handleClose()
      setAlert({
        open: true,
        message: 'Đăng xuất thành công!',
        severity: 'success',
      })
      setTimeout(() => {
        navigate('/')
      }, 1200)
    }

  const renderUserMenu = () => (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      PaperProps={{
        sx: {
          mt: 1,
          width: 250,
          borderRadius: 2,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        },
      }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      disablePortal
    >
      <MenuItem
        onClick={handleClose}
        component={Link}
        to="/profile"
        sx={{ gap: 2 }}
      >
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        Thông tin cá nhân
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout} sx={{ gap: 2, color: 'error.main' }}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" color="error" />
        </ListItemIcon>
        Đăng xuất
      </MenuItem>
    </Menu>
  )

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
              <>
                <Button
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    textTransform: 'none',
                    color: '#333',
                    fontSize: '16px',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1,
                    minWidth: 'unset',
                    '&:hover': {
                      color: '#1976d2',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: '#1976d2',
                      fontSize: '1rem',
                    }}
                  >
                    {(user.hoten || 'U')[0].toUpperCase()}
                  </Avatar>
                  {user.hoten || 'User'}
                </Button>
                {renderUserMenu()}
              </>
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
