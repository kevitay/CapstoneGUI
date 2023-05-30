import React from "react";

export default function EventBrief({ event }) {
  // const [currentEvent, setCurrentEvent] = useState({})

  function changeStatus(eventDate, id) {
    let currentDate = new Date().toJSON().slice(0, 19);
    // console.log(event.status);
    // console.log(eventDate)
    if (event.status !== "expired" && event.status !== "cancelled") {
      if (currentDate > eventDate) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          status: "expired",
        });

        var requestOptions = {
          method: "PATCH",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(
          "http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/" +
            id,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
          // console.log(eventDate)
      }
    } return event.status
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
      {/* <h2>Location: {event.startLocation.name}</h2> */}
      <h2>Type: {event.type}</h2>
      <h2>Status: {changeStatus(event.endDateTime, event.id)}</h2>
      {/* This should work when we deploy but might error out if path changes */}
      <a href={`/serviceOne/event/${event.id}`} rel='noopener noreferrer'>
        <Button>View Event</Button>
      </a>
      <hr></hr>
    </div>
  );
}
