import React, { useState } from "react";
import ActivityForm from "./ActivityForm";
import Button from "@mui/material/Button";

export default function CreateNewActivity({states, setStates, eventId}) {
    const [form, setForm] = useState(false);
    return (
        <div>
            <Button onClick={() => setForm(true)} variant="contained" sx={{marginBottom: 4, marginLeft: 4.75}}>Create New Activity</Button>
            {form && <ActivityForm eventId={eventId} setForm={setForm} states={states} setStates={setStates}/>}
        </div>
    )
}