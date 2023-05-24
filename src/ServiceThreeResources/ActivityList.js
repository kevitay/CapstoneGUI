import React, { useEffect } from "react";
import ActivitySummary from "./ActivitySummary";

export default function ActivityList({setDisplayActivityDetails, setDateArray, buttonDate, setCloseActivityDetailsButton, itineraryJSON}) {
    const activities = itineraryJSON.activities; 
    // console.log(activities)
    const dateObject = {}; 
    const dateArray = []; 
    for(let i = 0; i < activities.length; i++) {
        const currentActivityDate = activities[i].StartTime.slice(0,10); 
        if(dateObject[currentActivityDate]) {
            dateObject[currentActivityDate].push(activities[i])
        } else {
            dateObject[currentActivityDate] = [activities[i]]
            dateArray.push(currentActivityDate)
        }
    };

    dateArray.sort(); 

    // function filterDates(date){
    //     dateArray.filter(date)
    // }
    
    useEffect(()=> {
        setDateArray(dateArray)
    }, [itineraryJSON]); 

    // console.log(dateObject); 


    return (
        <div>
            <ul>
                {dateArray.map(date => (buttonDate === "" ? true : date === buttonDate) &&
                        <li key={date}><h2>{date}</h2>{dateObject[date].sort((a,b) => Date.parse(a.StartTime) - Date.parse(b.StartTime)).map((item, index) => <ActivitySummary key={index} activity = {item} setDisplayActivityDetails = {setDisplayActivityDetails} setCloseActivityDetailsButton = {setCloseActivityDetailsButton}/>)}</li> 
                        ) }
            </ul>
        </div>
    ); 
}