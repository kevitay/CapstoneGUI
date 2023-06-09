import React from "react";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../IdentityResources/Contexts/AuthContext";
import EventBrief from "./EventBrief";
import { Button, Stack } from "@mui/material";

export default function CreatorEvents() {
  const [userEvents, setUserEvents] = useState(null);
  const [authState, ] = useContext(AuthContext);
  const [pageState, setPageState] = useState(1);
  const [cardsPerPage,] = useState(4);

  useEffect(() => {
    function getEventsByUsername() {

      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', authState.token);

      // TODO needs to be put into fetch call
      var requestOptions = {
        method: 'GET',
        mode: 'cors',
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
      console.log(authState);
    }

    getEventsByUsername();
  }, [authState]);

  return (
    <>
      {authState.username === '' || userEvents === null ? (
        <></>
      ) : (
        <div>
      <h1>Creator Events</h1>
      <Stack className="userEvents" direction="row" useFlexGap flexWrap="wrap" justifyContent="center">
        {pageState > 1 ? <Button variant='text' onClick={() => setPageState(pageState - 1)}>Prev</Button> : <></>}
        {userEvents.slice(cardsPerPage * (pageState - 1), cardsPerPage * pageState).map((event) => {
          return <EventBrief event={event} key={event.id} />;
        })}
        {cardsPerPage * pageState < userEvents.length ? <Button variant='text' onClick={() => setPageState(pageState + 1)}>Next</Button> : <></>}
      </Stack>
    </div>
      )}
    </>
  );
}
