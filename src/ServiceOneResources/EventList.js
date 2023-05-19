import React from "react";
import { useState, useEffect } from 'react';

const eventsJson = require("./events.json")
export default function EventList() {

     const [eventList, setEventList] = useState([]);

     function dateFormatter(dateTime){
          const date = new Date(dateTime);
          // Extracting date components
          let hours = date.getHours();
          const minutes = date.getMinutes();
          const month = date.getMonth() + 1; // Months are zero-based, so adding 1
          const day = date.getDate();
          const year = date.getFullYear();
          // Converting to 12-hour format
          let amPm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12 || 12;
        
          return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amPm}`;
        
          }

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
            <h2>{dateFormatter(event.startDateTime)}</h2>
            <h2>{event.startLocation.startName}</h2>
            <h2>{event.type}</h2>
            <hr></hr>
          </div>
        })}
      </div>
    )
}