import React from "react";

export default function ActivitySummary({activity, setActivity}) {
    return (
        <div>
            <h3>{activity.ActivityName}</h3>
            <p>{activity.Description}</p>
            <p>Activity Start Time:{activity.StartTime}</p>
            <button onClick={() => setActivity(activity)}>Expand Details</button>
        </div>
    )
}; 