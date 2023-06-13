import React, { useEffect, useState, useContext } from "react";
import ActivityList from "./ActivityList";
import ActivityDetails from "./ActivityDetails";
import DateSelector from "./DateSelector";
import CreateNewActivity from "./CreateNewActivity";
import { fetchFunction, ACTIONS } from "./FetchFunctions";
import AuthContext from '../IdentityResources/Contexts/AuthContext';
import Button from "@mui/material/Button";

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
        // tempDate.setHours(23, 59, 59, 999);
        const newDate = tempDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
        });
        // newDate.day++;
        return newDate;
}

return (
    <div className="Itinerary">
        {creationStep === 3 && <Button onClick={() => setCreationStep(4)}>Next</Button>}

        {userIsOwner && <CreateNewActivity states={states} setStates={setStates} eventId={eventId}/>}

        <DateSelector formatDate={formatDate} states={states} setStates={setStates}/>

        <ActivityList formatDate={formatDate} states={states} setStates={setStates} setDateArray={setDateArray}/>
        
        <ActivityDetails states={states} setStates={setStates}/> 
    </div>
  );
}
export default Itinerary;