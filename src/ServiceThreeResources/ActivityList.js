import React, { useEffect } from "react";
import ActivitySummary from "./ActivitySummary";

export default function ActivityList({activityList, setActivity, setDateArray, buttonDate}) {
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

    // function filterDates(date){
    //     dateArray.filter(date)
    // }
    
    useEffect(()=> {
        setDateArray(dateArray)
    }, []); 

    // console.log(dateObject); 


    return (
        <div>
            <ul>
                {buttonDate === "" ? dateArray.map(date => 
                    <li key={date}><h2>{date}</h2>{dateObject[date].sort((a,b) => Date.parse(a.StartTime) - Date.parse(b.StartTime)).map((item, index) => <ActivitySummary key={index} activity = {item} setActivity = {setActivity}/>)}</li> 
                    ) : dateArray.map(date => date === buttonDate &&
                        <li key={date}><h2>{date}</h2>{dateObject[date].sort((a,b) => Date.parse(a.StartTime) - Date.parse(b.StartTime)).map((item, index) => <ActivitySummary key={index} activity = {item} setActivity = {setActivity}/>)}</li> 
                        ) }
            </ul>
        </div>
    ); 
}