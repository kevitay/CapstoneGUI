import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import { Button, Card, CardActionArea, Divider, Typography } from '@mui/material'; 

function CurrentEvent({ event, eventInfo }) {
  console.log("event part info", event)
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(event.status);
  const [carpool, setCarpool] = useState(event.carpool);
  const [seatsAvail, setSeatsAvail] = useState(event.seatsAvail);
  const [index, setCurrentIndex] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    //pair up the event IDs
    const currentEvent = event.eventId
    setCurrentIndex(eventInfo.findIndex(obj => obj.id === currentEvent))
  },[event.eventId, eventInfo, status, carpool, seatsAvail])

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

  if (editMode) {
    console.log("part id", event.eventParticipantId)
    return (
      <div>
        <p>
          Status:{" "}
          <input
            type="radio"
            name="status"
            value="Going"
            onChange={(e) => setStatus(e.target.value)}
          />Going
          <input
            type="radio"
            name="status"
            value="Not going"
            onChange={(e) => setStatus(e.target.value)}
          />Not going
          <input
            type="radio"
            name="status"
            value="Tentative"
            onChange={(e) => setStatus(e.target.value)}
          />Tentative
        </p>
        <p>
          Carpooling?{" "}
          <input
            type="checkbox"
            checked={carpool}
            onChange={(e) => setCarpool(e.target.checked)}
          />
        </p>
        <p>
          Seats Available:{" "}
          <input
            type="number"
            value={seatsAvail}
            onChange={(e) => setSeatsAvail(parseInt(e.target.value))}
          />
        </p>
        <button onClick={handleSaveClick}>Save</button>
        <p>---------------</p>
      </div>
    );
  }

  function handleEventCardClick() {
    navigate(`/serviceOne/event/${event.eventId}`);
  }

  return (
    <Card
      sx={{
        margin:1,
        backgroundColor: "#F4F4F4",
        width: "30em",
        height: "100%",
        p: "1.5em",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      }} >
        <CardActionArea onClick={handleEventCardClick} rel="noopener noreferrer" sx={{height: '100%'}}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {eventInfo[index].name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Organizer: {eventInfo[index].creatorID}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Organization: {eventInfo[index].organization}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Event Type: {eventInfo[index].type}
      </Typography>
      <Divider sx={{ my: "1em" }} />
      <Typography variant="body1" gutterBottom>
        Description: {eventInfo[index].description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Base Cost: {eventInfo[index].baseCost}
      </Typography>
      <Typography variant="h6" fontWeight="bold" mt={2}>
        Your Event Info
      </Typography>
      <Typography variant="body1">
      Status:{" "}
      <strong style={{ color: status === null ? "red" : "inherit" }}>
        {status || "Needs Response"}
      </strong>
    </Typography>
    <Typography variant="body1">
      Carpooling:{" "}
      <strong style={{ color: carpool === null ? "red" : "inherit" }}>
        {carpool !== null ? (carpool ? "Yes" : "No") : "Needs Response"}
      </strong>
    </Typography>
    <Typography variant="body1">
      Seats Available:{" "}
      <strong style={{ color: seatsAvail === null ? "red" : "inherit" }}>
        {seatsAvail !== null ? seatsAvail : "Needs Response"}
      </strong>
    </Typography>
    </CardActionArea>
      <Button onClick={handleEditClick} variant="contained" sx={{ mt: 2 }}>
        Edit
      </Button>
    </Card>
  );
}

export default CurrentEvent;