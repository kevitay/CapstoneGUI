import React, { useState } from "react";
import ActivityForm from "./ActivityForm";

export default function CreateNewActivity({states, setStates, eventID}) {
    const [form, setForm] = useState(false);
    return (
        <div>
            <button onClick={() => setForm(true)}>Create New Activity</button>
            {form && <ActivityForm eventID={eventID} setForm={setForm} states={states} setStates={setStates}/>}
        </div>
    )
}