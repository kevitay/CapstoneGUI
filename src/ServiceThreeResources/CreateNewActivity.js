import React, { useState } from "react";
import ActivityForm from "./ActivityForm";

export default function CreateNewActivity({dispatch}) {
    const [form, setForm] = useState(false);
    return (
        <div>
            <button onClick={() => setForm(true)}>Create New Activity</button>
            {form && <ActivityForm setForm={setForm} dispatch = {dispatch}/>}
        </div>
    )
}