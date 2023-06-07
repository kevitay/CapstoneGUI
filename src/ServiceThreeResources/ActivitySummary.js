import React from "react";

export default function ActivitySummary({activity, states, setStates}) {
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

            {!states.editForm && <button  onClick={() => {setStates.setDisplayActivityDetails(activity); setStates.setCloseActivityDetailsButton(true)}}>Expand Details</button>}
        </div>
    )
}; 