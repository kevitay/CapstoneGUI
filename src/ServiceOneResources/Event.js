import React, { useState, useEffect, useContext } from "react";
import OrganizerControl from "./OrganizerControl";
import AuthContext from "../IdentityResources/Contexts/AuthContext";
import { useParams } from "react-router-dom";
import Login from '../IdentityResources/Login';


//react event
export default function Event() {
  const [currentEvent, setCurrentEvent] = useState(null);
  const [authState,] = useContext(AuthContext);
  const [userIsOwner, setUserIsOwner] = useState(false);

    let { id } = useParams();
    console.log(id);

  useEffect(() => {
      function getEventById() {
        // setEventList(eventsJson);
        // TODO needs to be put into fetch call
        var requestOptions = {
          method: 'GET',
          mode: 'cors',
        };

        fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/' + id, requestOptions)
          .then((response) => response.json())
          .then((response) => setCurrentEvent(response))
          // .then((response) => console.log(response))
          .catch((error) => console.log('error', error));
        }
    
    getEventById();
    // eslint-disable-line react-hooks/exhaustive-deps
    }, [id]);

  useEffect(()=> {
    if (currentEvent !== null) {
      console.log(currentEvent);
      console.log("Event obj creator: " + currentEvent.creatorID);
      console.log(authState);
      console.log("UserAuth: " + authState.username);
      if (authState.username !== null && (authState.username === currentEvent.creatorID)) {
        setUserIsOwner(true);
      }
    }
  },[userIsOwner, authState,currentEvent]);  

  function dateFormatter(dateTime) {
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

    return `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}/${year} ${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${amPm}`;
  }

  //using an if statement to handle the async setCurrentEvent could also use {(currentEvent) ? (<div>…</div>) :( <></>)}
  if (!currentEvent) return null;

  return (
    <div>
      {(!authState.token)?(<Login></Login>):(<></>)}
      <div className='eventDetails'>
        <h1>{currentEvent.name}</h1>
        <h3>
          {currentEvent.organization} | {currentEvent.type}
        </h3>
        <p>{currentEvent.description}</p>
      </div>
      <div className='locationDetails'>
        <h2>When and Where</h2>
        <h3>Start Time: {dateFormatter(currentEvent.startDateTime)}</h3>
        <h3>End Time: {dateFormatter(currentEvent.endDateTime)}</h3>
        <h3>Start Location: {currentEvent.startLocation.name}</h3>
        <h3>End Location: {currentEvent.endLocation.name}</h3>
      </div>
      <div className='baseCost'>
        <h3>Base Cost: ${currentEvent.base_cost}</h3>
      </div>
      <div className='totalCost'>
        <h3>Total Cost: ${currentEvent.total_cost}</h3>
      </div>
      <div>
        {(userIsOwner) ? (<OrganizerControl event={currentEvent}/>):(<></>)}
      </div>
    </div>
  );
}
