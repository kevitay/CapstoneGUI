import React from 'react';

export default function CancelEvent({ id }) {

  async function handleCancelEvent() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      status: 'cancelled',
    });

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const event = await fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/' + id, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log('error', error));
    
    console.log(event);

    async function reloadWindow() {
      await handleCancelEvent();
      window.location.reload();
    }

    reloadWindow();
  }

  return (
    <>
      <button onClick={() => handleCancelEvent()}>Cancel Event</button>
    </>
  );
}