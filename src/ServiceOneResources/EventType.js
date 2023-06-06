import React from 'react';
import { useState, useEffect } from 'react';

const optionList = ['--Select event type--', 'Party', 'Celebration', 'Social', 'Reunion', 'Convention', 'Business Meeting', 'Trip', 'Alumni Gathering', 'Club Outing', 'Other'];

function EventType({ eventType, setEventType }) {
  const initialEventType = eventType ? (eventType.startsWith("Other")?("Other"):(eventType)) : ('--Select event type--');

  const [optionListSelection, setOptionListSelection] = useState(initialEventType);
  const [otherType, setOtherType] = useState(eventType.startsWith("Other")?eventType.substring(8):'');

  useEffect(() => {
    if (optionListSelection === 'Other')
    setEventType('Other - ' + otherType);
  }, [optionListSelection, otherType, setEventType]);

  useEffect(() => {
    setEventType(optionListSelection);
  }, [optionListSelection, setEventType]);

  return (
    <>
      <label htmlFor="event-type">Event Type</label>
      <select name="event-type" id="event-type" value={optionListSelection} onChange={(e) => setOptionListSelection(e.target.value)} required>
        {optionList.map((optionType) => {
          return (
            <>
                <option key={optionType} value={optionType}>
                  {optionType}
                </option>
            </>
          );
        })}
      </select>

      {optionListSelection === 'Other' ? (
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