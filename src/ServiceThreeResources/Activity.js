import React from "react";

export default function Activity({activity}) {
    

    return (
        <div>
            <h2>{activity.ActivityName}</h2>
            <p>{activity.Description}</p>
            <p>Activity Start Time:{activity.StartTime} - Activity End Time: {activity.EndTime}</p>
        </div>
    )
}; 