import React from 'react';

export default function OrganizerControl() {

  return (
    <div>
      <h2>Organizer Controls</h2>
      <input type="checkbox" id="public" name="public" value="isPublic"></input><label for="public">Public Event</label>
      <h3>Show Participants</h3>
      <button>Edit Event</button>
      <button>Cancel Event</button>
    </div>
  );

}