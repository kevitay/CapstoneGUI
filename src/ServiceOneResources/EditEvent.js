import React from 'react';
import { useState, useContext } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
import EventType from './EventType';
import AuthContext from '../IdentityResources/Contexts/AuthContext';
import { Box, Grid, FormControl, TextField, Button, Radio, RadioGroup, FormLabel, FormControlLabel } from '@mui/material';
import InviteList from '../ServiceFourResources/InviteList/InviteList';


function EditEvent({event, setCurrentEvent, setEditMode, editMode}) {
  // let { id } = useParams();
  // const location = useLocation();
  // const state = location.state;
  const [eventName, setName] = useState(event.name);
  const [organization, setOrganization] = useState(event.organization);
  const [description, setDescription] = useState(event.description);
  const [eventType, setEventType] = useState(event.type);
  const [eventCost, setEventCost] = useState(event.baseCost);
  const [isPublic, setIsPublic] = useState(event.public);
  const [authState, ] = useContext(AuthContext);

  const radioEvent = (event) => {
    setIsPublic(event.target.value === 'true');
  };

  function updateEvent(eventName, organization, description, eventType, eventCost) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', authState.token);

    var raw = JSON.stringify({
      id: event.id,
      creatorID: authState.username,
      name: eventName,
      organization: organization,
      description: description,
      type: eventType,
      baseCost: eventCost,
      status: 'Planned',
      public: isPublic,
    });

    var requestOptions = {
      method: 'PUT',
      mode: 'cors',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/' + event.id, requestOptions)
      .then((response) => response.json())
      //converts response to json
      //then update the currentEvent state in Event with the updated event from the response body
      .then((response) => {setCurrentEvent(response);
        setEditMode(false);
      })
      .catch((error) => console.log('error', error));
    // will have to delete if we add other components

    // await routeToEvent();
  }

  // will have to delete if we add other components
  // async function routeToEvent() {
  //   // might be better to route to edit itinerary component page 
  //   window.location.replace(`/serviceOne/event/${id}`);
  // }
  
  return (
    <>
      <h2>Edit My Event</h2>
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
        <Box
          sx={{
            marginTop: 6,
            marginLeft: '30%',
            width: '80%',
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
            {/* might include Edit Itinerary component , might need to create logic to flow from editing basic event details to itinerary */}
            <Grid sx={{marginTop: 3, marginBottom: 3}}>

        <Button sx={{ width: '48%', marginRight: 1}} variant="contained" type="submit">
                Submit
              </Button>
              <Button sx={{ width: '48%'}} variant="contained" onClick={() => setEditMode(false)}>
                Cancel Edit{' '}
              </Button>
            </Grid>
          </FormControl>
        </Box>
      </form>
    </>
  );
}

export default EditEvent;