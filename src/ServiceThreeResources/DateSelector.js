import React from "react";
import Button from "@mui/material/Button";

export default function DateSelector({formatDate, states, setStates}) {

    return (
        <div>
            <Button variant="contained" onClick={() => setStates.setButtonDate("")}>Select All</Button>
            {states.dateArray.map((date, index) => <Button variant="contained" onClick={() => setStates.setButtonDate(date)} key={index}>{formatDate(date)}</Button>)}
        </div>
    )
}