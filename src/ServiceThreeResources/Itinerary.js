import React, { useEffect, useReducer, useState } from "react";
import ActivityList from "./ActivityList";
import ActivityDetails from "./ActivityDetails";
import DateSelector from "./DateSelector";
import CreateNewActivity from "./CreateNewActivity";
import CreateNewItinerary from "./CreateNewItinerary";

const ACTIONS = {
  GET_ACTIVITIES: 'get-activities',
  GET_ACTIVITY: 'get-activity', //Continue updating/adding this below
  CREATE_ACTIVITY: 'create-activity',
  UPDATE_ACTIVITY: 'update-activity',
  DELETE_ACTIVITY: 'delete-activity'
}

function Itinerary() {
const [itineraryJSON, dispatch] = useReducer(reducer, {activities:[{startTime: 1}]});

function reducer(itineraryJSON, action) {
  switch (action.type) {
    case ACTIONS.GET_ACTIVITIES : 
    { let tempActivities;
      fetch(`http://a08cb134e19c8438285f05f4a630b6bd-117037464.us-west-2.elb.amazonaws.com/api/activities`)
      .catch((err)=> console.error(err))
      .then((response) => response.json())
      .then((data) => {tempActivities = data.activities} 
      )
      return {activities: tempActivities};
    }
    case ACTIONS.CREATE_ACTIVITY : 
    { let tempActivity;
      fetch('http://a08cb134e19c8438285f05f4a630b6bd-117037464.us-west-2.elb.amazonaws.com/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(activityJSON)
      })
        .then(response => response.json())
        .then(data => {
          console.log('POST request succeeded with JSON response:', data);
          tempActivity = data
        })
        .catch(error => {
          console.error('Error:', error);
        });
        return {activities: [...itineraryJSON.activities, tempActivity]}
    }
    case ACTIONS.UPDATE_ACTIVITY :
      //UNDER CONSTRUCTION
      break;
    case ACTIONS.DELETE_ACTIVITY :
      //UNDER CONSTRUCTION
      break;
  }
}

useEffect(() => {
 dispatch ACTIONS.GET_ACTIVITIES
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