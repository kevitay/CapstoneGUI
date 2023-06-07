import React from "react";
import {useState} from "react";
 
//will need to change to account for cascading delete to other components
export default function DeleteEvent({id}) {
    let [deleteStatus, setDeleteStatus] = useState("preDelete");
  
    function handleDeleteEvent() {
     console.log(id);
    setDeleteStatus("pending");
     fetch(
      "http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/" +
        id,
      {
        method: "DELETE",
      }
    )
     .then((response) => alert("Success- Event " + id + " Deleted"))
     .then((response) => setDeleteStatus("deleted"))
      .catch((error) => console.log(error));
  }  
    return (
      <> 
      {(deleteStatus === "preDelete") ? (<button onClick={() => {handleDeleteEvent() }}>Delete Event</button>):(<></>)}
      {(deleteStatus === "pending") ? (<p>Deleting...</p>) : (<></>)}
      {(deleteStatus === "deleted") ? (<a href={`/serviceOne/`} rel='noopener noreferrer'>
        <button>Return to Events </button></a>):(<></>) }
      </> 
    );  
}

