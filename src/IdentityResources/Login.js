import { useContext, useState } from "react";
import AuthContext from "./Contexts/AuthContext";
import HostContext from "./Contexts/HostContext";
import { failedMessage, successMessage } from "./IdentityLib";
import "./Login.css";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = ({ handleClose }) => {
  const [, authDispatch] = useContext(AuthContext);
  const host = useContext(HostContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const processLogin = (e) => {
    e.preventDefault();
    console.log(username);
    const loginRequest = { username: username, password: password };
    const headers = {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(loginRequest),
    };
    authDispatch({ type: "saveAuth", payload: { username: "", token: "" } });
    const requestUrl = host.url + "/auth";
    fetch(requestUrl, headers).then((response) => {
      if (response.ok) {
        const authToken = response.headers.get("Authorization");
        setMessage(successMessage);
        authDispatch({ type: "saveAuth", payload: { username, token: authToken } });
        setUsername("");
        setPassword("");
        console.log(username)
        setTimeout(() => {
          handleClose();
        }, 100);
      } else {
        setMessage(failedMessage);
      }
    });
  };

  const usernameChange = (e) => {
    setUsername(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //     <form onSubmit={processLogin}>
  //     <label>Username
  //         <input type="text" name='username' id='username' value={username} onChange={usernameChange}></input>
  //     </label>
  //     <label>Password
  //         <input type="password" name='password' id='password' value={password} onChange={passwordChange}></input>
  //     </label>
  //     <button type="submit">Login</button>
  //     <span>{message}</span>
  // </form>
  return (
    <div className='Login'>
      <h1>Login</h1>
      <form onSubmit={processLogin}>
        <Stack spacing={4}>
        <FormControl sx={{ m: 1, width: "25ch" }} variant='standard'>
          <Input
            type='text'
            name='username'
            id='username'
            value={username}
            onChange={usernameChange}
            placeholder='Username'
            variant='standard'
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant='standard'>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <Input
            id='password'
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={passwordChange}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button variant='contained' type='submit'>
          Login
        </Button>
        <span>{message}</span>
        </Stack>
      </form>
    </div>
  );
};

export default Login;
