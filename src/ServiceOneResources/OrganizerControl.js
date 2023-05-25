import React from 'react';
import DeleteEvent from "./DeleteEvent";
import EditEvent from './EditEvent';
 
function OrganizerControl({ event }) {
   
  return (
    <div>
      <h2>Organizer Controls</h2>
      <input type="checkbox" id="public" name="public" value="isPublic"></input>
      <label htmlFor="public">Public Event</label>
      <input type="checkbox" id="participants" name="participants" value="participants"></input>
      <label htmlFor="participants">Show Participants</label>
      <EditEvent id={ event.id } />
      <CancelEvent id={event.id} />
      <DeleteEvent id={event.id}/> 
    </div>
);

}

export default OrganizerControl;