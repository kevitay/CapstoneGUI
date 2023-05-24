import React, { useState, useEffect } from "react";
import EventParticipant from "./EventParticipant";
import EventFilter from "./EventFilter";

function PartipantsList() {

    const [participantState, setEventParticipants] = useState([]);
    const [loading, setLoadState] = useState(false);
    // const [eventId, setEventId] = useState('b2d0d4b2-f97a-11ed-be56-0242ac120002');


    // TODO : Integration piece with Event team to GET Event ID
    // useEffect(() => {
    //     getEventId();
    // },[]);

    // function getEventId(){}


    useEffect(() => {
        var requestOptions = {
            method: 'GET'
        };
        setLoadState(true);
        fetch("http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/participants?eventId=b2d0d4b2-f97a-11ed-be56-0242ac120004", requestOptions)
        .then(response => response.json())
        .then(result => {
            setEventParticipants(result.eventParticipants)
        }).then(setLoadState(false)).catch(error => console.log('error', error));
    }, []);

    return (
        <div className="ParticipantsList">
            <h1>Participants List</h1>
            {loading ? "" : <EventFilter participantState={participantState} setEventParticipants={setEventParticipants}></EventFilter>}
            {loading ? "" : <EventParticipant participantState={participantState}></EventParticipant>}
        </div>
    )
}

export default PartipantsList;