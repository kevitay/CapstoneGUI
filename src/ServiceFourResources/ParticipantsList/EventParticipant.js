import React, {useEffect, useState} from "react";
import './EventParticipant.css';
import EventParticipantData from "./EventParticipantData";

function EventParticipant() {



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
        fetch("http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/participants?eventId=b2d0d4b2-f97a-11ed-be56-0242ac120001", requestOptions)
        .then(response => response.json())
        .then(result => {
            setEventParticipants(result.eventParticipants)
        }).then(result => console.log("participant log", result)).then(setLoadState(false)).catch(error => console.log('error', error));
    }, []);


    return (<div className="EventParticipant">
        <table className="participant-data-table">
            <tr>
                <th></th>
                <th>Name</th>
                <th>Location</th>
                <th>Status</th>
                <th>Driving?</th>
                <th>Seats Available?</th>
            </tr>
            {
            loading ? "" : participantState.map((user) => (<EventParticipantData participant={user}/>))
        } </table>
    </div>)
}

export default EventParticipant;
