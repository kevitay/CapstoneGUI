import React from "react";
import EventList from './EventList';
import OrganizerControl from './OrganizerControl';
import { useContext } from "react";
import { EventContext } from "./EventsContext";


//react event
export default function Event({event}) {

  // const { state } = useContext(EventContext)
 
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


  // function getEventById() {
  //      fetch('/api/events/{id}')
  //           .then((response) => response.json())
  //           .then((response) => {
  //                setEvent(response);
  //           })
  //     .catch((err) => console.error(err));
  // }


  // const event = {
  //   creatorId: "aabbcc1234",
  //   organization: "Phils Buds",
  //   name: "St. Patricks Bar Crawl '01",
  //   type: "Social",
  //   description: "Phil's 21st Birthday Pub Crawl",
  //   startDateTime: "2001-01-01@1:00:00",
  //   endDateTime: "2001-01-02@00:00:00",
  //   startLocation: {
  //       name: "Phil's Tiki Bar",
  //       address: "123 Example St",
  //       city: "Normal",
  //       state: "IL",
  //       zipCode: 61761
  //   },
  //   endLocation: {
  //       name: "Greg's Oldtowne Tavern",
  //       address: "123 Example St",
  //       city: "Normal",
  //       state: "IL",
  //       zipCode: 61761
  //   },
  //   participantListId: "1",
  //   base_cost: 50,
  //   total_cost: 50,
  //   status: "planned",
  //   isPublic: false
  // };

  //need to parse dates and times
  // decide to display locations {possibly add google map integration}

  return (
    <div>
      <div className="eventDetails">
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
      {/* other components go here */}
      <div className="totalCost">
        <h3>Total Cost: ${event.total_cost}</h3>
      </div>
      <div>
        <OrganizerControl />
      </div>
    </div>
  );
}

