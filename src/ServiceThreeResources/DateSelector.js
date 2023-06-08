import React from "react";
import Button from "@mui/material/Button";

export default function DateSelector({dateArray, setButtonDate}) {

    return (
        <div>
            <Button onClick={() => setButtonDate("")} variant="contained" >Select All</Button>
            {dateArray.map((date, index) => <Button variant="contained" onClick={() => setButtonDate(date)} key={index}>{date} </Button>)}
        </div>
    )
}