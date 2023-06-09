import React from "react";
import CurrentEvents from "./CurrentEvents";
import CreatorEvents from "../../ServiceOneResources/CreatorEvents";
import { Divider, Stack } from "@mui/material";
import { Container } from "@mui/system";

function MyEvents() {
    return (
        <Container maxWidth='lg'>
        <Stack spacing={5}>
        <CreatorEvents></CreatorEvents>
        <Divider/>
        <CurrentEvents></CurrentEvents>
        </Stack>
        </Container>
    )
}

export default MyEvents;