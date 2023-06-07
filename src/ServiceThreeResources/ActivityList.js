import React, { useEffect, useState } from "react";
import ActivitySummary from "./ActivitySummary";

export default function ActivityList({formatDate, states, setStates, setDateArray}) {
    const [dateObject, setDateObject] = useState({});
    
    useEffect(()=> {   
    const tempDateObject = {}; 
    const tempDateArray = [];
    const activities = states.itineraryJSON.activities;

        for (let i = 0; i < activities.length; i++) {
        const currentActivityDate = activities[i].startTime.slice(0, 16)
        if(tempDateObject[currentActivityDate]) {
            tempDateObject[currentActivityDate].push(activities[i])
        } else {
            tempDateObject[currentActivityDate] = [activities[i]]
            tempDateArray.push(currentActivityDate)
        }
    };

    tempDateArray.sort();
    
    setDateObject(tempDateObject)
    setDateArray(tempDateArray)
    }, [states.itineraryJSON, setDateArray, setDateObject]); 


    
    return (
        <div>
            <ul>
                {states.dateArray.map(date => (states.buttonDate === "" ? true : date === states.buttonDate) &&
                <li key={date}><h2>{formatDate(date)}</h2>{dateObject[date].sort((a,b) => Date.parse(a.startTime) - Date.parse(b.startTime)).map((item, index) => <ActivitySummary key={index} activity = {item} states={states} setStates={setStates}/>)}</li> 
    ) }
            </ul>
        </div>
    ); 
}