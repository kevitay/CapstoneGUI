import React from "react";


export default function EventList(){
    
    const eventList = [{
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
    },{
        "creatorId": "aabbcc1235",
        "organization": "SFs",
        "name": "Team Build",
        "type": "Other",
        "description": "Klyde Warren park team building",
        "startDateTime": "2001-01-01T16:00-04:00",
        "endDateTime": "2001-0102T02:00-04:00",
        "startLocation": {
             "startName": "Klyde Warren Park",
             "Address": "123 Example St",
             "City": "Normal",
             "State": "IL",
             "ZipCode": 61761
        },
        "endLocation": {
            
        },
        "participantListId": "2",
        "base_cost": "50",
        "total_cost": "50",
        "status": "planned",
        "isPublic": false	
    },{
        "creatorId": "ccbbaac123",
        "organization": "Kevins org",
        "name": "Birthday  bash",
        "type": "Birthday",
        "description": "celebrating a birthday",
        "startDateTime": "2001-01-01T16:00-04:00",
        "endDateTime": "2001-0102T02:00-04:00",
        "startLocation": {
             "startName": "Cheers",
             "Address": "123 Example St",
             "City": "Normal",
             "State": "IL",
             "ZipCode": 61761
        },
        "endLocation": {
             "endName": "coffee shop",
             "Address": "123 Example St",
             "City": "Normal",
             "State": "IL",
             "ZipCode": 61761
        },
        "participantListId": "3",
        "base_cost": "50",
        "total_cost": "50",
        "status": "planned",
        "isPublic": false	
    }]

    return(
        <div className="userEvents">
        {eventList.map((event) => {
          return <div>
            <h2>{event.name}</h2>
            <h2>{event.startDateTime}</h2>
            <h2>{event.startLocation.startName}</h2>
            <h2>{event.type}</h2>
            <hr></hr>
          </div>
        })}
      </div>
    )
}