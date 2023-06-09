import React, { useState, useEffect, useContext } from "react";
import Login from "../IdentityResources/Login";
import OrganizerControl from "./OrganizerControl";
import AuthContext from "../IdentityResources/Contexts/AuthContext";
import { useParams } from "react-router-dom";
import EditEvent from "./EditEvent";
import { Container } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const emptyLocation = {address:'', city:'',state:'',zipCode:''};
const initialExtendedFields = {startDateTime:'', endDateTime:'',startLocation: emptyLocation, endLocation:emptyLocation };


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
    const [expanded, setExpanded] = useState("panel1");
    const handleChange = (panel) => (expanded, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
 

  //loads event details on page load.
  useEffect(() => {
    function getEventById() {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', authState.token);
      var requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders,
      };

      fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/extended/' + id, requestOptions)
        .then((response) => response.json())
        .then((response) => setCurrentEvent(response))
        .catch((error) => console.log('error', error));
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
      if (Object.keys(currentEvent).includes("startLocation")){
        let newExtendedFields = {startDateTime: currentEvent.startDateTime, 
                                  endDateTime: currentEvent.endDateTime,
                                  startLocation: currentEvent.startLocation, 
                                  endLocation: currentEvent.endLocation } 
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
      let amPm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;

      return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amPm}`;
    } else {
      return 'TBD';
    }
  }

  function locationFormatter(location) {
    if (location !== null) {
      // console.log(location.address);
      return (
        <p>
          {location.address}
          <br />
          {location.city}, {location.state} {location.zipCode}
        </p>
      );
    } else {
      return 'TBD';
    }
  }

  //using an if statement to handle the async setCurrentEvent could also use {(currentEvent) ? (<div>…</div>) :( <></>)}
  if (!currentEvent) return null;
  return (
    <>
    <Container maxWidth='lg' >
      {(!authState.token)?(<Login handleClose={handleClose}></Login>):(<></>)}
      
      {(!editMode)?(
      <>  
        <div className='eventDetails'>
          <h1>{currentEvent.name}</h1>
        </div>
        <Accordion
        sx={{ width: "75%" }}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          >
          <Typography sx={{ width: "50%", flexShrink: 0 }}>
            {currentEvent.name} - Event Overview
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        {/* Team Component goes here  */}
          <h3>
            {currentEvent.organization} | {currentEvent.type}
          </h3>
          <p>{currentEvent.description}</p>
          <p>Status: {currentEvent.status}</p>
          <div className='locationDetails'>
            <h2>When and Where</h2>
            <h3>Start Time: {dateFormatter(extendedFields.startDateTime)}</h3>
            <h3>End Time: {dateFormatter(extendedFields.endDateTime)}</h3>
            <h3>Start Location: {locationFormatter(extendedFields.startLocation)}</h3>
            <h3>End Location: {locationFormatter(extendedFields.endLocation)}</h3>
          </div>
          <div className='baseCost'>
            <h3>Base Cost: ${currentEvent.baseCost}</h3>
          </div>
        </AccordionDetails>
      </Accordion>
      </>
      ):(<EditEvent event={currentEvent} setCurrentEvent={setCurrentEvent} setEditMode={setEditMode}/>)}
      <div>
        {(userIsOwner) ? (<OrganizerControl event={ currentEvent } setCurrentEvent={ setCurrentEvent } editMode={editMode} setEditMode={setEditMode} />):(<></>)}
      </div>
      <Accordion
        sx={{ width: "75%" }}
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          >
          <Typography sx={{ width: "50%", flexShrink: 0 }}>
            {currentEvent.name} - Event Participants
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        {/* Team Component goes here  */}
        <p>placeholder for Participants list user view</p>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ width: "75%" }}
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          >
          <Typography sx={{ width: "50%", flexShrink: 0 }}>
            {currentEvent.name} - Event Itinerary
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        {/* Team Component goes here  */}
        <p>placeholder for Itinerary user view </p>    
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ width: "75%" }}
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          >
          <Typography sx={{ width: "50%", flexShrink: 0 }}>
            {currentEvent.name} - Event Checklist
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        {/* Team Component goes here  */}
        <p>placeholder for Checklist user view</p>
        </AccordionDetails>
      </Accordion>
    </Container>
    </>

  );
}
