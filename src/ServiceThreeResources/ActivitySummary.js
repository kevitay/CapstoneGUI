import React from "react";

export default function ActivitySummary({activity}) {
    

    return (
        <div>
            <h3>{activity.ActivityName}</h3>
            <p>{activity.Description}</p>
            <p>Activity Start Time:{activity.StartTime} - Activity End Time: {activity.EndTime}</p>
        </div>
    )
}; 