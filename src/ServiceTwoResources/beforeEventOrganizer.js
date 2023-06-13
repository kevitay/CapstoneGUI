import React from "react";
import BeforeEvent from "./beforeEvent";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function BeforeEventOrganizer({ eventId, setCreationStep }) {
    const navigate = useNavigate();
    function handleEventClick() {
        setCreationStep(5);
        navigate(`/serviceOne/event/${eventId}`);
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