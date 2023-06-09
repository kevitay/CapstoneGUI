import React, { useEffect, useState, useContext } from "react";
import ActivityList from "./ActivityList";
import ActivityDetails from "./ActivityDetails";
import DateSelector from "./DateSelector";
import CreateNewActivity from "./CreateNewActivity";
import { fetchFunction, ACTIONS } from "./FetchFunctions";
import AuthContext from '../IdentityResources/Contexts/AuthContext';



function Itinerary({eventId, creationStep, setCreationStep, userIsOwner}) {
  const [authState] = useContext(AuthContext);

  useEffect(() => {
    fetchFunction({dispatch: setItineraryJSON, type: ACTIONS.GET_ACTIVITIES, eventId});
  },[eventId]);
  
const [itineraryJSON, setItineraryJSON] = useState({activities:[]});
const [displayActivityDetails, setDisplayActivityDetails] = useState({}); 
const [dateArray, setDateArray] = useState([]); 
const [buttonDate, setButtonDate] = useState("");
const [closeActivityDetailsButton, setCloseActivityDetailsButton] = useState(false); 
const [editForm, setEditForm] = useState(false)

const states = {itineraryJSON, displayActivityDetails, dateArray, buttonDate, closeActivityDetailsButton, editForm, authState, userIsOwner};
const setStates = {setItineraryJSON, setDisplayActivityDetails, setDateArray, setButtonDate, setCloseActivityDetailsButton, setEditForm};

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
        {creationStep === 3 && <button onClick={() => setCreationStep(4)}>Next</button>}

        <h2 style={{color:'red'}}>Create Activity Component</h2>
        {userIsOwner && <CreateNewActivity states={states} setStates={setStates} eventId={eventId}/>}

        <h2 style={{color: 'red'}}>Date Selector Component</h2>
        <DateSelector formatDate={formatDate} states={states} setStates={setStates}/>

        <h2 style={{color: 'red'}}>Activity List Component</h2>
        <ActivityList formatDate={formatDate} states={states} setStates={setStates} setDateArray={setDateArray}/>
        
        <h2 style={{color: 'red'}}>Activity Details Component</h2>
        <ActivityDetails states={states} setStates={setStates}/> 
    </div>
  );
}
export default Itinerary;