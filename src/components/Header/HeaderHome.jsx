import { Link } from 'react-router';
import { AppBar, Box, Container, Toolbar, Button } from '@mui/material';
import logoNimbus from '../../assets/logoNimbus.png';

const NavButton = ({ to, children }) => (
  <Button
    component={Link}
    to={to}
    sx={{
      color: '#333',
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
);

const HeaderHome = () => {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{ backgroundColor: 'white' }}
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
            <NavButton to="/">Home</NavButton>
            <NavButton to="/admin">About</NavButton>
            <NavButton to="/admin/orders">Services</NavButton>
            <NavButton to="/blog">Blog</NavButton>
            <NavButton to="/contact">Contact</NavButton>

            {/* Get A Quote Button */}
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
              Login
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HeaderHome;
