import React from "react";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../IdentityResources/Contexts/AuthContext";
import EventBrief from "./EventBrief";

export default function CreatorEvents() {
  const [userEvents, setUserEvents] = useState(null);
  const [authState, ] = useContext(AuthContext);

  useEffect(() => {
    function getEventsByUsername() {

      // TODO needs to be put into fetch call
      var requestOptions = {
        method: "GET",
        mode: "cors",
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
          <hr></hr>
          <div className='userEvents'>
            {userEvents.map((event) => {
              return <EventBrief event={event} key={event.id} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}
