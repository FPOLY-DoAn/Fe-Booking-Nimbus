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
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { useState } from 'react';
import logoNimbus from '../../assets/Nimbus.png';
import logoNimbusDark from '../../assets/Nimbus_Dark.png';
import ThemeSwitcher from '../../components/ThemeSwitcher';

const DRAWER_WIDTH = 240;
const DRAWER_COLLAPSED_WIDTH = 65;

const NAVIGATION_ITEMS = [
  {
    path: '/admin',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    path: '/admin/orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

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
          <ThemeSwitcher />
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
  );
};

export default AdminLayout;
