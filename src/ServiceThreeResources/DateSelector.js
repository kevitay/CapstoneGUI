import React from "react";
import Button from "@mui/material/Button";

export default function DateSelector({formatDate, states, setStates}) {

    return (
        <div>
            <button onClick={() => setStates.setButtonDate("")}>Select All</button>
            {states.dateArray.map((date, index) => <button onClick={() => setStates.setButtonDate(date)} key={index}>{formatDate(date)}</button>)}
        </div>
    )
}