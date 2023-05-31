import React, { useState } from "react";
import ActivityForm from "./ActivityForm";

export default function CreateNewActivity({itineraryJSON, setItineraryJSON, callingItinerary}) {
    const [form, setForm] = useState(false);
    return (
        <div>
            <button onClick={() => setForm(true)}>Create New Activity</button>
            {form && <ActivityForm setForm={setForm} itineraryJSON={itineraryJSON} setItineraryJSON = {setItineraryJSON} callingItinerary = {callingItinerary}/>}
        </div>
    )
}