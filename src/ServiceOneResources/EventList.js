import React from "react";
import { useEffect, useContext } from 'react';
import EventBrief from "./EventBrief";
import { EventContext } from "./EventsContext";

// const eventsJson = require("./events.json")
//This component is to display our EventList, inside the return is an EventBrief that organizes the data from the fetch call to display only a brief summary.
export default function EventList() {
const { state, dispatch } = useContext(EventContext)

  useEffect(() => {
           function getEvents() {
             // setEventList(eventsJson);
             // TODO needs to be put into fetch call
             var requestOptions = {
               method: 'GET',
               mode: 'cors',
             };

             fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event', requestOptions)
               .then((response) => response.json())
               .then((response) => {
                 dispatch({ type: 'SET_EVENTS', payload: response.eventList });
                 //  console.log(response.eventList)
               })
               .catch((error) => console.log('error', error));
           }

           
       getEvents();
     }, [dispatch]);

    
          // console.log(state.eventsList)

    return(
     <div>
          <h1>Event List Component</h1>
          <hr></hr>
        <div className="userEvents">
        {state.eventsList.map((event) => {
          return <EventBrief event={event} key={event.id} />
        })}
      </div>
      </div>
      
    )
}