import React, { useState } from "react";

export default function ActivityDetails({displayActivityDetails, setDisplayActivityDetails, closeActivityDetailsButton, setCloseActivityDetailsButton}) {

    return (
        <div>
            {closeActivityDetailsButton && <button onClick={() => {setDisplayActivityDetails({}); setCloseActivityDetailsButton(false)}}>Close Details</button>}
            <ul>
            {Object.entries(displayActivityDetails).map(([key, value], index) => value && <li key={index}><h4>{key}</h4><p>{value}</p></li>)}
            </ul>
        </div>
    )
}