import React from 'react';
import { useContext } from "react";
import DeleteEvent from "./DeleteEvent";
// import { EventContext } from "./EventsContext";

 

function OrganizerControl({ dispatchEvent }) {
  // const { dispatch } = useContext(EventContext); 
  return (
    <div>
      <h2>Organizer Controls</h2>
      <input type="checkbox" id="public" name="public" value="isPublic"></input>
      <label htmlFor="public">Public Event</label>
      <input type="checkbox" id="participants" name="participants" value="participants"></input>
      <label htmlFor="participants">Show Participants</label>
      <button>Edit Event</button>
      <button>Cancel Event</button>
      <DeleteEvent dispatch={dispatchEvent}/> 
    </div>
);

}

export default OrganizerControl;