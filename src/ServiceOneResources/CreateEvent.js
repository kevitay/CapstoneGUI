import React from 'react';
import { useState, useContext} from 'react';
import AuthContext from "../IdentityResources/Contexts/AuthContext";
//import { EventContext } from "./EventsContext";
import Login from '../IdentityResources/Login';
import EventType from './EventType';

function CreateEvent({ setCreationStep, setEvent }) {
  const [eventName, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventCost, setEventCost] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [authState,] = useContext(AuthContext);
 
  function postNewEvent(eventName, organization, description, eventType, eventCost) {

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      creatorID: authState.username,
      name: eventName,
      organization: organization,
      description: description,
      type: eventType,
      baseCost: Math.abs(eventCost),
      status: 'Draft',
      public: isPublic
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      authorization: authState.token
    };

    fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.id !== null) {
          setEvent(result);
          setCreationStep(2);
        }
        //console.log(result);
      })
      .catch((error) => console.log('error', error));
  }

   const radioEvent = (event) => {
     setIsPublic(event.target.value === 'true');
   };

  return (
    <div className="eventSubmit">
       {(!authState.token)?(<Login></Login>):(<></>)}
      <h2>Create A New Event</h2>
      <form
        action=""
        method="POST"
        className="eventForm"
        onSubmit={(e) => {
          e.preventDefault();
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
        <EventType eventType={eventType} setEventType={setEventType} />
        <br />
        <br />
        <label>Event Cost</label>
        <input className="numberField" type="number" min="0.00" name="eventCost" value={eventCost} onChange={(e) => setEventCost(e.target.value)} required />
        <br />
        <br />
        <label>Event Description</label>
        <br />
        <textarea name="description" rows="6" cols="33" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <br />
        <br />

        <fieldset>
          <legend>Public or Private:</legend>
          <input type="radio" id="public" name="publicPrivate" value={true} checked={isPublic === true} onChange={radioEvent} />
          <label forhtml="public">Public</label>
          <br />
          <input type="radio" id="private" name="publicPrivate" value={false} checked={isPublic === false} onChange={radioEvent} />
          <label forhtml="private">Private</label>
          <br />
        </fieldset>
        <br />
        <br />
        <button disabled={!authState.token} type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateEvent;