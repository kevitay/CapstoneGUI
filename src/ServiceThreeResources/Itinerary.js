import React, { useEffect, useState, useContext } from "react";
import ActivityList from "./ActivityList";
import DateSelector from "./DateSelector";
import CreateNewActivity from "./CreateNewActivity";
import { fetchFunction, ACTIONS } from "./FetchFunctions";
import AuthContext from '../IdentityResources/Contexts/AuthContext';
import Button from "@mui/material/Button";
import { Stack } from '@mui/material'


function Itinerary({eventId, creationStep, setCreationStep, userIsOwner}) {
  const [authState] = useContext(AuthContext);

  useEffect(() => {
    fetchFunction({dispatch: setItineraryJSON, type: ACTIONS.GET_ACTIVITIES, eventId});
  },[eventId]);
  
const [itineraryJSON, setItineraryJSON] = useState({activities:[]});
const [dateArray, setDateArray] = useState([]); 
const [buttonDate, setButtonDate] = useState("");
const [editForm, setEditForm] = useState(false)

const states = {itineraryJSON, dateArray, buttonDate, editForm, authState, userIsOwner};
const setStates = {setItineraryJSON, setDateArray, setButtonDate, setEditForm};

const formatDate = function(date){
        const tempDate = new Date(date);
        const newDate = tempDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
        });
        return newDate;
}

return (
    <Stack  sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
   className="Itinerary">

        {userIsOwner && <CreateNewActivity states={states} setStates={setStates} eventId={eventId}/>}

        <DateSelector formatDate={formatDate} states={states} setStates={setStates} />

        <ActivityList formatDate={formatDate} states={states} setStates={setStates} setDateArray={setDateArray}/>

        {creationStep === 3 && <Button display="flex" sx={{ marginBottom: 4}} align="bottom" onClick={() => setCreationStep(4)} variant="contained">Next Step</Button>}
    </Stack>
  );
}
export default Itinerary;