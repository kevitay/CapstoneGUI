import React from 'react';
import { useState } from 'react';


function CreateEvent(props) {

  const [eventName, setName] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [startLocation, setstartLocation] = useState('');
  const [endLocation, setendLocation] = useState('');
  const [startTime, setstartTime] = useState('');
  const [endTime, setendTime] = useState('');
 
   return (
     <div className="eventSubmit">
       <h2>Create A New Event</h2>
       <form
         action=""
         method=""
         className="eventForm"
         onSubmit={(e) => {
           e.preventDefault();
           props.event(eventName, organizer, description, type, startLocation, endLocation, startTime, endTime);
           setName('');
           setOrganizer('');
           setDescription('');
           setType('');
           setstartLocation('');
           setendLocation('');
           setstartTime('');
           setendTime('');
         }}
       >

         <label>Event Name</label>
         <input type="text" name="eventName" value={eventName} onChange={(e) => setName(e.target.value)} required />
         <br />
         <br />

         <label>Organization</label>
         <input type="text" name="organizer" value={organizer} onChange={(e) => setOrganizer(e.target.value)} required />
         <br />
         <br />

         <label>Event Type</label>
         <input type="text" name="type" value={type} onChange={(e) => setType(e.target.value)} required />
         <br />
         <br />

         <label>Event Description</label>
         <br />
         <textarea name="description" rows="6" cols="33" value={description} onChange={(e) => setDescription(e.target.value)} required />
         <br />
         <br />

         <label>Start Location</label>
         <input type="text" name="startLocation" value={startLocation} onChange={(e) => setType(e.target.value)} required />
         <br />
         <br />

         <label>End Location</label>
         <input type="text" name="endLocation" value={endLocation} onChange={(e) => setType(e.target.value)} />
         <br />
         <br />

         <label for="startTime">Start Time</label>
         <input type="datetime-local" id="startTime" name="startTime"></input>
         <br />
         <br />

         <label for="endTime">End Time</label>
         <input type="datetime-local" id="endTime" name="endTime"></input>
         <br />
         <br />

         <button type="submit">Submit</button>
       </form>
     </div>
   );
}

export default CreateEvent;