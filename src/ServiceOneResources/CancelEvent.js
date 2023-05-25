import React from 'react';

export default function CancelEvent({ id }) {
  function handleCancelEvent() {
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

    fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/' + id, requestOptions)
      .then((response) => response.json())
      // .then((response) => updateState(response))
      .then((result) => alert(result.name + ' has been cancelled'))
      .catch((error) => console.log('error', error));
  }

  return (
    <>
      <button onClick={() => handleCancelEvent}>Cancel Event</button>
    </>
  );
}