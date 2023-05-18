import React from 'react';
import { useState } from 'react';


function CreateEvent(props) {

    const [eventName, setName] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [description, setDescription] = useState('');
 
   return (
     <div className="eventSubmit">
       <h2>Create A New Event</h2>
       <form
         action=""
         method=""
         className="eventForm"
         onSubmit={(e) => {
           e.preventDefault();
           props.event(eventName, organizer, description);
           setName('');
           setOrganizer('');
           setDescription('');
         }}
       >
         <label>Event Name</label>
         <input type="text" name="eventName" value={eventName} onChange={(e) => setName(e.target.value)} required />
         <br />
         <br />
         <label>Event Organizer</label>
         <input type="text" name="organizer" value={organizer} onChange={(e) => setOrganizer(e.target.value)} required />
         <br />
         <br />
         <label>Event Description</label>
         <br />
         <textarea name="description" rows="6" cols="33" value={description} onChange={(e) => setDescription(e.target.value)} required />
         <br />
         <br />
         <button type="submit">Submit</button>
       </form>
     </div>
   );
}

export default CreateEvent;