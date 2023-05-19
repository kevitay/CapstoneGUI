import React from "react";
import { useState, useEffect } from 'react';
import EventBrief from "./EventBrief";

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
          return <EventBrief event={event} key={event.id} />
        })}
      </div>
    )
}