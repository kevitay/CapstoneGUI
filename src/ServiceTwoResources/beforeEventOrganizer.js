import React from "react";
import BeforeEvent from "./beforeEvent";
import { Button, Typography } from "@mui/material";

function OrganizerViewApp({ eventId }) {

    return (
        <>
            <Typography variant="h1">Add Essential Items</Typography>
            <BeforeEvent eventId={eventId} />
            <Button sx={{ width: 175 }} variant="contained" onSubmit={() => {  }}> Submit </Button>
        </>
    )
}

export default OrganizerViewApp;