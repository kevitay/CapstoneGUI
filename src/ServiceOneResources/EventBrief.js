import React from 'react';
import { Card, CardActionArea, Stack, colors } from '@mui/material';
import { useNavigate } from 'react-router';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

export default function EventBrief({ event }) {
  const navigate = useNavigate();
  
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
    if (location === null) {
      return 'TBD';
    } else if (location.address === '') {
      return 'TBD';
    } else {
      // console.log(location.address);
      return (
        <>
          {location.address}, {location.city}, {location.state} {location.zipCode}
        </>
      );
    }
  }

  // function Button({ children }) {
  //   return <button>{children}</button>;
  // }

  function handleEventCardClick() {
    //navigates to event details page without losing context
    navigate(`/serviceOne/event/${event.id}`);
  }

  return (
    // <Card key={event.id} sx={{ height: '250px', width: '250px', marginRight: '16px', marginBottom: '16px', border: '1px solid lightgray'}}>
    <Card key={event.id} sx={{ width: '200px', height: '200px', marginRight: '16px', backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff') }}>
      <CardActionArea onClick={handleEventCardClick} rel="noopener noreferrer" sx={{ height: '100%' }}>
        <CardContent>
          <Typography gutterBottom variant="p" component="div" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            {event.name}
          </Typography>
          <Divider sx={{ color: '#1976d2'}}></Divider>
          <Typography gutterBottom variant="subtitle1" component="div">
            {event.hasOwnProperty('startLocation') ? 'Location:' + locationFormatter(event.startLocation) : ''}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
            {event.hasOwnProperty('startDateTime') ? 'Time:' + dateFormatter(event.startDateTime) : ''}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            Type: {event.type}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
