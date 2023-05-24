import React, { useState } from "react";

export default function ActivityDetails({activity, setActivity, closeActivityDetailsButton, setCloseActivityDetailsButton}) {

    return (
        <div>
            {closeActivityDetailsButton && <button onClick={() => {setActivity({}); setCloseActivityDetailsButton(false)}}>Close Details</button>}
            <ul>
            {Object.entries(activity).map(([key, value], index) => value ? <li key={index}><h4>{key}</h4><p>{value}</p></li> : <p key={index}></p>)}
            </ul>
        </div>
    )
}