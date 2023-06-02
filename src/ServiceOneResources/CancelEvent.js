import React from 'react';

export default function CancelEvent({ event, setCurrentEvent}) {
  let id = event.id;
  function handleCancelEvent() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      status: 'Cancelled',
    });

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/' + id, requestOptions)
      .then((response) => response.json())
      .then((response) => setCurrentEvent(response))
      .catch((error) => console.log('error', error));
    
    console.log(event);

  }

  return (
    <>
      <button onClick={() => {
        handleCancelEvent();
      }}>Cancel Event</button>
    </>
  );
}