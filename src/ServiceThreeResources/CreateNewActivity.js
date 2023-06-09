import React, { useState } from "react";
import ActivityForm from "./ActivityForm";

export default function CreateNewActivity({states, setStates, eventId}) {
    const [form, setForm] = useState(false);
    return (
        <div>
            <button onClick={() => setForm(true)}>Create New Activity</button>
            {form && <ActivityForm eventId={eventId} setForm={setForm} states={states} setStates={setStates}/>}
        </div>
    )
}