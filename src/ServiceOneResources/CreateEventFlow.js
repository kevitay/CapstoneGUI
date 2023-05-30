import React, { useEffect } from 'react';
import { useState } from 'react';
import CreateEvent from './CreateEvent';

function CreateEventFlow() {
  // Steps are: 1-New, 2-Invite, 3-Itinerary, 4-Items, 5-Tasks
  const [creationStep, setCreationStep] = useState(1);
  const [event, setEvent] = useState(null);
  useEffect(() => {
    if(creationStep === 4) {
      var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          status: "Planned",
        });

        var requestOptions = {
          method: "PATCH",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(
          "http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/" +
            event.id,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
          // console.log(eventDate)
    }
  },[creationStep, event])

  return (
    <div>
      {event ? (<h1>{event.name}</h1>) : <h1>Create Your Event</h1>}
      <p>Step {creationStep} of 5</p>
      {creationStep === 1 ? <CreateEvent setCreationStep={setCreationStep} setEvent={setEvent} /> : <></>}
      {creationStep === 2 ? <><p>Add participants</p></> : <></>}
      {creationStep === 3 ? <><p>Add itinerary</p></> : <></>}
      {creationStep === 4 ? <><p>Add items</p></> : <></>}
      {creationStep === 5 ? <><p>Add tasks</p></> : <></>}
      <button onClick={()=> setCreationStep(4)}>Skip Ahead collect 200</button>
      <br/>
      <br/>
    </div>
  );
}

export default CreateEventFlow