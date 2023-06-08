import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../IdentityResources/Contexts/AuthContext.js";
import CurrentEvent from "./CurrentEvent.js";
import { Box } from '@mui/material'; 

function CurrentEvents() {

    const [authState, ] = useContext(AuthContext);
    const [userEventsList, setUserEventsList] = useState([])
    const [loading, setLoadState] = useState(false);
    const [eventInfo, setEventInfo] = useState([]);

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
        <div>
          <Box sx={{
            display: 'flex'
            }}>
            {
            loading ? "" : userEventsList.map((event) => <><CurrentEvent event={event} eventInfo={eventInfo}></CurrentEvent></>)
            }
            </Box>
        </div>
    )

}

export default CurrentEvents; 