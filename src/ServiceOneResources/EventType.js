import React from 'react';
import { useState, useEffect } from 'react';

const optionList = ['--Select event type--', 'Party', 'Celebration', 'Social', 'Reunion', 'Convention', 'Business Meeting', 'Trip', 'Alumni Gathering', 'Club Outing', 'Other'];

function EventType({ eventType, setEventType }) {
  const [otherType, setOtherType] = useState('');

  useEffect(() => {
    setEventType('Other - ' + otherType);
  }, [otherType, setEventType]);

  return (
    <>
      <label htmlFor="event-type">Event Type</label>
      <select name="event-type" id="event-type" value={eventType} onChange={(e) => setEventType(e.target.value)} required>
        {optionList.map((optionType) => {
          return (
            <>
              {optionType.startsWith('Other') ? (
                <option key={optionType} value={optionType}>
                  Other
                </option>
              ) : (
                <option key={optionType} value={optionType}>
                  {optionType}
                </option>
              )
              }

            </>
          );
        })}
      </select>

      {eventType.startsWith('Other') ? (
        <>
          <label>Other Event Type</label>
          <input type="text" name="eventType" value={otherType} onChange={(e) => setOtherType(e.target.value)} required />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default EventType;
  

