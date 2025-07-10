import React, { useState } from 'react'
import {
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Button,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

/**
 * UserMenu - Shared user/profile/logout menu for header/appbar
 * @param {object} props
 * @param {object} props.user - User object (must have .hoten or .name)
 * @param {function} props.onLogout - Logout handler
 * @param {function} [props.onProfile] - Profile handler (optional)
 * @param {string} [props.profileLabel] - Profile menu label (default: 'Thông tin cá nhân')
 * @param {boolean} [props.showName] - Show user name next to avatar (default: false)
 * @param {object} [props.avatarSx] - Avatar sx prop
 * @param {object} [props.buttonSx] - Button sx prop
 * @param {React.ReactNode} [props.buttonEndIcon] - End icon for button (default: KeyboardArrowDownIcon)
 * @param {Array} [props.menuItems] - Custom menu items (array of {label, icon, onClick, sx} or {divider:true})
 */
const UserMenu = ({
  user,
  onLogout,
  onProfile,
  profileLabel = 'Thông tin cá nhân',
  showName = false,
  avatarSx = {},
  buttonSx = {},
  buttonEndIcon = <KeyboardArrowDownIcon />,
  menuItems = [],
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const handleOpen = (e) => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const handleProfile = () => {
    handleClose()
    if (onProfile) onProfile()
  }
  const handleLogoutClick = () => {
    handleClose()
    if (onLogout) onLogout()
  }
  const displayName = user?.hoten || user?.name || 'User'
  const firstLetter = displayName[0]?.toUpperCase() || 'U'

  return (
    <>
      <Button
        onClick={handleOpen}
        endIcon={showName ? buttonEndIcon : null}
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
          '&:hover': { color: '#1976d2', backgroundColor: 'transparent' },
          ...buttonSx,
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: '#1976d2',
            fontSize: '1rem',
            ...avatarSx,
          }}
        >
          {firstLetter}
        </Avatar>
        {showName && displayName}
      </Button>
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
        {/* Custom menu items with divider support */}
        {menuItems &&
          menuItems.length > 0 &&
          menuItems.map((item, idx) =>
            item.divider ? (
              <Divider key={`divider-${idx}`} />
            ) : (
              <MenuItem
                key={idx}
                onClick={() => {
                  handleClose()
                  if (item.onClick) item.onClick()
                }}
                sx={{ gap: 2, ...item.sx }}
              >
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                {item.label}
              </MenuItem>
            )
          )}
        {menuItems && menuItems.length > 0 && <Divider />}
        {/* Profile */}
        {onProfile && (
          <MenuItem onClick={handleProfile} sx={{ gap: 2 }}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            {profileLabel}
          </MenuItem>
        )}
        {onProfile && <Divider />}
        {/* Logout */}
        <MenuItem
          onClick={handleLogoutClick}
          sx={{ gap: 2, color: 'error.main' }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </>
  )
}

export default UserMenu
