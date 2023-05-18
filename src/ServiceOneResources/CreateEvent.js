import React from 'react';
import { useState } from 'react';


function CreateEvent(props) {

  const [eventName, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
 
   return (
     <div className="eventSubmit">
       <h2>Create A New Event</h2>
       <form
         action=""
         method="POST"
         className="eventForm"
         onSubmit={(e) => {
           e.preventDefault();
           props.event(eventName, organization, description, eventType, startLocation, endLocation, startTime, endTime);
           setName('');
           setOrganization('');
           setDescription('');
           setEventType('');
           setStartLocation('');
           setEndLocation('');
           setStartTime('');
           setEndTime('');
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
         <label>Event Description</label>
         <br />
         <textarea name="description" rows="6" cols="33" value={description} onChange={(e) => setDescription(e.target.value)} required />
         <br />
         <br />

         <label>Start Location</label>
         <input type="text" name="startLocation" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} required />
         <br />
         <br />
         <label>End Location</label>
         <input type="text" name="endLocation" value={endLocation} onChange={(e) => setEndLocation(e.target.value)} />
         <br />
         <br />
         <label for="startTime">Start Time</label>
         <input type="datetime-local" id="startTime" name="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} required></input>
         <br />
         <br />
         <label for="endTime">End Time</label>
         <input type="datetime-local" id="endTime" name="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} required></input>
         <br />
         <br />
         <button type="submit">Submit</button>
       </form>
     </div>
   );
}

export default CreateEvent;