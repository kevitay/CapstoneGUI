import React, { useState } from "react";
import CreateNewActivity from "./CreateNewActivity";

export default function CreateNewItinerary({itineraryJSON , setItineraryJSON}) {
    const [button, setButton] = useState(false);
    return (
        <div>
            <button onClick={() => setButton(true)}>Create Itinerary</button>
            {button ? <CreateNewActivity itineraryJSON = {itineraryJSON} setItineraryJSON = {setItineraryJSON} /> : <></>}
            {}
        </div>
    )
}