import React from "react";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../IdentityResources/Contexts/AuthContext";
import EventBrief from "./EventBrief";
import { Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";

export default function CreatorEvents() {
  const [userEvents, setUserEvents] = useState(null);
  const [authState] = useContext(AuthContext);
  const [pageState, setPageState] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [cardsPerPage] = useState(4);

  useEffect(() => {
    function getEventsByUsername() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", authState.token);
      // console.log(authState)

      // TODO needs to be put into fetch call
      var requestOptions = {
        method: "GET",
        mode: "cors",
        headers: myHeaders,
      };

      fetch(
        `http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event?creator=${authState.username}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((response) => {
          setUserEvents(response.eventList);
          //  console.log(response.eventList)
        })
        .catch((error) => console.log("error", error));
      // console.log(authState);
    }

    getEventsByUsername();
  }, [authState]);

  const filteredEvents = userEvents && userEvents.filter((event) =>
  event.name.toLowerCase().includes(searchQuery.toLowerCase())
);

const totalPages = Math.ceil((filteredEvents?.length || 0) / cardsPerPage);
  return (
    <>
      {authState.username === "" || userEvents === null ? (
        <Paper sx={{textAlign: 'center', padding: 2}} elevation={3}>
        <Typography variant='h4' fontWeight='bold' gutterBottom > Looks Like You haven't Created any Events! </Typography>
        <Button variant="contained" sx={{justifyContent: 'center'}}>Create Event</Button>
        </Paper>
      ) : (
        <Container maxWidth='xl' sx={{ marginTop: 2 }}>
          <Stack direction='row' spacing={38}>
          <Typography variant='h4' fontWeight='bold' gutterBottom>
            Events I've Created
          </Typography>
          <TextField id="searchBar" variant="standard" placeholder="Search Events By Name" value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)}/>
          </Stack>
           <Stack
            className='userEvents'
            direction='row'
            useFlexGap
            flexWrap='wrap'
            justifyContent='center'
          >
            {pageState > 1 ? (
              <Button
                size='large'
                sx={{
                  marginRight: "16px",
                  height: "200px",
                  fontSize: "200px",
                  paddingBottom: "35px",
                }}
                variant='text'
                onClick={() => setPageState(pageState - 1)}
              >
                &#8249;
              </Button>
            ) : (
              <></>
            )}
            {filteredEvents.length === 0 ? (
              <Typography variant="body1">No events found.</Typography>
            ) : (
              filteredEvents
                .slice(cardsPerPage * (pageState - 1), cardsPerPage * pageState)
                .map((event) => {
                  return <EventBrief event={event} key={event.id} />;
                })
            )}
            {cardsPerPage * pageState < userEvents.length ? (
              <Button
                size='large'
                sx={{ height: "200px", fontSize: "200px", paddingBottom: "35px" }}
                variant='text'
                onClick={() => setPageState(pageState + 1)}
              >
                &#8250;
              </Button>
            ) : (
              <></>
            )}
          </Stack>
          <Typography color="text.secondary" marginLeft={88}>{pageState}/{totalPages}</Typography>
        </Container>
      )}
    </>
  );
}
