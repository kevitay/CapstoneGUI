import React, { useEffect, useState } from "react";
import ActivityList from "./ActivityList";
import ActivityDetails from "./ActivityDetails";
import DateSelector from "./DateSelector";
import CreateNewActivity from "./CreateNewActivity";
import { fetchFunction, ACTIONS } from "./FetchFunctions";

function Itinerary() {
  useEffect(() => {
    fetchFunction({dispatch: setItineraryJSON, type: ACTIONS.GET_ACTIVITIES});
  },[]);
  
const [itineraryJSON, setItineraryJSON] = useState({activities:[]});
const [displayActivityDetails, setDisplayActivityDetails] = useState({}); 
const [dateArray, setDateArray] = useState([]); 
const [buttonDate, setButtonDate] = useState("");
const [closeActivityDetailsButton, setCloseActivityDetailsButton] = useState(false); 
const [editForm, setEditForm] = useState(false)
const [dateObject, setDateObject] = useState({})

const dispatch = {itineraryJSON, setItineraryJSON}

const formatDate = function(date){
        const tempDate = new Date(date);
        const newDate = tempDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return newDate;
}

return (
    <div className="Itinerary">
        <h2 style={{color:'red'}}>Create Activity Component</h2>
        <CreateNewActivity dispatch= {dispatch}/>

        <h2 style={{color: 'red'}}>Date Selector Component</h2>
        <DateSelector formatDate={formatDate} dateArray = {dateArray} setButtonDate = {setButtonDate}/>

        <h2 style={{color: 'red'}}>Activity List Component</h2>
        <ActivityList formatDate={formatDate} dateObject={dateObject} setDateObject={setDateObject} dateArray={dateArray} editForm={editForm} setDisplayActivityDetails = {setDisplayActivityDetails} setDateArray = {setDateArray} buttonDate={buttonDate} setCloseActivityDetailsButton = {setCloseActivityDetailsButton} itineraryJSON = {itineraryJSON} ></ActivityList> 
        
        <h2 style={{color: 'red'}}>Activity Details Component</h2>
        <ActivityDetails editForm={editForm} setEditForm={setEditForm} dispatch={dispatch} displayActivityDetails={displayActivityDetails} setDisplayActivityDetails = {setDisplayActivityDetails} closeActivityDetailsButton = {closeActivityDetailsButton} setCloseActivityDetailsButton = {setCloseActivityDetailsButton}/> 
    </div>
  );
}
export default Itinerary;