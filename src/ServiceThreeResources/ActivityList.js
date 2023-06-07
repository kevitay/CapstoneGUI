import React, { useEffect } from "react";
import ActivitySummary from "./ActivitySummary";

export default function ActivityList({formatDate, dateArray, dateObject, setDateObject, editForm, setDisplayActivityDetails, setDateArray, buttonDate, setCloseActivityDetailsButton, itineraryJSON}) {
    useEffect(()=> {   
    const tempDateObject = {}; 
    const tempDateArray = [];

        for (let i = 0; i < itineraryJSON.activities.length; i++) {
        const currentActivityDate = itineraryJSON.activities[i].startTime.slice(0, 16)
        if(tempDateObject[currentActivityDate]) {
            tempDateObject[currentActivityDate].push(itineraryJSON.activities[i])
        } else {
            tempDateObject[currentActivityDate] = [itineraryJSON.activities[i]]
            tempDateArray.push(currentActivityDate)
        }
    };

    tempDateArray.sort();
    
    setDateObject(tempDateObject)
    setDateArray(tempDateArray)
    }, [itineraryJSON, setDateArray, setDateObject]); 

    return (
        <div>
            <ul>
                {dateArray.map(date => (buttonDate === "" ? true : date === buttonDate) &&
                <li key={date}><h2>{formatDate(date)}</h2>{dateObject[date].sort((a,b) => Date.parse(a.startTime) - Date.parse(b.startTime)).map((item, index) => <ActivitySummary key={index} activity = {item} setDisplayActivityDetails = {setDisplayActivityDetails} editForm={editForm} setCloseActivityDetailsButton = {setCloseActivityDetailsButton}/>)}</li> 
    ) }
            </ul>
        </div>
    ); 
}