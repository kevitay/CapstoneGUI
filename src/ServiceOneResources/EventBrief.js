import React from "react";
import { useContext } from "react";
import { EventContext } from "./EventsContext";

export default function EventBrief({ event }) {
  // const [currentEvent, setCurrentEvent] = useState({})
  const { dispatch } = useContext(EventContext);

  function handleDeleteEvent(id) {
    // console.log(id);
    fetch(
      "http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/" +
        id,
      {
        method: "DELETE",
      }
    )
      .then(dispatch({ type: "DELETE_EVENT", payload: id }))
      .catch((error) => console.log(error));
  }

  function dateFormatter(dateTime) {
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

    return `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}/${year} ${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${amPm}`;
  }

  function Button({ children }) {
    return <button>{children}</button>;
  }
  return (
    <div key={event.id}>
      <h2>Event Name: {event.name}</h2>
      {/* <h2>{event.id}</h2> */}
      <h2>
        Time:{dateFormatter(event.startDateTime)} - {dateFormatter(event.endDateTime)}
      </h2>
      <h2>Location: {event.startLocation.name}</h2>
      <h2>Type: {event.type}</h2>
      <a href={`http://localhost:3000/serviceOne/event/${event.id}`} rel='noopener noreferrer'>
        <Button>View Event</Button>
      </a>

      <button
        onClick={() => {
          handleDeleteEvent(event.id);
        }}
      >
        Delete Event
      </button>
      <hr></hr>
    </div>
  );
}
