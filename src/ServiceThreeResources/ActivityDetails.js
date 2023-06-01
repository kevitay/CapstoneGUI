import React from "react";
import { ACTIONS } from "./Itinerary";

export default function ActivityDetails({dispatch, displayActivityDetails, setDisplayActivityDetails, closeActivityDetailsButton, setCloseActivityDetailsButton}) {

    return (
        <div>
            {closeActivityDetailsButton && <button onClick={() => {setDisplayActivityDetails({}); setCloseActivityDetailsButton(false)}}>Close Details</button>}
            {displayActivityDetails.id && closeActivityDetailsButton && <button onClick={() => {
                const confirmed = window.confirm("Are you sure you want to delete this activity?");
                if (confirmed) {
                    console.log(displayActivityDetails.id)
                    dispatch({ type: ACTIONS.DELETE_ACTIVITY, payload: displayActivityDetails.id });
                    setDisplayActivityDetails({});
                    setCloseActivityDetailsButton(false);
            }}}>Delete Activity</button>}

            <ul>
            {Object.entries(displayActivityDetails).map(([key, value], index) => value && <li key={index}><h4>{key}</h4><p>{value}</p></li>)}
            </ul>
        </div>
    )
}