import React from 'react';
import { useContext } from 'react';
import AuthContext from '../IdentityResources/Contexts/AuthContext';
import { Button } from '@mui/material';

export default function CancelEvent({ event, setCurrentEvent }) {
  const [authState] = useContext(AuthContext);
  let id = event.id;
  function handleCancelEvent() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', authState.token);

    var raw = JSON.stringify({
      status: 'cancelled',
    });

    var requestOptions = {
      method: 'PATCH',
      mode: 'cors',
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
      <Button variant='outlined'
      size='small'
        onClick={() => {
          handleCancelEvent();
        }}
      >
        Cancel Event
      </Button>
    </>
  );
}
