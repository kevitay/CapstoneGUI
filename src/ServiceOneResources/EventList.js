import React from "react";
import { useState, useEffect } from 'react';

const eventsJson = require("./events.json")
export default function EventList() {

     const [eventList, setEventList] = useState([]);

     useEffect(() => {
       getEvents();
     }, []);

     // function getEvents() {
     //      fetch('./events.json')
     //           .then((response) => response.json())
     //           .then((response) => {
     //                setEventList(response);
     //           })
     //     .catch((err) => console.error(err));
     // }

     function getEvents() {
          setEventList(eventsJson);
          // TODO needs to be put into fetch call
               // fetch(eventsJson)
               //      .then((response) => {
               //           console.log(response)
               //           response.json()
               //      })
               //   .then(PUT SET HERE);
          }

    return(
        <div className="userEvents">
        {eventList.map((event) => {
          return <div key={event.id}>
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