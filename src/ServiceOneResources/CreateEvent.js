import { findAllByDisplayValue } from '@testing-library/react';
import React from 'react';
import { useState } from 'react';
// import { EventContext } from "./EventsContext";

function CreateEvent({ setCreationStep, setEvent }) {
  const [eventName, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventCost, setEventCost] = useState('');
  // const { dispatch } = useContext(EventContext);

let isPublic;

  function postNewEvent(eventName, organization, description, eventType, eventCost) {

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      name: eventName,
      organization: organization,
      description: description,
      type: eventType,
      baseCost: eventCost,
      status: 'Draft',
      public: isPublic
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // If event context needs updating
        // dispatch({ type: 'ADD_EVENT', payload: result });
        if (result.id !== null) {
          setEvent(result);
          setCreationStep(2);
        }
        console.log(result);
      })
      .catch((error) => console.log('error', error));
  }

  function radioEvent(e) {
    isPublic = e.target.value;
    // console.log("Selected value: " + isPublic);
  }

  return (
    <div className="eventSubmit">
      <h2>Create A New Event</h2>
      <form
        action=""
        method="POST"
        className="eventForm"
        onSubmit={(e) => {
          e.preventDefault();
          //  props.event(eventName, organization, description, eventType, startLocation, endLocation, startTime, endTime);
          setName('');
          setOrganization('');
          setDescription('');
          setEventType('');
          setEventCost('');
          postNewEvent(eventName, organization, description, eventType, eventCost);
        }}
      >
        <label>Event Name</label>
        <input type="text" name="eventName" value={eventName} onChange={(e) => setName(e.target.value)} required />
        <br />
        <br />
        <label>Organization</label>
        <input type="text" name="organization" value={organization} onChange={(e) => setOrganization(e.target.value)} required />
        <br />
        <br />
        <label>Event Type</label>
        <input type="text" name="eventType" value={eventType} onChange={(e) => setEventType(e.target.value)} required />
        <br />
        <br />
        <label>Event Cost</label>
        <input type="text" name="eventCost" value={eventCost} onChange={(e) => setEventCost(e.target.value)} required />
        <br />
        <br />
        <label>Event Description</label>
        <br />
        <textarea name="description" rows="6" cols="33" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <br />
        <br />

        <fieldset>
          <legend>Public or Private:</legend>
          <div onChange={radioEvent}>
            <input type="radio" id="public" name="publicPrivate" value={true} />
            
          <label forhtml="public">Public</label>
          <br />
          <input type="radio" id="private" name="publicPrivate" value={false} />
          <label forhtml="private">Private</label>
          <br />
          </div>
        </fieldset>
        <br/>
        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default CreateEvent;