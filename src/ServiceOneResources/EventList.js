import React from "react";
import { useState, useEffect } from 'react';

export default function EventList() {

     const [eventList, setEventList] = useState([]);

     useEffect(() => {
       getEvents();
     }, []);

     function getEvents() {
          fetch('./events.json')
               .then((response) => response.json())
               .then((response) => {
                    console.log(response);
                    setEventList(response);
          })
         .catch((err) => console.error(err));
     }

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