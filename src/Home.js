import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import EventList from "./ServiceOneResources/EventList";

function Home() {
    const boxStyle = {
        background: "url(SailBoatM.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        bgcolor: "#cfe8fc",
        height: "50vh",
        /* Add other desired background properties here */
      };
    return (
        <div className="Home">
           <Box sx={boxStyle} />
           <Box/>
           <Typography variant="h3" color='inherit'sx={{padding:2, margin:1}}>Public Events</Typography>
           <Divider/>
           <EventList/>
        </div>
    )
}

export default Home;