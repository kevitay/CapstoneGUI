import React, { useState } from "react";
import ActivityForm from "./ActivityForm";

export default function CreateNewActivity({itineraryJSON, setItineraryJSON}) {
    console.log("Create new activity", itineraryJSON)
    const [form, setForm] = useState(false);
    return (
        <div>
            <button onClick={() => setForm(true)}>Create New Activity</button>
            {form ? <ActivityForm setForm={setForm} itineraryJSON={itineraryJSON} setItineraryJSON = {setItineraryJSON}/> : <></>}
        </div>
    )
}