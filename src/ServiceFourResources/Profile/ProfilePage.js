import React from "react"; 
import UserProfile from "./UserProfile"; 
import ProfilePic from "./ProfilePic";
import './Profile.css';
import { Box, Paper, Typography } from "@mui/material";


function ProfilePage() {
    return (
        <Paper sx={{width:'100em'}}>
            <Box sx={{ml:'3em'}}>
            <Typography variant="h3">User Profile</Typography>
            <ProfilePic></ProfilePic>
            <UserProfile></UserProfile>
            </Box>
        </Paper>
        //
    )
}

export default ProfilePage; 