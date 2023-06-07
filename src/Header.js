import { AppBar, Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { useTheme } from "@emotion/react";
import { colorModeContext } from "./ModeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SailingIcon from "@mui/icons-material/Sailing";
import Login from "./IdentityResources/Login";

function Header() {
  const theme = useTheme();
  const colorMode = useContext(colorModeContext);
  const navigate = useNavigate();

  function handleLogoClicked() {
    //handles navigation to home page
    navigate("/");
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            <Button variant='outlined' color='inherit'onClick={handleClickOpen}>
              Sign In
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogContent>
                <Login handleClose={handleClose}/>
              </DialogContent>
            </Dialog>
            <Button variant='outlined' color='inherit' href='/createAccount'>
              Create Account
            </Button>
            <IconButton onClick={colorMode.toggleColorMode} color='inherit'>
              {theme.palette.mode === "dark" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
            <Avatar alt='My Profile' />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
