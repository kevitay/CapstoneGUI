import React from "react";
import { useState, useEffect, useContext } from "react";
import CreateEvent from "./CreateEvent";
import InviteList from "../ServiceFourResources/InviteList/InviteList";
import AuthContext from "../IdentityResources/Contexts/AuthContext";
import Itinerary from "../ServiceThreeResources/Itinerary";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Stepper, Step, StepLabel } from "@mui/material";

function CreateEventFlow() {
  // Steps are: 1-New, 2-Invite, 3-Itinerary, 4-Items, 5-Tasks
  const [creationStep, setCreationStep] = useState(1);
  const [event, setEvent] = useState(null);
  const [authState] = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (creationStep === 4) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", authState.token);

      var raw = JSON.stringify({
        status: "Planned",
      });

      // PATCH call to change event status to "planned" once creationStep 4 is reached
      var requestOptions = {
        method: "PATCH",
        mode: "cors",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/" +
          event.id,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      // console.log(eventDate)
    }
  }, [creationStep, event, authState.token]);

  function handleNewEventClick() {
    //navigates to event details page without losing context
    navigate(`/serviceOne/event/${event.id}`);
  }

  function handleHomeClick() {
    //navigates to event details page without losing context
    navigate(`/`);
  }

  return (
    <Container>
      {event ? <h1>{event.name}</h1> : <></>}   
      <Stepper activeStep={creationStep - 1} alternativeLabel sx={{marginTop: 10, marginBottom: 2}}>
        <Step>
          <StepLabel>Create Event</StepLabel>
        </Step>
        <Step>
          <StepLabel>Seek Some Friends</StepLabel>
        </Step>
        <Step>
          <StepLabel>Itinerary</StepLabel>
        </Step>
        <Step>
          <StepLabel>Add Items</StepLabel>
        </Step>
        <Step>
          <StepLabel>Success!</StepLabel>
        </Step>
      </Stepper>
      {creationStep === 1 ? (
        <Paper
          sx={{
            padding: 4,
            backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff"),
          }}
        >
          <CreateEvent setCreationStep={setCreationStep} setEvent={setEvent} />{" "}
        </Paper>
      ) : (
        <></>
      )}
      {creationStep === 2 ? (
        <Paper
          sx={{
            padding: 4,
            backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff"),
          }}
        >
          <InviteList setCreationStep={setCreationStep} event={event} />
        </Paper>
      ) : (
        <></>
      )}
      {creationStep === 3 ? (
        <Paper
          sx={{
            padding: 4,
            backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff"),
          }}
        >
          <Itinerary
            creationStep={creationStep}
            setCreationStep={setCreationStep}
            eventId={event.id}
            userIsOwner={true}
          />
        </Paper>
      ) : (
        <></>
      )}
      {creationStep === 4 ? (
        <>
          <p>Add items</p>
        </>
      ) : (
        <></>
      )}
      {creationStep === 5 ? (
        <>
          <Container>
            <Paper
              sx={{
                padding: 4,
                backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff"),
              }}
            >
              <Stack justifyContent='center' alignItems='center' spacing={5}>
                <Typography variant='h4' fontWeight={500} sx={{ color: "green" }}>
                  You succesfully created an event
                </Typography>
                <Stack direction='row' spacing={5}>
                  <Button variant='contained' size='large' onClick={handleNewEventClick}>
                    Seek Your New Event
                  </Button>
                  <Button variant='outlined' size='large' onClick={handleHomeClick}>
                    Go to your Events
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          </Container>
        </>
      ) : (
        <></>
      )}
      <br />
      <br />
    </Container>
  );
}

export default CreateEventFlow;
