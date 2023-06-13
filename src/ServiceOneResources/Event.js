import React, { useState, useEffect, useContext } from "react";
import Login from "../IdentityResources/Login";
import OrganizerControl from "./OrganizerControl";
import AuthContext from "../IdentityResources/Contexts/AuthContext";
import { useParams } from "react-router-dom";
import EditEvent from "./EditEvent";
import { Box, Chip, Container, Grid, Paper, Stack } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Itinerary from "../ServiceThreeResources/Itinerary";
import ParticipantsList from "../ServiceFourResources/ParticipantsList/ParticipantsList";
import EventImageNav from "../ServiceFourResources/EventImages/EventImageNav";

const emptyLocation = { address: "", city: "", state: "", zipCode: "" };
const initialExtendedFields = {
  startDateTime: "",
  endDateTime: "",
  startLocation: emptyLocation,
  endLocation: emptyLocation,
};

//react event
export default function Event() {
  //stores the returned event from event API. After an edit, the event is updated with the result of the post and the extended fields are lost.
  const [currentEvent, setCurrentEvent] = useState(null);

  //stores the extended fields that event API sources from itinerary
  const [extendedFields, setExtendedFields] = useState(initialExtendedFields);
  const [authState] = useContext(AuthContext);

  //Stores the value whether the logged in user is the owner to allow display of Organizer Control.
  const [userIsOwner, setUserIsOwner] = useState(false);

  //Toggle between read only and edit mode. Edit Mode is set from Organizer Control.
  const [editMode, setEditMode] = useState(false);

  //used for modified Login component which expects a function from signin button.
  const handleClose = () => {};

  let { id } = useParams();
  // console.log(id);

  //manages state for the accordians.
  //expanded contains the label for which panel is open and false if none are open.
  //handle change is called and it either expands or collapses the panel that was clicked
  //and collapses any other panels that were expanded.
  const [expanded, setExpanded] = useState("panel1");
  const handleChange = (panel) => (expanded, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //loads event details on page load.
  useEffect(() => {
    function getEventById() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", authState.token);
      var requestOptions = {
        method: "GET",
        mode: "cors",
        headers: myHeaders,
      };

      fetch(
        "http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/extended/" +
          id,
        requestOptions
      )
        .then((response) => response.json())
        .then((response) => setCurrentEvent(response))
        .catch((error) => console.log("error", error));
    }
    getEventById();
  }, [id, authState]);

  //used to set the state if the owner of an event is also the logged in user.
  useEffect(() => {
    if (currentEvent !== null) {
      if (authState.username !== null && authState.username === currentEvent.creatorID) {
        setUserIsOwner(true);
      }
    }
  }, [userIsOwner, authState, currentEvent]);

  //used to set the state for the extended fields sourced indirectly from the events API
  useEffect(() => {
    if (currentEvent !== null) {
      if (Object.keys(currentEvent).includes("startLocation")) {
        let newExtendedFields = {
          startDateTime: currentEvent.startDateTime,
          endDateTime: currentEvent.endDateTime,
          startLocation: currentEvent.startLocation,
          endLocation: currentEvent.endLocation,
        };
        setExtendedFields(newExtendedFields);
      }
    }
  }, [currentEvent]);

  function dateFormatter(dateTime) {
    if (dateTime !== null) {
      const date = new Date(dateTime);
      // Extracting date components
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const month = date.getMonth() + 1; // Months are zero-based, so adding 1
      const day = date.getDate();
      const year = date.getFullYear();
      // Converting to 12-hour format
      let amPm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;

      return `${month.toString().padStart(2, "0")}/${day
        .toString()
        .padStart(2, "0")}/${year} ${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${amPm}`;
    } else {
      return 'TBD';
    }
  }

  function locationFormatter(location) {
    if (location === null) {
      return 'TBD';
    } else if (location.address === '') {
      return 'TBD';
    } else {
      // console.log(location.address);
      return (
        <>
          {location.address}
          <br/>
          {location.city}, {location.state} {location.zipCode}
        </>
      );
    }
  }

  //the ternary checks if status is a property
  const statusColor =
    currentEvent?.status === "Draft"
      ? "warning"
      : currentEvent?.status === "Planned"
      ? "success"
      : "error";

      //This function handles the google maps api  
  function handleMap(location) {
    //todo: add default image beside empty address for first two conditions.
    
    //check for missing address
    if (location === null) return "";

    //separately check for "" address
    else if (location.address === "") return "";
    
    //finally return our desired google map when address is valid.
    else if (location !== null) {
      const baseUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCvQmZJBjFQKdFJt92CFC13mksPKj-pvh4&`;
      const addressComplete = `${location.address},${location.city},${location.state},${location.zipCode}`;
      const params = new URLSearchParams(`q=${addressComplete}`);
      return `${baseUrl}${params.toString()}`;
    }
    return "";
  }
  //using an if statement to handle the async setCurrentEvent could also use {(currentEvent) ? (<div>…</div>) :( <></>)}
  if (!currentEvent) return null;
  return (
    <>
      <Container maxWidth='xl' sx={{ marginTop: 4 }}>
        <Stack direction='row'>
          <Container maxWidth='xl'>
            {!authState.token ? <Login handleClose={handleClose}></Login> : <></>}

            {!editMode ? (
              <>
                <div className='eventDetails'>{/* <h1>{currentEvent.name}</h1> */}</div>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    margin: "auto",
                    maxWidth: "100%",
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item>
                      <iframe
                        src={handleMap(extendedFields.startLocation)}
                        width='220'
                        height='220'
                        style={{ border: 0 }}
                        allowFullScreen=''
                        loading='lazy'
                        referrerPolicy='no-referrer-when-downgrade'
                        title='myMap'
                      ></iframe>
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Grid item xs>
                          <Typography
                            variant='h4'
                            sx={{ width: "75%", flexShrink: 0, fontWeight: "bold", fontFamily: "Alice"}}
                          >
                            {currentEvent.name}
                            <EventImageNav eventId={id}/>
                          </Typography>
                          <Typography
                            variant='subtitle1'
                            sx={{ fontWeight: "bold", marginLeft: 0.5, marginTop: 1 }}
                          >
                            Organization: {currentEvent.organization} | Type: {currentEvent.type}
                          </Typography>
                          <Stack direction='row' spacing={2} sx={{ marginLeft: 1 }}>
                            <Typography variant='subtitle2'>
                              Start Time: {dateFormatter(extendedFields.startDateTime)}
                            </Typography>
                            <Typography variant='subtitle2'>
                              End Time: {dateFormatter(extendedFields.endDateTime)}
                            </Typography>
                          </Stack>
                          <Typography variant='h7' sx={{ marginLeft: 0.5, fontWeight: "bold" }}>
                            Location:
                          </Typography>
                          <Typography variant='body2' sx={{ marginLeft: 1 }}>
                            Meeting at: {locationFormatter(extendedFields.startLocation)}
                          </Typography>
                          <Typography variant='body2' sx={{ marginLeft: 1 }}>
                            Ending at: {locationFormatter(extendedFields.endLocation)}
                          </Typography>
                          <Typography variant='body1' sx={{ marginLeft: 0.5, fontWeight: "bold" }}>
                            Description:
                          </Typography>
                          <Typography
                            variant='body2'
                            color='text.secondary'
                            sx={{ marginLeft: 1.5 }}
                          >
                            {currentEvent.description}
                          </Typography>
                          <Typography sx={{ marginLeft: 0.5 }} variant='body2'>
                            Cost: ${currentEvent.baseCost}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Chip label={currentEvent.status} color={statusColor} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </>
            ) : (
              <EditEvent
                event={currentEvent}
                setCurrentEvent={setCurrentEvent}
                setEditMode={setEditMode}
                editMode={editMode}
              />
            )}
            <Accordion
              sx={{ width: "100%", backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff"}}
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1bh-content'
                id='panel1bh-header'
              >
                <Typography sx={{ width: "50%", flexShrink: 0 }}>
                  {currentEvent.name} - Event Participants
                </Typography>
                
              </AccordionSummary>
              <AccordionDetails>
              {/* {!editMode ? "" : <InviteList editMode={true} eventId={currentEvent.id}></InviteList> } */}
                <ParticipantsList eventId={currentEvent.id}></ParticipantsList>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{ width: "100%", backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff" }}
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1bh-content'
                id='panel1bh-header'
              >
                <Typography sx={{ width: "50%", flexShrink: 0 }}>
                  {currentEvent.name} - Event Itinerary
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* Team Component goes here  */}
                <Itinerary eventId={currentEvent.id} userIsOwner={userIsOwner} />
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{ width: "100%", backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff" }}
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1bh-content'
                id='panel1bh-header'
              >
                <Typography sx={{ width: "50%", flexShrink: 0 }}>
                  {currentEvent.name} - Event Checklist
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* Team Component goes here  */}
                <Typography>placeholder for Checklist user view</Typography>
              </AccordionDetails>
            </Accordion>
          </Container>
          {userIsOwner ? (
            <Box
              sx={{
                borderRadius: "10px",
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
                padding: 2,
                height: "20vh",
                width: "20vh",
                backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff"),
              }}
            >
              <OrganizerControl
                event={currentEvent}
                setCurrentEvent={setCurrentEvent}
                editMode={editMode}
                setEditMode={setEditMode}
              />
            </Box>
          ) : (
            <></>
          )}
        </Stack>
      </Container>
    </>
  );
}
