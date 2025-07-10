import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  useTheme,
  IconButton,
  Divider,
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import MenuIcon from '@mui/icons-material/Menu'
import GroupIcon from '@mui/icons-material/Group'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Outlet, useNavigate, useLocation } from 'react-router'
import { useState } from 'react'
import logoNimbus from '../../assets/Nimbus.png'
import logoNimbusDark from '../../assets/Nimbus_Dark.png'
import ThemeSwitcher from '../../components/ThemeSwitcher'
import UserMenu from '../../components/UserMenu'

const DRAWER_WIDTH = 240
const DRAWER_COLLAPSED_WIDTH = 65

const NAVIGATION_ITEMS = [
  {
    path: '/admin',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    path: '/admin/lich-lam-viec',
    title: 'Work Schedule',
    icon: <CalendarMonthIcon />,
  },
  {
    path: '/admin/quan-ly-bac-si',
    title: 'List Doctors',
    icon: <GroupIcon />,
  },
]

const AdminLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)
  const [admin, setAdmin] = useState(() => {
    const userStr = localStorage.getItem('user')
    if (userStr)
      try {
        return JSON.parse(userStr)
      } catch {
        return null
      }
    return null
  })

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    navigate('/login')
  }
  const handleProfile = () => {
    navigate('/admin/profile')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${isDrawerOpen ? DRAWER_WIDTH : DRAWER_COLLAPSED_WIDTH}px)`,
          ml: `${isDrawerOpen ? DRAWER_WIDTH : DRAWER_COLLAPSED_WIDTH}px`,
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          boxShadow: '1px 0 5px rgba(0, 0, 0, 0.1)',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ThemeSwitcher />
            <UserMenu
              user={admin}
              onLogout={handleLogout}
              onProfile={handleProfile}
              profileLabel="Chỉnh sửa hồ sơ"
              showName={false}
              avatarSx={{ width: 36, height: 36, bgcolor: '#1976d2' }}
              menuItems={[
                {
                  label: 'Lịch đã huỷ',
                  icon: <DashboardIcon fontSize="small" />,
                  onClick: () => navigate('/admin/lich-da-huy'),
                },
                {
                  divider: true,
                },
                {
                  label: 'Lịch làm việc',
                  icon: <CalendarMonthIcon fontSize="small" />,
                  onClick: () => navigate('/admin/lich-lam-viec'),
                },
              ]}
            />
          </Box>
        </Toolbar>
      </AppBar>
      {/* Sidebar */}
      <Drawer
        sx={{
          width: isDrawerOpen ? DRAWER_WIDTH : DRAWER_COLLAPSED_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isDrawerOpen ? DRAWER_WIDTH : DRAWER_COLLAPSED_WIDTH,
            boxSizing: 'border-box',
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: isDrawerOpen ? 'space-between' : 'center',
            alignItems: 'center',
            height: 64,
            minHeight: 64,
            px: isDrawerOpen ? 2 : 1,
          }}
        >
          {isDrawerOpen && (
            <img
              src={theme.palette.mode === 'dark' ? logoNimbusDark : logoNimbus}
              alt="Nimbus Logo"
              width={100}
              height={100}
            />
          )}
          <IconButton onClick={handleDrawerToggle}>
            {isDrawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
        <List>
          {NAVIGATION_ITEMS.map((item) => (
            <ListItem
              component="div"
              key={item.path}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: theme.palette.background.hover,
                },
                minHeight: 48,
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  color:
                    location.pathname === item.path
                      ? theme.palette.background.icon
                      : 'inherit',
                  minWidth: 0,
                  mr: isDrawerOpen ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {isDrawerOpen && (
                <ListItemText
                  primary={item.title}
                  sx={{
                    opacity: 1,
                    color:
                      location.pathname === item.path
                        ? theme.palette.background.icon
                        : 'inherit',
                  }}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>{' '}
      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          width: {
            sm: `calc(100% - ${isDrawerOpen ? DRAWER_WIDTH : DRAWER_COLLAPSED_WIDTH}px)`,
          },
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

export default AdminLayout
