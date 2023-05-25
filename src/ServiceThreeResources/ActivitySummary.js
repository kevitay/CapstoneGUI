import React from "react";

export default function ActivitySummary({activity, setDisplayActivityDetails, setCloseActivityDetailsButton}) {
    const time = new Date(activity.StartTime); 
    const formattedTime = time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric'
    });

    return (
        <div>
            <h3 >{activity.ActivityName}</h3>
            <p >{activity.Description}</p>
            <p >Activity Start Time:{formattedTime}</p>
            <button  onClick={() => {setDisplayActivityDetails(activity); setCloseActivityDetailsButton(true)}}>Expand Details</button>
        </div>
    )
}; 