import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../IdentityResources/Contexts/AuthContext.js";
import CurrentEvent from "./CurrentEvent.js";
import { Button, Container, Typography } from '@mui/material'; 
import { Stack } from "@mui/system";

function CurrentEvents() {

    const [authState, ] = useContext(AuthContext);
    const [userEventsList, setUserEventsList] = useState([])
    const [loading, setLoadState] = useState(false);
    const [eventInfo, setEventInfo] = useState([]);
    const [pageState, setPageState] = useState(1);
    const [cardsPerPage,] = useState(3);

    const totalPages = Math.ceil((userEventsList?.length || 0) / cardsPerPage);

    useEffect(() => {
        var requestOptions = {
          method: 'GET'
        };
        setLoadState(true);
      
        fetch("http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/participant/" + authState.username + "/events", requestOptions)
        .then(response => response.json())
        .then(result => {
          const eventPartArr = result.eventParticipants;
          setUserEventsList(eventPartArr);
    
          const fetchEventPromises = eventPartArr.map(eventPart => {
            return fetch("http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/" + eventPart.eventId)
              .then(response => response.json());
          });
    
          return Promise.all(fetchEventPromises);
        })
        .then(results => {
          setEventInfo(results);
          setLoadState(false);
        })
        .catch(error => console.log('error', error));
    },[authState]);

    return (
      <Container maxWidth='xl' sx={{padding: 2}}>
      <Typography variant="h4" fontWeight="bold" gutterBottom >
        Events I've been invited to
      </Typography>
        {loading ? <></>:
        <>
          <Stack className="invitedEvents" direction="row" useFlexGap flexWrap="wrap" justifyContent="center">
            {pageState > 1 ? (
              <Button size="large" sx={{ height: '200px', fontSize: '200px', paddingBottom: '35px', marginRight: 2}} variant="text" onClick={() => setPageState(pageState - 1)}>
                &#8249;
              </Button>
            ) : (
              <></>
            )}

            {/* {userEventsList.map((event) => <><CurrentEvent event={event} eventInfo={eventInfo}></CurrentEvent></>)} */}
            {userEventsList.slice(cardsPerPage * (pageState - 1), cardsPerPage * pageState).map((event) => <><CurrentEvent event={event} eventInfo={eventInfo}></CurrentEvent></>)}
            {cardsPerPage * pageState < userEventsList.length ? (
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
        </>}
      </Container>
    )
}

export default CurrentEvents; 