import React from "react";
import CurrentEvents from "./CurrentEvents";
import CreatorEvents from "../../ServiceOneResources/CreatorEvents";
import { Box, Divider, Stack } from "@mui/material";
import { Container } from "@mui/system";

function MyEvents() {
    const boxStyle = {
        background: "url(MapGirl.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        bgcolor: "#cfe8fc",
        height: "50vh",
        /* Add other desired background properties here */
      };
      
    return (
        <>
        <Box sx={boxStyle} />
           <Box/>
        <Container maxWidth='lg'>
        <Stack spacing={5}>
        <CreatorEvents></CreatorEvents>
        <Divider/>
        <CurrentEvents></CurrentEvents>
        </Stack>
        </Container>
        </>
    )
}

export default MyEvents;