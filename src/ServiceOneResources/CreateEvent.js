import React from 'react';
import { useState, useContext } from 'react';
import AuthContext from '../IdentityResources/Contexts/AuthContext';
//import { EventContext } from "./EventsContext";
import Login from '../IdentityResources/Login';
import EventType from './EventType';
import { FormControl, FormControlLabel, Input, TextField, InputLabel, Container, Paper, Button } from '@mui/material';


function CreateEvent({ setCreationStep, setEvent }) {
  const [eventName, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventCost, setEventCost] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [authState] = useContext(AuthContext);

  const handleClose = () => {};

  function postNewEvent(eventName, organization, description, eventType, eventCost) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', authState.token);

    var raw = JSON.stringify({
      creatorID: authState.username,
      name: eventName,
      organization: organization,
      description: description,
      type: eventType,
      baseCost: Math.abs(eventCost),
      status: 'Draft',
      public: isPublic,
    });

    var requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.id !== null) {
          setEvent(result);
          setCreationStep(2);
        }
      })
      .catch((error) => console.log('error', error));
  }

  const radioEvent = (event) => {
    setIsPublic(event.target.value === 'true');
  };

  return (
    <>
      {/* <Container maxWidth="md" sx={{ backgroundColor: 'white', height: '100vh' }}>
        <Paper elevation={5} sx={{ backgroundColor: '#f5f5f5', height: '100vh', alignContent: 'center', padding: '50px', borderRadius: '10px' }}> */}
      {/* {!authState.token ? <Login handleClose={handleClose}></Login> : <></>} */}
      <FormControl
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
        <TextField id="outlined-basic" label="Event Name" variant="outlined" name="eventName" value={eventName} onChange={(e) => setName(e.target.value)} required />
        <br />


        <TextField id="outlined-basic" label="Organization" variant="outlined" name="organization" value={organization} onChange={(e) => setOrganization(e.target.value)} required />
        <br />

        <EventType eventType={eventType} setEventType={setEventType} />
        <br />

        <TextField label="Cost" className="numberField" type="number" min="0.00" name="eventCost" value={eventCost} onChange={(e) => setEventCost(e.target.value)} required />
        <br />

        <label>Event Description</label>
        <br />
        <TextField name="description" rows="6" cols="33" value={description} onChange={(e) => setDescription(e.target.value)} required />
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
        <Button variant="contained" disabled={!authState.token} type="submit">
          Next &#8250;
        </Button>
      </FormControl>
      {/* </Paper>
      </Container> */}
    </>
  );
}

export default CreateEvent;
