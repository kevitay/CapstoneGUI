
import React from 'react';
import { useState, useContext} from 'react';
import { EventContext } from "./EventsContext";
import Address from './Address';

const emptyAddress = {name:'',address:'',city:'',state:'',zipCode:''};

function EditEvent() {
// i want to 
  const [eventName, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventCost, setEventCost] = useState('');
  const [startLocation, setStartLocation] = useState(emptyAddress);
  const [endLocation, setEndLocation] = useState(emptyAddress);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const { dispatch } = useContext(EventContext);
 
  function postNewEvent(eventName, organization, description, eventType, eventCost, startLocation, endLocation, startTime, endTime) {
    // console.log(startTime);
    // console.log(endTime);
    let newStartTime = startTime.replaceAll('T', '@');
    let newEndTime = endTime.replaceAll('T', '@');

    // console.log(newStartTime);
    // console.log(newEndTime);

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      name: eventName,
      organization: organization,
      description: description,
      type: eventType,
      baseCost: eventCost,
      startDateTime: newStartTime + ':00',
      endDateTime: newEndTime + ':00',
      startLocation: startLocation,
      endLocation: endLocation,
      status:"Planning"
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: 'ADD_EVENT', payload: result });
        console.log(result);
      })
      .catch((error) => console.log('error', error));
  }

   return (
     <div className="eventSubmit">
       <h2>Edit Event</h2>
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
           setStartLocation(emptyAddress);
           setEndLocation(emptyAddress);
           setStartTime('');
           setEndTime('');
           postNewEvent(eventName, organization, description, eventType, eventCost, startLocation, endLocation, startTime, endTime);
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

         <label>Start Location Name</label>
         <Address location={startLocation} setLocation={setStartLocation}></Address>
         <label>End Location Name</label>
         <Address location={endLocation} setLocation={setEndLocation}></Address>

         <label htmlFor="startTime">Start Time</label>
         <input type="datetime-local" id="startTime" name="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} required></input>
         <br />
         <br />
         <label htmlFor="endTime">End Time</label>
         <input type="datetime-local" id="endTime" name="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} required></input>
         <br />
         <br />
         <button type="submit">Submit</button>
       </form>
     </div>
   );
}

export default EditEvent;