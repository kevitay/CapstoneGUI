import React from 'react';
import DeleteEvent from "./DeleteEvent";
import CancelEvent from './CancelEvent';
 
function OrganizerControl({ event }, { updateState }) {
  return (
    <div>
      <h2>Organizer Controls</h2>
      <input type="checkbox" id="public" name="public" value="isPublic"></input>
      <label htmlFor="public">Public Event</label>
      <input type="checkbox" id="participants" name="participants" value="participants"></input>
      <label htmlFor="participants">Show Participants</label>
      <button>Edit Event</button>
      <CancelEvent id={event.id} updateState={updateState} />
      <DeleteEvent id={event.id} />
    </div>
  );
}

export default OrganizerControl;