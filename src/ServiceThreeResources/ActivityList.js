import React from "react";
import ActivitySummary from "./ActivitySummary";

export default function ActivityList({activityList}) {
    const activities = activityList.activities; 
    // console.log(activities)
    const dateObject = {}; 
    const dateArray = []; 
    for(let i = 0; i < activities.length; i++) {
        const currentActivityDate = activities[i].StartTime.slice(0,10); 
        if(dateObject[currentActivityDate]) {
            dateObject[currentActivityDate].push(activities[i])
        } else {
            dateObject[currentActivityDate] = [activities[i]]
            dateArray.push(activities[i].StartTime.slice(0,10))
        }
    };

    dateArray.sort(); 
    // console.log(dateObject); 

    return (
        <div>
            <ul>
                {dateArray.map(date => <div><h2>{date}</h2>{dateObject[date].map((item, index) => <ActivitySummary key={index} activity ={item}/>)}</div>)}
            </ul>
        </div>
    ); 
}