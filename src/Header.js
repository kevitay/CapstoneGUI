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
import { useLocation } from "react-router-dom";

function Header() {
  const theme = useTheme();
  const colorMode = useContext(colorModeContext);
  const navigate = useNavigate();
  const location = useLocation()
  const [authState, authDispatch] = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState("");

  
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

  function handleCreateEvent() {
    //handles navigation to home page
    navigate("/serviceOne/createEventFlow");
  }

  function handleMyEventsClicked(){
    navigate("/myEvents/")
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
    navigate("/profile/");
    handleMenuClose()
  }
  const logout = (e) => {
    authDispatch({type: 'saveAuth', payload: {username: '', token: ''}})
    handleMenuClose();
    handleLogoClicked()

  }
  const fetchProfilePicture = (username) => {
        fetch('http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/users/' + username)
            .then(response => response.json())
            .then(result => {
                setImg(result.profilePicture);
            })
            .catch(error => console.log('error', error));
    };

 function handleProfilePic(image) {
  if (image === undefined) {
    return ''
  }
  return "data:image/jpg;base64," + image;
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
                {fetchProfilePicture(authState.username)}
                {" "}
                {(location.pathname === '/serviceOne/createEventFlow')? <></> :<Button variant='outlined' color='inherit' onClick={handleCreateEvent}>
                  Create Event
                </Button>}
                {(location.pathname === '/myEvents/') ? <></>:<Button variant='outlined' color='inherit' onClick={handleMyEventsClicked}>
                  My Events
                </Button>}
                <IconButton onClick={colorMode.toggleColorMode} color='inherit'>
                  {theme.palette.mode === "dark" ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
                <IconButton onClick={handleMenuClick}>
                <Avatar alt='My Profile' src={handleProfilePic(img)}/>
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
