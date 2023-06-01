import React from "react";

function EventInfo({eventInformation}) {
    console.log("eventInfo" ,eventInformation)
return(
    <h3>{eventInformation.name}</h3>
)
}

export default EventInfo; 