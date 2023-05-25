import React, { useState } from "react";
import CreateNewActivity from "./CreateNewActivity";

export default function CreateNewItinerary({itineraryJSON , setItineraryJSON}) {
    const [visibleCreateActivityButton, setVisibleCreateActivityButton] = useState(false);
    return (
        <div>
            <button onClick={() => setVisibleCreateActivityButton(true)}>Create Itinerary</button>
            {visibleCreateActivityButton && <CreateNewActivity itineraryJSON = {itineraryJSON} setItineraryJSON = {setItineraryJSON} />}
            {}
        </div>
    )
}