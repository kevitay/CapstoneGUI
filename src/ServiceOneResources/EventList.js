import React from 'react';
import { useEffect, useContext } from 'react';
import EventBrief from './EventBrief';
import { EventContext } from './EventsContext';
import { Stack } from '@mui/material';
import AuthContext from '../IdentityResources/Contexts/AuthContext';

// const eventsJson = require("./events.json")
//This component is to display our EventList, inside the return is an EventBrief that organizes the data from the fetch call to display only a brief summary.
export default function EventList() {
  const { state, dispatch } = useContext(EventContext);
  const [authState] = useContext(AuthContext);

  useEffect(() => {
    function getEvents() {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', authState.token);
      var requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders,
      };

      fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/extended', requestOptions)
        .then((response) => response.json())
        .then((response) => {
          dispatch({ type: 'SET_EVENTS', payload: response.extEventList });
          //  console.log(response.eventList)
        })
        .catch((error) => console.log('error', error));
    }

    getEvents();
  }, [dispatch]);

  // console.log(state.eventsList)

  return (
    <div>
      <h1>Event List</h1>
      <Stack className="userEvents" direction="row" useFlexGap flexWrap="wrap" justifyContent="center">
        {state.eventsList.map((event) => {
          return <EventBrief event={event} key={event.id} />;
        })}
      </Stack>
    </div>
  );
}
