import {
  AppBar,
  Avatar,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, {useState, useContext } from "react";
import { useTheme } from "@emotion/react";
import { colorModeContext } from "./ModeContext";
import AuthContext from "./IdentityResources/Contexts/AuthContext";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SailingIcon from "@mui/icons-material/Sailing";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Login from "./IdentityResources/Login";

function Header() {
  const theme = useTheme();
  const colorMode = useContext(colorModeContext);
  const navigate = useNavigate();
  const [authState, authDispatch] = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleLogoClicked() {
    //handles navigation to home page
    navigate("/");
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  function handleProfileClicked() {
    //handles navigation to profile page
    navigate("/profile");
    handleMenuClose()
  }
  const logout = (e) => {
    authDispatch({type: 'saveAuth', payload: {username: '', token: ''}})
    handleMenuClose()
  }

  return (
    <AppBar position='relative'>
      <Toolbar>
        <Stack direction='row' alignItems='center' justifyContent='space-between' flexGrow={1}>
          <Button
            variant='text'
            color='inherit'
            endIcon={<SailingIcon fontSize='large' />}
            onClick={handleLogoClicked}
          >
            SEEK
          </Button>
          <Stack direction='row' alignItems='center' spacing={1}>
            {!authState.token ? (
              <>
                <Button variant='outlined' color='inherit' onClick={handleClickOpen}>
                  Sign In
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogContent>
                    <Login handleClose={handleClose} />
                  </DialogContent>
                </Dialog>
                <Button variant='outlined' color='inherit' href='/identity/registration'>
                  Create Account
                </Button>
                <IconButton onClick={colorMode.toggleColorMode} color='inherit'>
                  {theme.palette.mode === "dark" ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
              </>
            ) : (
              <>
                {" "}
                <Button variant='outlined' color='inherit' href='/createEvent'>
                  Create Event
                </Button>
                <IconButton onClick={colorMode.toggleColorMode} color='inherit'>
                  {theme.palette.mode === "dark" ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
                <IconButton onClick={handleMenuClick}>
                <Avatar alt='My Profile'/>
                </IconButton>
                <Menu
                  id='basic-menu'
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleMenuClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleProfileClicked}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small"/>
                  </ListItemIcon>
                    <ListItemText>Profile</ListItemText></MenuItem>
                  <MenuItem  onClick={logout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small"/>
                  </ListItemIcon>
                    <ListItemText>Log Out</ListItemText></MenuItem>
                </Menu>
              </>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
