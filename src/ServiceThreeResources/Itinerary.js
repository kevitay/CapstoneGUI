import React, { useEffect, useReducer, useState } from "react";
import ActivityList from "./ActivityList";
import ActivityDetails from "./ActivityDetails";
import DateSelector from "./DateSelector";
import CreateNewActivity from "./CreateNewActivity";

export const ACTIONS = {
  GET_FETCH: 'get-fetch',
  GET_ACTIVITIES: 'get-activities',
  SET_ACTIVITIES: 'set-activities',
  GET_ACTIVITY: 'get-activity',
  CREATE_ACTIVITY: 'create-activity',
  UPDATE_ACTIVITY: 'update-activity',
  DELETE_ACTIVITY: 'delete-activity'
}

function Itinerary() {
const [itineraryJSON, dispatch] = useReducer(reducer, {activities:[]});
const [newState, setNewState] = useState({});

function reducer(itineraryJSON, action) {
  switch (action.type) {
    case ACTIONS.GET_FETCH : 
    {
      fetch(`http://a08cb134e19c8438285f05f4a630b6bd-117037464.us-west-2.elb.amazonaws.com/api/activities`)
      .catch((err)=> console.error(err))
      .then((response) => response.json())
      .then((data) => {console.log("API Data", data.activities)
      dispatch({type: ACTIONS.SET_ACTIVITIES, payload: data})
    })
    return itineraryJSON;
    }
    case ACTIONS.SET_ACTIVITIES :
      {
        return action.payload
      }
    // case ACTIONS.GET_ACTIVITY :
    // { let tempActivity;
    //   fetch(`http://a08cb134e19c8438285f05f4a630b6bd-117037464.us-west-2.elb.amazonaws.com/api/activities/${id}`)
    //   .catch((err)=> console.error(err))
    //   .then((response) => response.json())
    //   .then((data) => {tempActivity = data.activities} 
    //   )
    //   return {activities: tempActivity};
    // }
    case ACTIONS.CREATE_ACTIVITY : 
    { 
      fetch('http://a08cb134e19c8438285f05f4a630b6bd-117037464.us-west-2.elb.amazonaws.com/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.payload)
      })
        .then(response => response.json())
        .then(data => {
          console.log('POST request succeeded with JSON response:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
        return {activities: [...itineraryJSON.activities, action.payload]}
    }
    case ACTIONS.UPDATE_ACTIVITY :
      //UNDER CONSTRUCTION
      break;
    case ACTIONS.DELETE_ACTIVITY :
      //UNDER CONSTRUCTION
      break;
    default: return itineraryJSON;
  }
}

useEffect(() => {
 dispatch({type: ACTIONS.GET_FETCH})
 console.log("USE EFFECT", itineraryJSON)
},[]);

// useEffect(() => {
//   passedDown = itineraryJSON
// }  ,[itineraryJSON])

const [displayActivityDetails, setDisplayActivityDetails] = useState({}); 
const [dateArray, setDateArray] = useState([]); 
const [buttonDate, setButtonDate] = useState("");
const [closeActivityDetailsButton, setCloseActivityDetailsButton] = useState(false); 

return (
    <div className="Itinerary">
        <h2 style={{color:'red'}}>Create Activity Component</h2>
        <CreateNewActivity dispatch= {dispatch}/>

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