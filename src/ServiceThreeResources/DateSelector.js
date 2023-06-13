import React from "react";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";

export default function DateSelector({formatDate, states, setStates}) {

    return (
        <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={() => setStates.setButtonDate("")}>Select All</Button>
            {states.dateArray.map((date, index) => <Button variant="contained" onClick={() => setStates.setButtonDate(date)} key={index}>{formatDate(date)}</Button>)}
        </Stack>
    )
}