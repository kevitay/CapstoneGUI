import React from 'react';
import { useState, useEffect, useContext } from 'react';
import EventBrief from './EventBrief';
import { EventContext } from './EventsContext';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import AuthContext from '../IdentityResources/Contexts/AuthContext';


// const eventsJson = require("./events.json")
//This component is to display our EventList, inside the return is an EventBrief that organizes the data from the fetch call to display only a brief summary.
export default function EventList() {
  const { state, dispatch } = useContext(EventContext);
  const [authState] = useContext(AuthContext);
  const [pageState, setPageState] = useState(1);
  const [cardsPerPage,] = useState(4);

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
  }, [dispatch, authState.token]);

  // console.log(state.eventsList)

  return (
    <div>
      <h1>Event List</h1>
      <Stack className="userEvents" direction="row" useFlexGap flexWrap="wrap" justifyContent="center">
        {pageState > 1 ? (
          <Button size="large" sx={{ marginRight: '16px', height: '225px', fontSize: '200px', paddingBottom: '35px' }} variant="text" onClick={() => setPageState(pageState - 1)}>
            &#8249;
          </Button>
        ) : (
          <></>
        )}
        {state.eventsList.slice(cardsPerPage * (pageState - 1), cardsPerPage * pageState).map((event) => {
          return <EventBrief event={event} key={event.id} />;
        })}
        {cardsPerPage * pageState < state.eventsList.length ? (
          <Button size="large" sx={{ height: '225px', fontSize: '200px', paddingBottom: '35px' }} variant="text" onClick={() => setPageState(pageState + 1)}>
            &#8250;
          </Button>
        ) : (
          <></>
        )}
      </Stack>
    </div>
  );
}
