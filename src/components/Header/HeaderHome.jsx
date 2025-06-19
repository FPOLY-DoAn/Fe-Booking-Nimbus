import { Link } from 'react-router';
import { AppBar, Box, Container, Toolbar, Button } from '@mui/material';
import logoNimbus from '../../assets/Nimbus.png';

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
);

const HeaderHome = () => {
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
            <NavButton to="/services">Hồ sơ</NavButton>
            <NavButton to="/blog">Tài khoản</NavButton>
            <NavButton to="/contact">Liên hệ</NavButton>

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
              Đăng nhập
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HeaderHome;
