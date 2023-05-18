import React, { useState, useEffect } from "react";
import EventParticipant from "./EventParticipant";
import EventFilter from "./EventFilter";

function PartipantsList() {

    let user = [
        {
            "FirstName": "Cody",
            "LastName": "Vasey",
            "PhoneNumber": "5555555555",
            "City": "Nowhere",
            "State": "IL",
            "Email": "cody.vasey.kros@statefarm.com",
            "EmergencyContactInfo": {
                "FirstName": "Bree",
                "LastName": "Vasey",
                "PhoneNumber": "4444444444",
                "Email": "bree@icloud.com",
            },
            "Status": "Going",
            "Driving": "Yes",
            "SeatsAvailable": "2",
            "RoomBooked": "Yes"

        },
        {
            "FirstName": "Cody",
            "LastName": "Vasey",
            "PhoneNumber": "5555555555",
            "City": "Nowhere",
            "State": "IL",
            "Email": "cody.vasey.kros@statefarm.com",
            "EmergencyContactInfo": {
                "FirstName": "Bree",
                "LastName": "Vasey",
                "PhoneNumber": "4444444444",
                "Email": "bree@icloud.com",
            },
            "Status": "Going",
            "Driving": "Yes",
            "SeatsAvailable": "2",
            "RoomBooked": "Yes"

        },
        {
            "FirstName": "Cody",
            "LastName": "Vasey",
            "PhoneNumber": "5555555555",
            "City": "Nowhere",
            "State": "IL",
            "Email": "cody.vasey.kros@statefarm.com",
            "EmergencyContactInfo": {
                "FirstName": "Bree",
                "LastName": "Vasey",
                "PhoneNumber": "4444444444",
                "Email": "bree@icloud.com",
            },
            "Status": "Going",
            "Driving": "Yes",
            "SeatsAvailable": "2",
            "RoomBooked": "Yes"
        }
    ];

    const [userState, setUserState] = useState(user);
    useEffect(() => {
    }, [userState]);


    return (
        <div className="ParticipantsList">
            <h1>Participants List</h1>
            <EventFilter userData={userState} setUserState={setUserState}></EventFilter>
            <EventParticipant userData={userState}></EventParticipant>
        </div>
    )
}

export default PartipantsList;