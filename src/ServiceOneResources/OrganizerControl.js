import React from "react";
import DeleteEvent from "./DeleteEvent";
import CancelEvent from "./CancelEvent";
import { Button, Divider, Stack, Typography } from "@mui/material";
// import { Link } from "react-router-dom";

function OrganizerControl({ event, setCurrentEvent, editMode, setEditMode, setDeleted }) {
  return (
    <div>
      <Typography variant="h6">Organizer Options</Typography>
      <Divider />
      {/* Show participants moved to Post MVP */}
      {/* <input type='checkbox' id='participants' name='participants' value='participants'></input>
      <label htmlFor='participants'>Show Participants</label> */}

      {/* <Link to={`/serviceOne/editEvent/${event.id}`} state={event}>
        <button>Edit Event</button>
      </Link> */}
      <Stack direction="column" spacing={1}>
        <Button size="small" variant="outlined" disabled={editMode} type="button" onClick={() => setEditMode(true)}>
          Edit Event
        </Button>
        {event.status === "cancelled" ?
          (<></>) : (<CancelEvent event={event} setCurrentEvent={setCurrentEvent} />)
        }
        <DeleteEvent id={event.id} setDeleted={setDeleted} />
      </Stack>
    </div>
  );
}

export default OrganizerControl;
