import React from 'react';
import { useState, useContext} from 'react';
import { EventContext } from "./EventsContext";

function CreateEvent() {

  const [eventName, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const [startLocationName, setStartLocationName] = useState('');
  const [startAddress, setStartAddress] = useState('');
  const [startZip, setStartZip] = useState('');
  const [startState, setStartState] = useState('');
  const [startCity, setStartCity] = useState('');
  const [endLocationName, setEndLocationName] = useState('');
  const [endAddress, setEndAddress] = useState('');
  const [endZip, setEndZip] = useState('');
  const [endState, setEndState] = useState('');
  const [endCity, setEndCity] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const { dispatch } = useContext(EventContext);
 
  function postNewEvent(eventName, organization, description, eventType, startLocationName, startAddress, startZip, startState, startCity, endLocationName,endAddress,endZip, endState, endCity, startTime, endTime){
  
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
      startDateTime: newStartTime + ":00",
      endDateTime: newEndTime + ":00",
      startLocation: {
        name: startLocationName,
        address: startAddress,
        city: startCity,
        state: startState,
        zipCode: startZip,
      },
      endLocation: {
        name: endLocationName,
        address: endAddress,
        city: endCity,
        state: endState,
        zipCode: endZip,
      },
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event', requestOptions)
      .then((response) => response.json())
      .then((result) => {dispatch({type: 'ADD_EVENT', payload: result})
        ;console.log(result)})
      .catch((error) => console.log('error', error));
    
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
           setStartLocationName('');
           setStartAddress('');
           setStartCity('');
           setStartState('');
           setStartZip('');
           setEndLocationName('');
           setEndAddress('');
           setEndCity('');
           setEndState('');
           setEndZip('');
           setStartTime('');
           setEndTime('');
           postNewEvent(eventName, organization, description, eventType, startLocationName, startAddress, startZip, startState, startCity, endLocationName,endAddress,endZip, endState, endCity, startTime, endTime);
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

         <label>Start Location Name </label>
         <input type="text" name="startLocationName" value={startLocationName} onChange={(e) => setStartLocationName(e.target.value)} required />
         <br />
         <br />

         <label>Address </label>
         <input type="text" name="startAddress" value={startAddress} onChange={(e) => setStartAddress(e.target.value)} required />
         <br />
         <br />

         <label>City </label>
         <input type="text" name="startCity" value={startCity} onChange={(e) => setStartCity(e.target.value)} required />
         <br />
         <br />

         <label htmlFor="startState">State</label>
         <select name="startState" id="startState" value={startState} onChange={(e) => setStartState(e.target.value)} required>
           <option value="">Select state</option>
           <option value="AL">Alabama</option>
           <option value="AK">Alaska</option>
           <option value="AZ">Arizona</option>
           <option value="AR">Arkansas</option>
           <option value="CA">California</option>
           <option value="CO">Colorado</option>
           <option value="CT">Connecticut</option>
           <option value="DE">Delaware</option>
           <option value="DC">District Of Columbia</option>
           <option value="FL">Florida</option>
           <option value="GA">Georgia</option>
           <option value="HI">Hawaii</option>
           <option value="ID">Idaho</option>
           <option value="IL">Illinois</option>
           <option value="IN">Indiana</option>
           <option value="IA">Iowa</option>
           <option value="KS">Kansas</option>
           <option value="KY">Kentucky</option>
           <option value="LA">Louisiana</option>
           <option value="ME">Maine</option>
           <option value="MD">Maryland</option>
           <option value="MA">Massachusetts</option>
           <option value="MI">Michigan</option>
           <option value="MN">Minnesota</option>
           <option value="MS">Mississippi</option>
           <option value="MO">Missouri</option>
           <option value="MT">Montana</option>
           <option value="NE">Nebraska</option>
           <option value="NV">Nevada</option>
           <option value="NH">New Hampshire</option>
           <option value="NJ">New Jersey</option>
           <option value="NM">New Mexico</option>
           <option value="NY">New York</option>
           <option value="NC">North Carolina</option>
           <option value="ND">North Dakota</option>
           <option value="OH">Ohio</option>
           <option value="OK">Oklahoma</option>
           <option value="OR">Oregon</option>
           <option value="PA">Pennsylvania</option>
           <option value="RI">Rhode Island</option>
           <option value="SC">South Carolina</option>
           <option value="SD">South Dakota</option>
           <option value="TN">Tennessee</option>
           <option value="TX">Texas</option>
           <option value="UT">Utah</option>
           <option value="VT">Vermont</option>
           <option value="VA">Virginia</option>
           <option value="WA">Washington</option>
           <option value="WV">West Virginia</option>
           <option value="WI">Wisconsin</option>
           <option value="WY">Wyoming</option>
         </select>
         <br />
         <br />

         <label>Zip Code </label>
         <input type="text" name="startZip" value={startZip} onChange={(e) => setStartZip(e.target.value)} required />
         <br />
         <br />

         <label>End Location Name </label>
         <input type="text" name="endLocationName" value={endLocationName} onChange={(e) => setEndLocationName(e.target.value)} />
         <br />
         <br />

         <label>Address </label>
         <input type="text" name="endAddress" value={endAddress} onChange={(e) => setEndAddress(e.target.value)} />
         <br />
         <br />

         <label>City </label>
         <input type="text" name="endCity" value={endCity} onChange={(e) => setEndCity(e.target.value)} />
         <br />
         <br />

         <label htmlFor="endState">State</label>
         <select name="endState" id="endState" value={endState} onChange={(e) => setEndState(e.target.value)} >
           <option value="">Select state</option>
           <option value="AL">Alabama</option>
           <option value="AK">Alaska</option>
           <option value="AZ">Arizona</option>
           <option value="AR">Arkansas</option>
           <option value="CA">California</option>
           <option value="CO">Colorado</option>
           <option value="CT">Connecticut</option>
           <option value="DE">Delaware</option>
           <option value="DC">District Of Columbia</option>
           <option value="FL">Florida</option>
           <option value="GA">Georgia</option>
           <option value="HI">Hawaii</option>
           <option value="ID">Idaho</option>
           <option value="IL">Illinois</option>
           <option value="IN">Indiana</option>
           <option value="IA">Iowa</option>
           <option value="KS">Kansas</option>
           <option value="KY">Kentucky</option>
           <option value="LA">Louisiana</option>
           <option value="ME">Maine</option>
           <option value="MD">Maryland</option>
           <option value="MA">Massachusetts</option>
           <option value="MI">Michigan</option>
           <option value="MN">Minnesota</option>
           <option value="MS">Mississippi</option>
           <option value="MO">Missouri</option>
           <option value="MT">Montana</option>
           <option value="NE">Nebraska</option>
           <option value="NV">Nevada</option>
           <option value="NH">New Hampshire</option>
           <option value="NJ">New Jersey</option>
           <option value="NM">New Mexico</option>
           <option value="NY">New York</option>
           <option value="NC">North Carolina</option>
           <option value="ND">North Dakota</option>
           <option value="OH">Ohio</option>
           <option value="OK">Oklahoma</option>
           <option value="OR">Oregon</option>
           <option value="PA">Pennsylvania</option>
           <option value="RI">Rhode Island</option>
           <option value="SC">South Carolina</option>
           <option value="SD">South Dakota</option>
           <option value="TN">Tennessee</option>
           <option value="TX">Texas</option>
           <option value="UT">Utah</option>
           <option value="VT">Vermont</option>
           <option value="VA">Virginia</option>
           <option value="WA">Washington</option>
           <option value="WV">West Virginia</option>
           <option value="WI">Wisconsin</option>
           <option value="WY">Wyoming</option>
         </select>
         <br />
         <br />

         <label>Zip Code </label>
         <input type="text" name="endZip" value={endZip} onChange={(e) => setEndZip(e.target.value)} />
         <br />
         <br />
         
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

export default CreateEvent;