import React, { useEffect, useState } from "react";
import ActivityList from "./ActivityList";
import ActivityDetails from "./ActivityDetails";
import DateSelector from "./DateSelector";
import CreateNewActivity from "./CreateNewActivity";
import CreateNewItinerary from "./CreateNewItinerary";

function Itinerary() {

const [itineraryJSON, setItineraryJSON] = useState({activities:[{startTime: 1}]}); 

const callingItinerary = ()=> {
  fetch(`http://a08cb134e19c8438285f05f4a630b6bd-117037464.us-west-2.elb.amazonaws.com/api/activities`)
  .catch((err)=> console.error(err))
  .then((response) => response.json())
  .then((data) => 
   {setItineraryJSON(data)
    console.log(data)}
  )
}

useEffect(() => {
 callingItinerary()
},[]);

const [displayActivityDetails, setDisplayActivityDetails] = useState({}); 
const [dateArray, setDateArray] = useState([]); 
const [buttonDate, setButtonDate] = useState("");
const [closeActivityDetailsButton, setCloseActivityDetailsButton] = useState(false); 



return (
    <div className="Itinerary">
        <h2 style={{color:'red'}}>Create Itinerary Component</h2>
        <CreateNewItinerary itineraryJSON = {itineraryJSON} setItineraryJSON= {setItineraryJSON}/>

        <h2 style={{color:'red'}}>Create Activity Component</h2>
        <CreateNewActivity itineraryJSON = {itineraryJSON} setItineraryJSON= {setItineraryJSON} callingItinerary = {callingItinerary}/>

        <h2 style={{color: 'red'}}>Date Selector Component</h2>
        <DateSelector dateArray = {dateArray} setButtonDate = {setButtonDate}/>

        <h2 style={{color: 'red'}}>Activity List Component</h2>
        <ActivityList setDisplayActivityDetails = {setDisplayActivityDetails} setDateArray = {setDateArray} buttonDate={buttonDate} setCloseActivityDetailsButton = {setCloseActivityDetailsButton} itineraryJSON = {itineraryJSON} ></ActivityList> 
        
        <h2 style={{color: 'red'}}>Activity Details Component</h2>
        <ActivityDetails displayActivityDetails={displayActivityDetails} setDisplayActivityDetails = {setDisplayActivityDetails} closeActivityDetailsButton = {closeActivityDetailsButton} setCloseActivityDetailsButton = {setCloseActivityDetailsButton}/> 
    </div>
  );
}
export default Itinerary;