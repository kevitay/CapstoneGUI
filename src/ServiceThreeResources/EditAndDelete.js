import { ACTIONS, fetchFunction } from "./FetchFunctions";
import Button from "@mui/material/Button";
import React from "react";

export default function EditAndDelete({states, setStates}) {





    return (
        <div>

            {states.userIsOwner && <Button onClick={() => {
                setStates.setEditForm(true)
                setStates.setCloseActivityDetailsButton(false);
            }} variant="contained">Edit Activity</Button>}
            




            {states.userIsOwner && <Button onClick={() => {
                const confirmed = window.confirm("Are you sure you want to delete this activity?");
                if (confirmed) {
                    fetchFunction({ type: ACTIONS.DELETE_ACTIVITY, payload:states.displayActivityDetails, dispatch: setStates.setItineraryJSON, itinerary: states.itineraryJSON, authState: states.authState });
                    setStates.setDisplayActivityDetails({});
                    setStates.setCloseActivityDetailsButton(false);
                }}} variant="contained">Delete Activity</Button>}
            

            {/* <ul>
            {!states.editForm && Object.entries(states.displayActivityDetails).map(([key, value], index) => value && <li key={index}><h4>{key}</h4><p>{value}</p></li>)}
            </ul> */}

        </div>
    )
}