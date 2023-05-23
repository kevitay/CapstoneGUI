import React, { useEffect, useState } from "react";
import Activities from "./Activities.json";
import ActivityList from "./ActivityList";
import ActivityDetails from "./ActivityDetails";
import DateSelector from "./DateSelector";
import CreateNewActivity from "./CreateNewActivity";
import CreateNewItinerary from "./CreateNewItinerary";

function Itinerary() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     setData(Activities);
//   }, [data]);

const [itineraryJSON, setItineraryJSON] = useState({activities:[]}); 
useEffect(()=> {
  console.log("Itinerary ", itineraryJSON)
}, [itineraryJSON]); 
const [activity, setActivity] = useState({}); 
const [dateArray, setDateArray] = useState([]); 
const [buttonDate, setButtonDate] = useState("");



return (
    <div className="Itinerary">
        <h2 style={{color:'red'}}>Create Itinerary Component</h2>
        <CreateNewItinerary itineraryJSON = {itineraryJSON} setItineraryJSON= {setItineraryJSON}/>

        <h2 style={{color:'red'}}>Create Activity Component</h2>
        <CreateNewActivity itineraryJSON = {itineraryJSON} setItineraryJSON= {setItineraryJSON}/>

        <h2 style={{color: 'red'}}>Date Selector Component</h2>
        <DateSelector dateArray = {dateArray} setButtonDate = {setButtonDate}/>

        <h2 style={{color: 'red'}}>Activity List Component</h2>
        <ActivityList activityList = {Activities} setActivity = {setActivity} setDateArray = {setDateArray} buttonDate={buttonDate} ></ActivityList> 
        
        <h2 style={{color: 'red'}}>Activity Details Component</h2>
        <ActivityDetails activity={activity}/> 
    </div>
  );
}
export default Itinerary;