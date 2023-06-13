import { ACTIONS, fetchFunction } from "./FetchFunctions";
import Button from "@mui/material/Button";
import React from "react";

export default function EditAndDelete({setCurrentActivity, activity, states, setStates}) {





    return (
        <div>
            {/* EDIT BUTTON */}
            {states.userIsOwner && <Button onClick={() => {
                setStates.setEditForm(true)
                setCurrentActivity(activity);
            }} variant="contained">Edit Activity</Button>}

            {/* DELETE BUTTON */}
            {states.userIsOwner && <Button onClick={() => {
                const confirmed = window.confirm("Are you sure you want to delete this activity?");
                if (confirmed) {
                    console.log(activity)
                    fetchFunction({ type: ACTIONS.DELETE_ACTIVITY, payload: activity, dispatch: setStates.setItineraryJSON, itinerary: states.itineraryJSON, authState: states.authState });
                }}} variant="contained">Delete Activity</Button>}
        </div>
    )
}