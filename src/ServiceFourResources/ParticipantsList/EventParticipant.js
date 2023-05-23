import React,  {useEffect,  useReducer, useState, useContext }  from "react";
import './EventParticipant.css';
import EventParticipantData from "./EventParticipantData";




function EventParticipant() {

    var requestOptions = {
        method: 'GET',
      };

      const [participantState, setEventParticipants] = useState([]);
      const [loading, setLoadState] = useState(false);
    //   const [eventId, setEventId] = useState('b2d0d4b2-f97a-11ed-be56-0242ac120002');
    
      useEffect(() => {
        console.log("useeffect running")
        getParticipants();
      },[]);

    //   useEffect(() => {
    //     getEventId();
    //   },[]);

    //   function getEventId(){}

      function getParticipants(){
        setLoadState(true); 
        fetch("http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/participants/all", requestOptions)
        .then(response => response.json())
        // .then(response => console.log(response))
        .then(result => {
            setEventParticipants(result.eventParticipants)
        })
        .then(result => console.log("participant log", result))
        .then(setLoadState(false))
        .catch(error => console.log('error', error));
      }
    
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
                {loading ? "": participantState.map((user) => (<EventParticipantData participant={user}/>))}
            </table>
        </div>
    )
}

export default EventParticipant;