import React from "react"; 
import UserProfile from "./UserProfile"; 
import ProfilePic from "./ProfilePic";
import Notifications from "../../ServiceTwoResources/notifications";
import './Profile.css';
import { Typography, CardContent, Card, Box, Grid } from "@mui/material";



function ProfilePage() {
    return (
        <div style={{margin: '10%'}}>
        <Card sx={{ maxWidth: 1000 }}>
          <CardContent>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item lg={4}>
                      <Typography sx={{ mb: 10 }}>
                        <ProfilePic></ProfilePic>
                      </Typography>
                    </Grid>
                    <Grid item lg={4}>
                    <Typography sx={{ mt: 10 }}>
                        <UserProfile></UserProfile>
                    </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Typography sx={{ mb: 50 }} color="text.secondary">
                <Notifications></Notifications>
            </Typography>
          </CardContent>
        </Card>
        </div>
      );
}



export default ProfilePage; 