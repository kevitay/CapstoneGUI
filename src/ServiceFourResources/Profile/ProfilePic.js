import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../IdentityResources/Contexts/AuthContext.js";
import { Box, Button } from "@mui/material";
import ProfilePicUpload from "./ProfilePicUpload.js"

const ProfilePic = () => {
    const [authState] = useContext(AuthContext);
    const [img, setImg] = useState("");

    const fetchProfilePicture = (username) => {
        fetch('http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/users/' + username)
            .then(response => response.json())
            .then(result => {
                setImg(result.profilePicture);
            })
            .catch(error => console.log('error', error));
    };

    useEffect(() => {
        fetchProfilePicture(authState.username);
    }, [authState.username]);

    return (
        <div>
            <Box>
                <img src={"data:image/jpg;base64," + img} height="200px" width="200px" alt="profile pic" />
                <br></br>
                <ProfilePicUpload fetchProfilePicture={fetchProfilePicture}></ProfilePicUpload>
            </Box>
        </div>
    );
};

export default ProfilePic;