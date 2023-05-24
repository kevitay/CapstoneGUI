import React from "react";
import { useParams } from "react-router-dom";
 
export default function DeleteEvent() {
   
    let { id } = useParams();
  
    function handleDeleteEvent() {
    // console.log(id);
    fetch(
      "http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/" +
        id,
      {
        method: "DELETE",
      }
    )
      .then((response) => console.log("Success- Event" + id + "Deleted"))
      .catch((error) => console.log(error));
  }  
    return (    
      <a href={`/serviceOne/`} rel='noopener noreferrer'>
        <button        
          onClick={() => {
            handleDeleteEvent();
          }}
          >
          Delete Event
        </button>
      </a>     
    );  
}

