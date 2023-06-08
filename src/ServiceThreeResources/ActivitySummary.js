import React from "react";
import Button from "@mui/material/Button";

export default function ActivitySummary({editForm, activity, setDisplayActivityDetails, setCloseActivityDetailsButton}) {
    const time = new Date(activity.startTime); 
    const formattedTime = time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric'
    });

    return (
        <div>
            <h3 >{activity.activityName}</h3>
            <p >{activity.description}</p>
            <p >Activity Start Time:{formattedTime}</p>

            {!editForm && <Button  onClick={() => {setDisplayActivityDetails(activity); setCloseActivityDetailsButton(true)}} variant="contained">Expand Details</Button>}
        </div>
    )
}; 