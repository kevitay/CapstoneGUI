import React, { useEffect, useState } from "react";
import ActivityList from "./ActivityList";
import ActivityDetails from "./ActivityDetails";
import DateSelector from "./DateSelector";
import CreateNewActivity from "./CreateNewActivity";
import CreateNewItinerary from "./CreateNewItinerary";

function Itinerary() {
const defaultItineraryForTesting = {activities:
[
    {
    "ActivityName": "Lunch",
    "ID": 123,
    "Description": "This is the activity description",
    "Outdoor": true,
    "ImageURL": "www.example.com/image",
    "ImportantReminder": "Don't forget to bring cash!",
    "GroupSize": 3,
    "Mandatory": false, 
    "Price": 120, 
    "Type": "Music",
    "URL": "www.example.com",
    "Address": "123 Example St",
    "City": "Normal",
    "State": "IL",
    "ZipCode": 61761,
    "StartTime": "1994-12-08T12:00:00-03:00",
    "EndTime": "2023-05-16T16:00:00-03:00" 
    },
    {
    "ActivityName": "Dinner",
    "ID": 456,
    "Description": "This is the activity description",
    "Outdoor": false,
    "ImageURL": "www.example.com/image",
    "ImportantReminder": "Don't forget to bring cash!",
    "GroupSize": 3,
    "Mandatory": false, 
    "Price": 120, 
    "Type": "Music",
    "URL": "www.example.com",
    "Address": "123 Example St",
    "City": "Normal",
    "State": "IL",
    "ZipCode": 61761,
    "StartTime": "1994-12-08T16:30:00-03:00",
    "EndTime": "2023-05-17T16:00:00-03:00" 
    }, 
    {
    "ActivityName": "Dessert",
    "ID": 789,
    "Description": "This is the activity description",
    "Outdoor": true,
    "ImageURL": "www.example.com/image",
    "ImportantReminder": "Don't forget to bring cash!",
    "GroupSize": 3,
    "Mandatory": false, 
    "Price": 120, 
    "Type": "Music",
    "URL": "www.example.com",
    "Address": "123 Example St",
    "City": "Normal",
    "State": "IL",
    "ZipCode": 61761,
    "StartTime": "1992-07-16T07:30:00-03:00",
    "EndTime": "2023-05-16T16:00:00-03:00" 
    }
]
}


const [itineraryJSON, setItineraryJSON] = useState(defaultItineraryForTesting); 
useEffect(()=> {
  console.log("Itinerary ", itineraryJSON)
}, [itineraryJSON]); 
const [activity, setActivity] = useState({}); 
const [dateArray, setDateArray] = useState([]); 
const [buttonDate, setButtonDate] = useState("");
const [closeActivityDetailsButton, setCloseActivityDetailsButton] = useState(false); 



return (
    <div className="Itinerary">
        <h2 style={{color:'red'}}>Create Itinerary Component</h2>
        <CreateNewItinerary itineraryJSON = {itineraryJSON} setItineraryJSON= {setItineraryJSON}/>

        <h2 style={{color:'red'}}>Create Activity Component</h2>
        <CreateNewActivity itineraryJSON = {itineraryJSON} setItineraryJSON= {setItineraryJSON}/>

        <h2 style={{color: 'red'}}>Date Selector Component</h2>
        <DateSelector dateArray = {dateArray} setButtonDate = {setButtonDate}/>

        <h2 style={{color: 'red'}}>Activity List Component</h2>
        <ActivityList activityList = {itineraryJSON} setActivity = {setActivity} setDateArray = {setDateArray} buttonDate={buttonDate} setCloseActivityDetailsButton = {setCloseActivityDetailsButton} itineraryJSON = {itineraryJSON} ></ActivityList> 
        
        <h2 style={{color: 'red'}}>Activity Details Component</h2>
        <ActivityDetails activity={activity} setActivity = {setActivity} closeActivityDetailsButton = {closeActivityDetailsButton} setCloseActivityDetailsButton = {setCloseActivityDetailsButton}/> 
    </div>
  );
}
export default Itinerary;