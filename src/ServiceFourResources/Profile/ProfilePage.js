import React from "react"; 
import UserProfile from "./UserProfile"; 
import ProfilePic from "./ProfilePic";
import './Profile.css';
import { Typography, CardContent, Card } from "@mui/material";

function ProfilePage() {
    return (
        <div style={{margin: '10%'}}>
        <Card sx={{ maxWidth: 500 }}>
          <CardContent>
            <Typography variant="h4">User Profile</Typography>
            <Typography sx={{ mb: 50 }} color="text.secondary">
                <ProfilePic></ProfilePic>
                <UserProfile></UserProfile>
            </Typography>
          </CardContent>
        </Card>
        </div>
      );
}



export default ProfilePage; 