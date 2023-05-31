import React, { useEffect } from "react";
import ActivitySummary from "./ActivitySummary";

export default function ActivityList({setDisplayActivityDetails, setDateArray, buttonDate, setCloseActivityDetailsButton, itineraryJSON}) {
    const dateObject = {}; 
    const dateArray = []; 
        for (let i = 0; i < itineraryJSON.activities.length; i++) {
        console.log("For loop", itineraryJSON);
        const date = new Date(itineraryJSON.activities[i].startTime);
        const currentActivityDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        if(dateObject[currentActivityDate]) {
            dateObject[currentActivityDate].push(itineraryJSON.activities[i])
        } else {
            dateObject[currentActivityDate] = [itineraryJSON.activities[i]]
            dateArray.push(currentActivityDate)
        }
    };

    dateArray.sort(); 
    
    useEffect(()=> { 
            setDateArray(dateArray)
    }, [itineraryJSON]); 

    return (
        <div>
            <ul>
                {dateArray.map(date => (buttonDate === "" ? true : date === buttonDate) &&
                        <li key={date}><h2>{date}</h2>{dateObject[date].sort((a,b) => Date.parse(a.startTime) - Date.parse(b.startTime)).map((item, index) => <ActivitySummary key={index} activity = {item} setDisplayActivityDetails = {setDisplayActivityDetails} setCloseActivityDetailsButton = {setCloseActivityDetailsButton}/>)}</li> 
                        ) }
            </ul>
        </div>
    ); 
}