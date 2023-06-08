import React, { useState } from "react";
import ActivityForm from "./ActivityForm";
import Button from "@mui/material/Button";

export default function CreateNewActivity({dispatch}) {
    const [form, setForm] = useState(false);
    return (
        <div>
            <Button onClick={() => setForm(true)} variant="contained" sx={{marginBottom: 4}}>Create New Activity</Button>
            {form && <ActivityForm setForm={setForm} dispatch = {dispatch}/>}
        </div>
    )
}