import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../IdentityResources/Contexts/AuthContext.js";
import { css } from "@emotion/react";
import { Typography, Paper } from "@mui/material";

const userProfileStyles = css`
  padding: 16px;
  max-width: 400px;
  margin: auto;
  margin-top: 24px;
`;

const nameStyles = css`
  margin-bottom: 8px;
  font-weight: bold;
`;

const infoStyles = css`
  margin-bottom: 4px;
`;

function UserProfile() {
  const [userProfileState, setUserProfile] = useState([]);
  const [authState,] = useContext(AuthContext);

  useEffect(() => {
    var requestOptions = {
      method: 'GET'
    };
    fetch("http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/users/" + authState.username, requestOptions)
      .then(response => response.json())
      .then(result => {
        setUserProfile(result);
      }).catch(error => console.log('error', error));
  }, [authState.username]);

  return (
    <Paper css={userProfileStyles}>
      <div>
        <Typography variant="h4" css={nameStyles}>
          {userProfileState.firstName + " " + userProfileState.lastName}
        </Typography>
        <Typography variant="body1" css={infoStyles}>
          {userProfileState.firstName + " " + userProfileState.lastName}
        </Typography>
        <Typography variant="body1" css={infoStyles}>
          {userProfileState.city + ", " + userProfileState.state}
        </Typography>
        <Typography variant="body1" css={infoStyles}>
          {userProfileState.phoneNumber}
        </Typography>
      </div>
    </Paper>
  );
}

export default UserProfile;
