import React, { useEffect, useReducer, useState } from "react";
import ActivityList from "./ActivityList";
import ActivityDetails from "./ActivityDetails";
import DateSelector from "./DateSelector";
import CreateNewActivity from "./CreateNewActivity";

export const ACTIONS = {
  FETCH_ACTIVITIES: 'fetch-activities',
  SET_ACTIVITIES: 'set-activities',
  CREATE_ACTIVITY: 'create-activity',
  UPDATE_ACTIVITY: 'update-activity',
  DELETE_ACTIVITY: 'delete-activity'
}

function Itinerary() {
const [itineraryJSON, dispatch] = useReducer(reducer, {activities:[]});

function reducer(itineraryJSON, action) {
  switch (action.type) {
    case ACTIONS.FETCH_ACTIVITIES : 
    {
      fetch(`http://a08cb134e19c8438285f05f4a630b6bd-117037464.us-west-2.elb.amazonaws.com/api/activities`)
      .catch((err)=> console.error(err))
      .then((response) => response.json())
      .then((data) => {
      dispatch({type: ACTIONS.SET_ACTIVITIES, payload: data})
    })
    return itineraryJSON;
    }
    case ACTIONS.SET_ACTIVITIES :
      {
        return action.payload
      }
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
      {      const id = action.payload.id;
        fetch(`http://a08cb134e19c8438285f05f4a630b6bd-117037464.us-west-2.elb.amazonaws.com/api/activities/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(action.payload)
        })
          .then(response => response.json())
          .then(data => {
            console.log('PATCH request succeeded with JSON response:', data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
  
        const updatedActivities = itineraryJSON.activities.filter(activity => activity.id !== id);
        updatedActivities.push(action.payload)
        return { ...itineraryJSON, activities: updatedActivities };}
      break;
    case ACTIONS.DELETE_ACTIVITY :
     {      const id = action.payload;
      fetch(`http://a08cb134e19c8438285f05f4a630b6bd-117037464.us-west-2.elb.amazonaws.com/api/activities/${id}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          console.log('DELETE request succeeded with JSON response:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });

      const updatedActivities = itineraryJSON.activities.filter(activity => activity.id !== id);
      return { ...itineraryJSON, activities: updatedActivities };}

    default: return itineraryJSON;
  }
}

useEffect(() => {
 dispatch({type: ACTIONS.FETCH_ACTIVITIES})
},[]);

const [displayActivityDetails, setDisplayActivityDetails] = useState({}); 
const [dateArray, setDateArray] = useState([]); 
const [buttonDate, setButtonDate] = useState("");
const [closeActivityDetailsButton, setCloseActivityDetailsButton] = useState(false); 
const [editForm, setEditForm] = useState(false)

return (
    <div className="Itinerary">
        <h2 style={{color:'red'}}>Create Activity Component</h2>
        <CreateNewActivity dispatch= {dispatch}/>

        <h2 style={{color: 'red'}}>Date Selector Component</h2>
        <DateSelector dateArray = {dateArray} setButtonDate = {setButtonDate}/>

        <h2 style={{color: 'red'}}>Activity List Component</h2>
        <ActivityList editForm={editForm} setDisplayActivityDetails = {setDisplayActivityDetails} setDateArray = {setDateArray} buttonDate={buttonDate} setCloseActivityDetailsButton = {setCloseActivityDetailsButton} itineraryJSON = {itineraryJSON} ></ActivityList> 
        
        <h2 style={{color: 'red'}}>Activity Details Component</h2>
        <ActivityDetails editForm={editForm} setEditForm={setEditForm} dispatch={dispatch} displayActivityDetails={displayActivityDetails} setDisplayActivityDetails = {setDisplayActivityDetails} closeActivityDetailsButton = {closeActivityDetailsButton} setCloseActivityDetailsButton = {setCloseActivityDetailsButton}/> 
    </div>
  );
}
export default Itinerary;