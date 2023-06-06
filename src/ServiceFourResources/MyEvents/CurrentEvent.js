import React, { useState, useEffect } from "react";

function CurrentEvent({ event, eventInfo }) {
  console.log("event part info", event)
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(event.status);
  const [carpool, setCarpool] = useState(event.carpool);
  const [seatsAvail, setSeatsAvail] = useState(event.seatsAvail);
  const [index, setCurrentIndex] = useState(0);


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

  if (editMode) {
    console.log("part id", event.eventParticipantId)
    return (
      <div>
        {/* <h3>{eventInfo.name}</h3>
        <p>Event dates go here</p>
        <p>
          <i>Event description goes here</i>
        </p> */}
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
      <button onClick={handleEditClick}>Edit</button>
      <p>---------------</p>
    </div>
  );
}

export default CurrentEvent;