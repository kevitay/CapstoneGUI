import React from "react";
import BeforeEvent from "./beforeEvent";
import { Button, Typography } from "@mui/material";


function BeforeEventOrganizer({ eventId, setCreationStep }) {
    function handleEventClick() {
        setCreationStep(5);
    }
    return (
        <>
            <Typography variant="h4">Add Essential Items</Typography>
            <BeforeEvent eventId={eventId} />
            <Button sx={{ width: 175 }} variant="contained" onClick={() => { handleEventClick() }}> Submit </Button>
        </>
    )
}

export default BeforeEventOrganizer;