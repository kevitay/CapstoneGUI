import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  Modal,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  TextField,
  Card,
  Divider,
  Typography,
  CardActionArea,
} from "@mui/material";

function CurrentEvent({ event, eventInfo }) {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(event.status);
  const [carpool, setCarpool] = useState(event.carpool);
  const [seatsAvail, setSeatsAvail] = useState(event.seatsAvail);
  const [index, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    backgroundColor: (theme) =>
      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  };

  useEffect(() => {
    const currentEvent = event.eventId;
    setCurrentIndex(eventInfo.findIndex((obj) => obj.id === currentEvent));
  }, [event.eventId, eventInfo, status, carpool, seatsAvail]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    var raw = JSON.stringify({
      status: status,
      carpool: carpool,
      seatsAvail: seatsAvail,
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/participants/" +
        event.eventParticipantId,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {})
      .catch((error) => console.log("error", error));
    setEditMode(false);
  };

  if (editMode) {
    return (
      <Modal
        open={handleEditClick}
        onClose={handleSaveClick}
        aria-labelledby="preferences-label"
        aria-describedby="preferences-label"
      >
        <Box sx={style}>
          <h3>{eventInfo[index].name}</h3>
          <p>Organizer: {eventInfo[index].creatorID}</p>
          <div>
            <p>
              <FormControl>
                <FormLabel id="status-radio-buttons-group">Status:</FormLabel>
                <RadioGroup
                  aria-labelledby="status-radio-buttons-group"
                  name="status-radio-buttons"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <FormControlLabel value="Going" control={<Radio />} label="Going" />
                  <FormControlLabel value="Not Going" control={<Radio />} label="Not Going" />
                  <FormControlLabel value="Tentative" control={<Radio />} label="Tentative" />
                </RadioGroup>
              </FormControl>
            </p>
            <p>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={carpool}
                    onChange={(e) => setCarpool(e.target.checked)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Carpooling? "
              />
            </p>
            {carpool && ( // Only display the following if carpool is checked
              <TextField
                id="seats-avail"
                onChange={(e) => setSeatsAvail(parseInt(e.target.value))}
                label="Seats Available: "
                type="number"
                value={seatsAvail}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
            )}
            <Button variant="contained" onClick={handleSaveClick}>
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    );
  }

  function handleEventCardClick() {
    navigate(`/serviceOne/event/${event.eventId}`);
  }

  return (
    <Card
      sx={{
        margin: 1,
        width: "30em",
        height: "",
        p: "1.5em",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <CardActionArea onClick={handleEventCardClick} rel="noopener noreferrer" sx={{ height: '100%' }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {eventInfo[index].name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Organizer: {eventInfo[index].creatorID}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Organization: {eventInfo[index].organization}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Event Type: {eventInfo[index].type}
        </Typography>
        <Divider sx={{ my: "1em" }} />
        <Typography variant="body1" gutterBottom>
          Base Cost: {eventInfo[index].baseCost}
        </Typography>
        <Typography variant="h6" fontWeight="bold" mt={2}>
          Your Event Info
        </Typography>
        <Typography variant="body1">
          Status:{" "}
          <strong style={{ color: status === null ? "red" : "inherit" }}>
            {status || "Needs Response"}
          </strong>
        </Typography>
        <Typography variant="body1">
          Carpooling:{" "}
          <strong style={{ color: carpool === null ? "red" : "inherit" }}>
            {carpool !== null ? (carpool ? "Yes" : "No") : "Needs Response"}
          </strong>
        </Typography>
        <Typography variant="body1">
          Seats Available:{" "}
          <strong style={{ color: seatsAvail === null ? "red" : "inherit" }}>
            {seatsAvail !== null ? seatsAvail : "Needs Response"}
          </strong>
        </Typography>
      </CardActionArea>
      <Button onClick={handleEditClick} variant="contained" fullWidth sx={{ mt: 2 }}>
        Edit
      </Button>
    </Card>
  );
}

export default CurrentEvent;
