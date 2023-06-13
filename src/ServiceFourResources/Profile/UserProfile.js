import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../IdentityResources/Contexts/AuthContext.js";
import { Typography } from "@mui/material";

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
      <div>
          <Typography variant="h4" sx={{}}>
            {userProfileState.firstName + " " + userProfileState.lastName}
          </Typography>
          <Typography variant="body1" sx={{}}>
            {userProfileState.city + ", " + userProfileState.state}
          </Typography>
          <Typography variant="body1" sx={{}}>
            {userProfileState.phoneNumber}
          </Typography>
      </div>
  );

  
}


export default UserProfile;
