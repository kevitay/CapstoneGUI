import React from "react";

function EventInfo({eventInfo}) {
    console.log("eventInfo" ,eventInfo)
return(
    <h3>{eventInfo.name}</h3>
)
}

export default EventInfo; 