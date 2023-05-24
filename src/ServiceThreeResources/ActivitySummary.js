import React from "react";

export default function ActivitySummary({activity, setActivity, setCloseActivityDetailsButton}) {
    return (
        <div>
            <h3 >{activity.ActivityName}</h3>
            <p >{activity.Description}</p>
            <p >Activity Start Time:{activity.StartTime}</p>
            <button  onClick={() => {setActivity(activity); setCloseActivityDetailsButton(true)}}>Expand Details</button>
        </div>
    )
}; 