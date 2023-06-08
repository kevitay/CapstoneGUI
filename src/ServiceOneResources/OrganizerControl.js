import React from "react";
import DeleteEvent from "./DeleteEvent";
import CancelEvent from "./CancelEvent";
// import { Link } from "react-router-dom";

function OrganizerControl({ event, setCurrentEvent, editMode, setEditMode }) {
  return (
    <div>
      <h3>Organizer Options</h3>
      {/* Show participants moved to Post MVP */}
      {/* <input type='checkbox' id='participants' name='participants' value='participants'></input>
      <label htmlFor='participants'>Show Participants</label> */}
      
      {/* <Link to={`/serviceOne/editEvent/${event.id}`} state={event}>
        <button>Edit Event</button>
      </Link> */}
      <button disabled={editMode} type="button" onClick={() => setEditMode(true)}>Edit Event</button>
      <CancelEvent event={event} setCurrentEvent={setCurrentEvent} />
      <DeleteEvent id={event.id} />
    </div>
  );
}

export default OrganizerControl;
