import { Button } from "@mui/material";
import { React, useState, useEffect } from "react";

function NameSearch({ resetStatus, participantState, setEventParticipants }) {
  const [searchTerm, setSearchTerm] = useState("");

  const captureCategory = (event) => {
    event.preventDefault();
    const newValue = event.target.value;
    setSearchTerm(newValue);
  }

  function handleSearch(e) {
    e.preventDefault();
    const categories = participantState.filter(x =>
      (x.user.firstName + " " + x.user.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
      x.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      x.user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setEventParticipants(categories);
  }

  useEffect(() => {
    setSearchTerm("");
  }, [resetStatus]);

  return (
    <form onSubmit={(e) => handleSearch(e)}>
      <input
        onChange={(e) => captureCategory(e)}
        type="text"
        value={searchTerm}
        placeholder="Enter Name"
      />
      <Button sx={{ ml: '.5em', height: '1.5em' }} variant="contained" type="submit">
        Search
      </Button>
    </form>
  )
}

export default NameSearch;
