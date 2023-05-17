import React from "react";

//react event
export default function Event() {
    const eventJson = {
        "creatorId": "aabbcc1234",
        "organization": "Phils Buds",
        "name": "St. Patricks Bar Crawl '01",
        "type": "Social",
        "description": "Phil's 21st Birthday Pub Crawl",
        "startDateTime": "2001-01-01T16:00-04:00",
        "endDateTime": "2001-0102T02:00-04:00",
        "startLocation": {
             "startName": "Phil's Tiki Bar",
             "Address": "123 Example St",
             "City": "Normal",
             "State": "IL",
             "ZipCode": 61761
        },
        "endLocation": {
             "endName": "Greg's Oldtowne Tavern",
             "Address": "123 Example St",
             "City": "Normal",
             "State": "IL",
             "ZipCode": 61761
        },
        "participantListId": "1",
        "base_cost": "50",
        "total_cost": "50",
        "status": "planned",
        "isPublic": false	
    }
    //need to parse dates and times
    // decide to display locations {possibly add google map integration}

    return (
        <div>
        <h1>Hello World, Im the event component</h1>
        <div className="eventDetails">
        <h1>{eventJson.name}</h1>
        <h3>{eventJson.organization} | {eventJson.type}</h3>
        <p>{eventJson.description}</p>
        </div>
        <div className="locationDetails">
            <h2>When and Where</h2>
                <h3>Start Time: {eventJson.startDateTime}</h3>
                <h3>End Time: {eventJson.endDateTime}</h3>
                <h3>Start Location: {eventJson.startLocation.startName}</h3>
                <h3>End Location: {eventJson.endLocation.endName}</h3>
        </div>
        </div>
    )
}

