import { React, useState, useEffect } from "react";
import { FormControl, Button, Input } from '@mui/material';

function InviteNameSearch({ userState, setUserState, resetStatus }) {
  const [searchTerm, setSearchTerm] = useState("");

  const captureCategory = (event) => {
    event.preventDefault();
    const newValue = event.target.value;
    setSearchTerm(newValue);
  }

  function handleSearch(e) {
    e.preventDefault();
    const results = userState.filter(x =>
      x.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      x.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUserState(results);
  }

  useEffect(() => {
    setSearchTerm("");
  }, [resetStatus]);

  return (
    <form onSubmit={(e) => handleSearch(e)}>
      <FormControl>
        <Input
          onChange={(e) => captureCategory(e)}
          type="text"
          value={searchTerm}
          placeholder="Enter Name"
        />
        <Button type="submit">Search</Button>
      </FormControl>
    </form>
  )
}

export default InviteNameSearch;
