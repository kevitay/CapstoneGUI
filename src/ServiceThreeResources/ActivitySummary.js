import React from "react";

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

            {!editForm && <button  onClick={() => {setDisplayActivityDetails(activity); setCloseActivityDetailsButton(true)}}>Expand Details</button>}
        </div>
    )
}; 