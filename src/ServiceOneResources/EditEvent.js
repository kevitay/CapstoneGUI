import React from 'react'

function EditEvent({ id }) {

      function handlEditEvent() {
        console.log(id);
        setDeleteStatus('pending');
        fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/' + id, {
          method: 'DELETE',
        })
          .then((response) => alert('Success- Event ' + id + ' Deleted'))
          .catch((error) => console.log(error));
      }
      return (
        <>
            <button
              onClick={() => {
                handleEditEvent();
              }}
            >
              Delete Event
            </button>
            <a href={`/serviceOne/CreateEvent.js`} rel="noopener noreferrer">
              <button>Edit Event</button>
            </a>
        </>
      );  
}

export default EditEvent