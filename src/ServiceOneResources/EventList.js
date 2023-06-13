import React from 'react';
import { useState, useEffect, useContext } from 'react';
import EventBrief from './EventBrief';
import { EventContext } from './EventsContext';
import { Container, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import AuthContext from '../IdentityResources/Contexts/AuthContext';


// const eventsJson = require("./events.json")
//This component is to display our EventList, inside the return is an EventBrief that organizes the data from the fetch call to display only a brief summary.
export default function EventList() {
  const { state, dispatch } = useContext(EventContext);
  const [authState] = useContext(AuthContext);
  const [pageState, setPageState] = useState(1);
  const [cardsPerPage,] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredEvents = state.eventsList.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil((filteredEvents?.length || 0) / cardsPerPage);
  // console.log(state.eventsList)

  return (
    <Container maxWidth='xl' sx={{padding: 2}}>
      <TextField  id="searchBar" variant="standard" placeholder="Search Events By Name" value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)}/>
      <Stack className="userEvents" direction="row" useFlexGap flexWrap="wrap" justifyContent="center">
        {pageState > 1 ? (
          <Button size="large" sx={{ height: '200px', fontSize: '200px', paddingBottom: '35px', marginRight: 2}} variant="text" onClick={() => setPageState(pageState - 1)}>
            &#8249;
          </Button>
        ) : (
          <></>
        )}
        {filteredEvents.slice(cardsPerPage * (pageState - 1), cardsPerPage * pageState).map((event) => {
          return <EventBrief event={event} key={event.id} />;
        })}
        {cardsPerPage * pageState < state.eventsList.length ? (
          <Button size="large" sx={{ height: '200px', fontSize: '200px', paddingBottom: '35px' }} variant="text" onClick={() => setPageState(pageState + 1)}>
            &#8250;
          </Button>
        ) : (
          <></>
        )}
      </Stack>
      <Typography color="text.secondary" marginLeft={88}>
        {pageState}/{totalPages}
      </Typography>
    </Container>
  );
}
