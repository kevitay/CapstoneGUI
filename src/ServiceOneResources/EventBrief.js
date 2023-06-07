import React from 'react';
import { Card, CardActionArea, CardActions } from '@mui/material';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function EventBrief({ event }) {
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
        <>
          {location.address}, {location.city}, {location.state} {location.zipCode}
        </>
      );
    } else {
      return 'TBD';
    }
  }

  function Button({ children }) {
    return <button>{children}</button>;
  }

  return (
    <Card key={event.id} sx={{ height: '250px', width: '250px', marginRight: '16px', marginBottom: '16px' }}>
      <CardActionArea href={`/serviceOne/event/${event.id}`} rel="noopener noreferrer">
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Event Name: {event.name}
          </Typography>
          <Typography gutterBottom variant="p" component="div">
            Location: {locationFormatter(event.startLocation)}
          </Typography>
          <Typography gutterBottom variant="p" component="div">
            Time: {dateFormatter(event.startDateTime)}
          </Typography>
          <Typography gutterBottom variant="p" component="div">
            Type: {event.type}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
