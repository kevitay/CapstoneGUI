import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, Modal, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox, TextField } from '@mui/material';

function CurrentEvent({ event, eventInfo }) {
  console.log("event part info", event)
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(event.status);
  const [carpool, setCarpool] = useState(event.carpool);
  const [seatsAvail, setSeatsAvail] = useState(event.seatsAvail);
  const [index, setCurrentIndex] = useState(0);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  useEffect(() => {
    //pair up the event IDs
    const currentEvent = event.eventId
    setCurrentIndex(eventInfo.findIndex(obj => obj.id === currentEvent))
  },[event.eventId, eventInfo])

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    var raw = JSON.stringify({
      "status": status,
      "carpool": carpool,
      "seatsAvail": seatsAvail
    }
    );

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/participants/" + event.eventParticipantId, requestOptions)
      .then(response => response.json())
      .then(result => {
      })
      .catch(error => console.log('error', error));

    // Exit edit mode
    setEditMode(false);
  };

  // <div>
  //   <Button onClick={handleEditClick}
  // </div>

  if (editMode) {
   
    console.log("part id", event.eventParticipantId)
    return (
      <Modal
      open={handleEditClick}
      onClose={handleSaveClick}
      aria-labelledby="preferences-label"
      aria-describedby="preferences-label">
        <Box sx={style}> 
        <h3>{eventInfo[index].name}</h3>
        <p>Organizer:{eventInfo[index].creatorID + ", " + eventInfo[index].organization}</p>
            <div>
              <p>
              <FormControl>
                <FormLabel id="status-radio-buttons-group">Status:</FormLabel>
                <RadioGroup
                  aria-labelledby="status-radio-buttons-group"
                  name="status-radio-buttons"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <FormControlLabel value="Going" control={<Radio />} label="Going" />
                  <FormControlLabel value="Not Going" control={<Radio />} label="Not Going" />
                  <FormControlLabel value="Tentative" control={<Radio />} label="Tentative" />
                </RadioGroup>
              </FormControl>
            </p>
            <p>
              <FormControlLabel control={<Checkbox
                onChange={(e) => setCarpool(e.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
              />} label="Carpooling? " />
            </p>
            <p>
              <TextField
                id="seats-avail"
                onChange={(e) => setSeatsAvail(parseInt(e.target.value))}
                label="Seats Available: "
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
            </p>
            <Button variant="contained" onClick={handleSaveClick}>Save</Button>
          </div>
        </Box>
      </Modal>
    );
  }

  return (
    <div>
      {/* <h3>Event title goes here</h3>
      <p>Event dates go here</p>
      <p>
        <i>Event description goes here</i>
      </p> */}
      <h3>{eventInfo[index].name}</h3>
      <p>Organizer:{eventInfo[index].creatorID + ", " + eventInfo[index].organization}</p>
      <p>Event Type:{eventInfo[index].type}</p>
      <p>description:{eventInfo[index].description}</p>
      <p>Base Cost:{eventInfo[index].baseCost}</p>
      <h3>Your Event Info</h3>
      <p>Status: <strong>{status}</strong></p>
      <p>Carpooling? <strong>{carpool ? "Yes" : "No"}</strong></p>
      <p>Seats Available: <strong>{seatsAvail}</strong></p>
      <Button variant="contained" onClick={handleEditClick}>Edit</Button>
      <p>---------------</p>
    </div>
  );
}

export default CurrentEvent;