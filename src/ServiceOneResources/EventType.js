import React from 'react';

const optionList = ['--Select event type--', 'Party', 'Celebration', 'Social', 'Reunion', 'Convention', 'Business Meeting', 'Trip', 'Alumni Gathering', 'Club Outing', 'Other'];

function EventType({eventType, setEventType}) {
  return (
    <>
      <label htmlFor="event-type">Event Type</label>
      <select name="event-type" id="event-type" value={eventType} onChange={(e) => setEventType(e.target.value)} required>
        {optionList.map((optionType) => {
          return (
            <option key={optionType} value={optionType}>
              {optionType}
            </option>
          );
        })}
      </select>
      {/* TODO: If "Other" add terniary and capture user input */}
    </>
  );
}

export default EventType;
