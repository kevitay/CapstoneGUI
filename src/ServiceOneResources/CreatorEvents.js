import React from "react";
import { useState } from "react";


function getEventsByUsername() {
    // setEventList(eventsJson);
    // TODO needs to be put into fetch call
    var requestOptions = {
      method: 'GET',
      mode: 'cors',
    };

    fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event', requestOptions)
      .then((response) => response.json())
      .then((response) => {
        dispatch({ type: 'SET_EVENTS', payload: response.eventList });
        //  console.log(response.eventList)
      })
      .catch((error) => console.log('error', error));
  }
