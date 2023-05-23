import React from "react";
import EventList from './EventList';
import OrganizerControl from './OrganizerControl';
import { useContext } from "react";
import { EventContext } from "./EventsContext";
import { useParams } from 'react-router-dom';

//react event
export default function Event() {

  const { state } = useContext(EventContext);

  let { id } = useParams();

  let currentEvent = state.eventsList.id;

  console.log(id);
  console.log(currentEvent);
 
 
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

  return (
    <div>
      {/* <div className="eventDetails">
        <h1>{event.name}</h1>
        <h3>
          {event.organization} | {event.type}
        </h3>
        <p>{event.description}</p>
      </div>
      <div className="locationDetails">
        <h2>When and Where</h2>
        <h3>Start Time: {dateFormatter(event.startDateTime)}</h3>
        <h3>End Time: {dateFormatter(event.endDateTime)}</h3>
        <h3>Start Location: {event.startLocation.startName}</h3>
        <h3>End Location: {event.endLocation.endName}</h3>
      </div>
      <div className="baseCost">
        <h3>Base Cost: ${event.base_cost}</h3>
      </div>
      <div className="totalCost">
        <h3>Total Cost: ${event.total_cost}</h3>
      </div>
      <div>
        <OrganizerControl />
      </div>  */}
    </div>
  );
}

