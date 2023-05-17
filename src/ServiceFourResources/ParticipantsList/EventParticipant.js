import React from "react";
import './EventParticipant.css';
import EventParticipantData from "./EventParticipantData";




function EventParticipant() {
    let user = [
        {
            "FirstName": "Cody",
            "LastName": "Vasey",
            "PhoneNumber": "5555555555",
            "City" : "Nowhere", 
            "State" : "IL",
            "Email": "cody.vasey.kros@statefarm.com",
            "EmergencyContactInfo": {
                "FirstName": "Bree",
                "LastName": "Vasey",
                "PhoneNumber": "4444444444",
                "Email": "bree@icloud.com",
            },
            "Status" : "Going", 
            "Driving" : "Yes",
            "SeatsAvailable" : "2", 
            "RoomBooked" : "Yes"

        },
        {
            "FirstName": "Cody",
            "LastName": "Vasey",
            "PhoneNumber": "5555555555",
            "City" : "Nowhere", 
            "State" : "IL",
            "Email": "cody.vasey.kros@statefarm.com",
            "EmergencyContactInfo": {
                "FirstName": "Bree",
                "LastName": "Vasey",
                "PhoneNumber": "4444444444",
                "Email": "bree@icloud.com",
            },
            "Status" : "Going", 
            "Driving" : "Yes",
            "SeatsAvailable" : "2", 
            "RoomBooked" : "Yes"

        },
        {
            "FirstName": "Cody",
            "LastName": "Vasey",
            "PhoneNumber": "5555555555",
            "City" : "Nowhere", 
            "State" : "IL",
            "Email": "cody.vasey.kros@statefarm.com",
            "EmergencyContactInfo": {
                "FirstName": "Bree",
                "LastName": "Vasey",
                "PhoneNumber": "4444444444",
                "Email": "bree@icloud.com",
            },
            "Status" : "Going", 
            "Driving" : "Yes",
            "SeatsAvailable" : "2", 
            "RoomBooked" : "Yes"

        }
       ]
    return (
        <div className="EventParticipant">
            <table className="participant-data-table">
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Driving?</th>
                    <th>Seats Available?</th>
                    <th>Room Booked?</th>
                </tr>
                {user.map((user) => (<EventParticipantData participant={user}/>))}
            </table>
        </div>
    )
}

export default EventParticipant;