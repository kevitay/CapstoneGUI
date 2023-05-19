import React from "react";
import { useState, useEffect } from 'react';
import EventBrief from "./EventBrief";

// const eventsJson = require("./events.json")
export default function EventList() {

     const [eventsList, setEventList] = useState([]);


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
          // setEventList(eventsJson);
          // TODO needs to be put into fetch call
          var requestOptions = {
               method: 'GET',
               mode: 'cors'
             };

             
             fetch("http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event", requestOptions)
               .then(response => response.json())
                .then(response => setEventList(response.eventList))
               .then(response => console.log(response))
               .catch(error => console.log('error', error));
          }
          console.log(eventsList)

    return(
     <div>
          <h1>Event List Component</h1>
          <hr></hr>
        <div className="userEvents">
        {eventsList.map((event) => {
          return <EventBrief event={event} key={event.id} />
        })}
      </div>
      </div>
      
    )
}