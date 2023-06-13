import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormGroup, FormControl, FormLabel, FormControlLabel, Stack, RadioGroup, Radio, Checkbox, Select, MenuItem } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import{ACTIONS, fetchFunction} from "./FetchFunctions";

export default function ActivityForm({setForm, states, setStates, eventId}) {
    
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    function handleSubmit(event) {
        event.preventDefault();
        setForm(false); 
        
        let activityJSON = {}; 
        const formData = new FormData(event.currentTarget);
        for (let [key, value] of formData.entries()) {
            activityJSON[key] = value; 
        }
        activityJSON.eventId = eventId;
        activityJSON.startTime=startTime;
        activityJSON.endTime=endTime;
        fetchFunction({dispatch: setStates.setItineraryJSON, type: ACTIONS.CREATE_ACTIVITY, payload: activityJSON, itinerary: states.itineraryJSON, authState: states.authState})
    }

    return (
        <Box>
            <form onSubmit={(event) => handleSubmit(event)}>
                <FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={2} sx={{marginBottom: 2}}>
          
                <TextField label='Activity Name'name="activityName" id="outlined-size-small" defaultValue="" size="small" required/>          
                <TextField label='Description' multiline name="description" id="outlined-size-small" size="small"/>
                </Stack>

                <Stack spacing={2}>
                <FormLabel id="indoor-outdoor-radio-group" sx={{display: 'inline'}}>Indoor/Outdoor</FormLabel>
                </Stack>

                <Stack spacing={2} sx={{marginBottom: 2}}>
                <RadioGroup row name="indoor-outdoor-radio-group">
                <FormControlLabel label='Outdoor' id="outdoor" name="indoor" value="false" control={<Radio />}/>
                <FormControlLabel label='Indoor' id="indoor" name="indoor" value="true" control={<Radio />}/>
                </RadioGroup>
                </Stack>
                
                <Stack spacing={2} sx={{marginBottom: 2}}>
                <TextField label='Image URL' name="imageURL" id="outlined-size-small" defaultValue="" size="small"/>    
                <TextField label='Important Reminder' name="importantReminder" id="outlined-size-small" defaultValue="" size="small"/>
                <TextField label='Group Size' name="groupSize" type="number" id="outlined-size-small" defaultValue="" size="small"/>
                </Stack>

                <Stack spacing={2} sx={{marginBottom: 0}}>
                <FormLabel id="mandatory-checkbox">Is Activity Mandatory?</FormLabel>
                </Stack>
              
                <FormGroup>
                <Stack spacing={0} sx={{marginBottom: 2}}>
                <Checkbox label='Mandatory' name="mandatory" value="true" size="small" style={{ width: "20px", padding:2 }}/>
                </Stack>
                </FormGroup>

                <Stack spacing={2} sx={{marginBottom: 4}}>
                <TextField label='Price' name="price" type="number" id="outlined-size-small" defaultValue="" size="small"/>
                
                <FormGroup>
                <FormLabel id="type-select">Activity Type</FormLabel>
                <Select name="type" variant="outlined" style={{ height: '2.5em' }} defaultValue="">
                    <MenuItem value=""></MenuItem>
                    <MenuItem value="Music">Music</MenuItem>
                    <MenuItem value="Sports">Sports</MenuItem>
                    <MenuItem value="Professional">Professional</MenuItem>
                    <MenuItem value="Meals">Meals</MenuItem>
                    <MenuItem value="Education">Education</MenuItem>
                    <MenuItem value="Festivals">Festivals</MenuItem>
                    <MenuItem value="Family">Family</MenuItem>
                    <MenuItem value="Entertainment">Entertainment</MenuItem>
                </Select>
                </FormGroup>
                
                <TextField label='Activity URL' name="url" id="outlined-size-small" defaultValue="" size="small"/>
                
                <TextField label='Address' name="address" id="outlined-size-small" defaultValue="" size="small"/>

                <TextField label='City' name="city" id="outlined-size-small" defaultValue="" size="small"/>
          
                <FormGroup>
                <FormLabel id="state-select">State</FormLabel>
                <Select name="state" style={{ height: '2.5em' }} defaultValue="">
                    <MenuItem value=""></MenuItem>
                    <MenuItem value="AL">Alabama</MenuItem>
                    <MenuItem value="AK">Alaska</MenuItem>
                    <MenuItem value="AZ">Arizona</MenuItem>
                    <MenuItem value="AR">Arkansas</MenuItem>
                    <MenuItem value="CA">California</MenuItem>
                    <MenuItem value="CO">Colorado</MenuItem>
                    <MenuItem value="CT">Connecticut</MenuItem>
                    <MenuItem value="DE">Delaware</MenuItem>
                    <MenuItem value="DC">District Of Columbia</MenuItem>
                    <MenuItem value="FL">Florida</MenuItem>
                    <MenuItem value="GA">Georgia</MenuItem>
                    <MenuItem value="HI">Hawaii</MenuItem>
                    <MenuItem value="ID">Idaho</MenuItem>
                    <MenuItem value="IL">Illinois</MenuItem>
                    <MenuItem value="IN">Indiana</MenuItem>
                    <MenuItem value="IA">Iowa</MenuItem>
                    <MenuItem value="KS">Kansas</MenuItem>
                    <MenuItem value="KY">Kentucky</MenuItem>
                    <MenuItem value="LA">Louisiana</MenuItem>
                    <MenuItem value="ME">Maine</MenuItem>
                    <MenuItem value="MD">Maryland</MenuItem>
                    <MenuItem value="MA">Massachusetts</MenuItem>
                    <MenuItem value="MI">Michigan</MenuItem>
                    <MenuItem value="MN">Minnesota</MenuItem>
                    <MenuItem value="MS">Mississippi</MenuItem>
                    <MenuItem value="MO">Missouri</MenuItem>
                    <MenuItem value="MT">Montana</MenuItem>
                    <MenuItem value="NE">Nebraska</MenuItem>
                    <MenuItem value="NV">Nevada</MenuItem>
                    <MenuItem value="NH">New Hampshire</MenuItem>
                    <MenuItem value="NJ">New Jersey</MenuItem>
                    <MenuItem value="NM">New Mexico</MenuItem>
                    <MenuItem value="NY">New York</MenuItem>
                    <MenuItem value="NC">North Carolina</MenuItem>
                    <MenuItem value="ND">North Dakota</MenuItem>
                    <MenuItem value="OH">Ohio</MenuItem>
                    <MenuItem value="OK">Oklahoma</MenuItem>
                    <MenuItem value="OR">Oregon</MenuItem>
                    <MenuItem value="PA">Pennsylvania</MenuItem>
                    <MenuItem value="RI">Rhode Island</MenuItem>
                    <MenuItem value="SC">South Carolina</MenuItem>
                    <MenuItem value="SD">South Dakota</MenuItem>
                    <MenuItem value="TN">Tennessee</MenuItem>
                    <MenuItem value="TX">Texas</MenuItem>
                    <MenuItem value="UT">Utah</MenuItem>
                    <MenuItem value="VT">Vermont</MenuItem>
                    <MenuItem value="VA">Virginia</MenuItem>
                    <MenuItem value="WA">Washington</MenuItem>
                    <MenuItem value="WV">West Virginia</MenuItem>
                    <MenuItem value="WI">Wisconsin</MenuItem>
                    <MenuItem value="WY">Wyoming</MenuItem>
                </Select>
                </FormGroup>
                
                <TextField label='Zip Code' name="zip" type="number" id="outlined-size-small" defaultValue="" size="small"/>
                
                <DateTimePicker label='Start Time*' style={{ height: '2.5em' }} onChange={date => setStartTime(date)} id="outlined-size-small" size="small" required />
                
                <DateTimePicker label='End Time*' style={{ height: '2.5em' }} onChange={date => setEndTime(date)} id="outlined-size-small" size="small" required/>

                <Button value="Save Activity" type="submit" variant="contained">Save Activity</Button>
                
                </Stack>
                </LocalizationProvider>
                </FormControl>
            </form>
        </Box>
    )
}