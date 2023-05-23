import React from "react";
import { useContext } from "react";
import { EventContext } from "./EventsContext";

export default function DeleteEvent({ event }) {
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
    return (
    <div>
    <button
        onClick={() => {
          handleDeleteEvent(event.id);
        }}
      >
        Delete Event
      </button>
     </div> 
    );  
}