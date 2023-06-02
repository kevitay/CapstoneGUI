import React from "react";
import DeleteEvent from "./DeleteEvent";
import CancelEvent from "./CancelEvent";
import { Link } from "react-router-dom";

function OrganizerControl({ event, setCurrentEvent }) {
  return (
    <div>
      <h2>Organizer Controls</h2>
      <input type='checkbox' id='public' name='public' value='isPublic'></input>
      <label htmlFor='public'>Public Event</label>
      <input type='checkbox' id='participants' name='participants' value='participants'></input>
      <label htmlFor='participants'>Show Participants</label>
      <Link to={`/serviceOne/editEvent/${event.id}`} state={event}>
        <button>Edit Event</button>
      </Link>
      <CancelEvent event={event} setCurrentEvent={setCurrentEvent} />
      <DeleteEvent id={event.id} />
    </div>
  );
}

export default OrganizerControl;
