import React from 'react';
import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import EventType from './EventType';

function EditEvent() {
  let { id } = useParams();
  const location = useLocation();
  const state = location.state;
  const [eventName, setName] = useState(state.name);
  const [organization, setOrganization] = useState(state.organization);
  const [description, setDescription] = useState(state.description);
  const [eventType, setEventType] = useState(state.type);
  const [eventCost, setEventCost] = useState(state.baseCost);
  const [isPublic, setIsPublic] = useState(state.public);

  const radioEvent = (event) => {
    setIsPublic(event.target.value === 'true');
  };

  async function updateEvent(eventName, organization, description, eventType, eventCost) {

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      id: id,
      name: eventName,
      organization: organization,
      description: description,
      type: eventType,
      baseCost: eventCost,
      status: 'Planned',
      public: isPublic
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/' + id, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log('error', error));
    // will have to delete if we add other components

    await routeToEvent();
  }

  // will have to delete if we add other components
  async function routeToEvent() {
    // might be better to route to edit itinerary component page 
    window.location.replace(`/serviceOne/event/${id}`);
  }
  
  return (
    <div className="eventSubmit">
      <h2>Edit Event</h2>
      <form
        action=""
        method=""
        className="eventForm"
        onSubmit={(e) => {
          e.preventDefault();
          setName('');
          setOrganization('');
          setDescription('');
          setEventType('');
          setEventCost('');
          updateEvent(eventName, organization, description, eventType, eventCost);
          // will have to delete if we add other components
        }}
      >
        <label>Event Name</label>
        <input type="text" name="eventName" value={eventName} onChange={(e) => setName(e.target.value)} />
        <br />
        <br />
        <label>Organization</label>
        <input type="text" name="organization" value={organization} onChange={(e) => setOrganization(e.target.value)} />
        <br />
        <br />
        <EventType eventType={eventType} setEventType={setEventType} />
        <br />
        <br />
        <label>Event Cost</label>
        <input className="numberField" type="number" min="0.00" name="eventCost" value={eventCost} onChange={(e) => setEventCost(e.target.value)} />
        <br />
        <br />
        <label>Event Description</label>
        <br />
        <textarea name="description" rows="6" cols="33" value={description} onChange={(e) => setDescription(e.target.value)} />
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
        {/* might include Edit Itinerary component , might need to create logic to flow from editing basic event details to itinerary */}
        <button type="submit">Submit</button>
      </form>
      <a href={`/serviceOne/event/${id}`} rel="noopener noreferrer">
        <button>Cancel Edit </button>
      </a>
    </div>
  );
}

export default EditEvent;