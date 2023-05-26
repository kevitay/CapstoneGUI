
import React from 'react';
import { useState} from 'react';
import Address from './Address';
import { useParams } from 'react-router-dom';

const emptyAddress = {name:'',address:'',city:'',state:'',zipCode:''};

function EditEvent() {
  let { id } = useParams();
  const location = useLocation();
  const state = location.state;
  let oldStartTime = state.startDateTime.replaceAll('@', 'T');
  let oldEndTime = state.endDateTime.replaceAll('@', 'T');
  const [eventName, setName] = useState(state.name);
  const [organization, setOrganization] = useState(state.organization);
  const [description, setDescription] = useState(state.description);
  const [eventType, setEventType] = useState(state.type);
  const [eventCost, setEventCost] = useState(state.baseCost);
  const [startLocation, setStartLocation] = useState(state.startLocation);
  const [endLocation, setEndLocation] = useState(state.endLocation);
  const [startTime, setStartTime] = useState(oldStartTime);
  const [endTime, setEndTime] = useState(oldEndTime);

 
  async function postNewEvent(eventName, organization, description, eventType, eventCost, startLocation, endLocation, startTime, endTime) {
    // console.log(startTime);
    // console.log(endTime);
    let newStartTime = startTime.replaceAll('T', '@');
    let newEndTime = endTime.replaceAll('T', '@');
    // console.log(newStartTime);
    // console.log(newEndTime);

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      id: id,
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

      fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/'+ id, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log('error', error));
      // will have to delete if we add other components
      await routeToEvent();

  }

  // will have to delete if we add other components
async function routeToEvent(){
  window.location.replace(`/serviceOne/event/${id}`)
  
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
           console.log(startTime);
           console.log(endTime);
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
          // will have to delete if we add other components
           routeToEvent();
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
         <label>Event Type</label>
         <input type="text" name="eventType" value={eventType} onChange={(e) => setEventType(e.target.value)} />
         <br />
         <br />
         <label>Event Cost</label>
         <input type="text" name="eventCost" value={eventCost} onChange={(e) => setEventCost(e.target.value)} />
         <br />
         <br />
         <label>Event Description</label>
         <br />
         <textarea name="description" rows="6" cols="33" value={description} onChange={(e) => setDescription(e.target.value)} />
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
       <a href={`/serviceOne/event/${id}`} rel="noopener noreferrer">
         <button>Cancel</button>
       </a>
     </div>
   );
}

export default EditEvent;