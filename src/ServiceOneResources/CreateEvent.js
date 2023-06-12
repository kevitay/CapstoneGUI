import React from 'react';
import { useState, useContext } from 'react';
import AuthContext from '../IdentityResources/Contexts/AuthContext';
//import { EventContext } from "./EventsContext";
// import Login from '../IdentityResources/Login';
import EventType from './EventType';
import { Box, FormControl, TextField, Button, Radio, RadioGroup, FormLabel, FormControlLabel } from '@mui/material';

function CreateEvent({ setCreationStep, setEvent }) {
  const [eventName, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventCost, setEventCost] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [authState] = useContext(AuthContext);

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
    // console.log(event.target.value)
  };

  return (
    <>
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
        <Box
          sx={{
            marginTop: 6,
            marginLeft: '30%',
            width: '50%',
          }}
        >
          <FormControl sx={{ width: '50%' }}>
            <TextField id="outlined-basic" label="Event Name" variant="outlined" name="eventName" value={eventName} onChange={(e) => setName(e.target.value)} required />
            <br />

            <TextField id="outlined-basic" label="Organization" variant="outlined" name="organization" value={organization} onChange={(e) => setOrganization(e.target.value)} required />
            <br />

            <EventType eventType={eventType} setEventType={setEventType} />
            <br />

            <TextField placeholder="$" label="Cost" className="numberField" type="number" min="0.00" name="eventCost" value={eventCost} onChange={(e) => setEventCost(e.target.value)} required />
            <br />

            <TextField label="Event Description" multiline rows="6" name="description" cols="33" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <br />

            <FormControl>
              <FormLabel id="publicPrivate">Public or Private Event?</FormLabel>
              <RadioGroup defaultValue={false}>
                <FormControlLabel control={<Radio />} label="Private" value={false} name="publicPrivate" checked={isPublic === false} onChange={radioEvent} />
                <FormControlLabel control={<Radio />} label="Public" value={true} name="publicPrivate" checked={isPublic === true} onChange={radioEvent} />
              </RadioGroup>
            </FormControl>

            <Button sx={{ width: '30%', marginLeft: '30%', marginTop: 6}} variant="contained" disabled={!authState.token} type="submit">
              Next &#8250;
            </Button>
          </FormControl>
        </Box>
      </form>
    </>
  );
}

export default CreateEvent;
