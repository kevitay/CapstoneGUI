import { ACTIONS, fetchFunction } from "./FetchFunctions";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormGroup, FormControl, FormLabel, FormControlLabel, Stack, RadioGroup, Radio, Checkbox, Select, MenuItem } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function DateSelector({states, setStates, activity}) {

    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    function handleSubmit(event) {
        event.preventDefault();

        const confirmed = window.confirm("Are you sure you want to edit this activity?");
        if (confirmed) {
            let activityJSON = {}; 
            const formData = new FormData(event.currentTarget);
            for (let [key, value] of formData.entries()) {
                activityJSON[key] = value; 
            }
            activityJSON.id = activity.id
            if(activityJSON.indoor === undefined && activity.indoor !== undefined) activityJSON.indoor = activity.indoor
            if(activityJSON.mandatory === undefined && activity.mandatory !== undefined) activityJSON.mandatory = activity.mandatory
            fetchFunction({type: ACTIONS.UPDATE_ACTIVITY, payload: activityJSON, dispatch: setStates.setItineraryJSON, itinerary: states.itineraryJSON, authState: states.authState})
    
            setStates.setEditForm(false)
        }
    }
    
    return (
        <Box>
        <form onSubmit={(event) => handleSubmit(event)}>
            <FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2} sx={{marginBottom: 2, marginLeft: 4.75}}>
      
            <TextField label='Activity Name'name="activityName" id="outlined-size-small" defaultValue={activity.activityName} placeholder={activity.name} size="small" required/>          
            <TextField label='Description' name="description" id="outlined-size-small" defaultValue={activity.description} size="small"/>
            </Stack>

            <Stack spacing={2} sx={{marginBottom: 2, marginLeft: 4.75}}>
            <RadioGroup row name="indoor-outdoor-radio-group">
            <FormControlLabel label='Outdoor' id="outdoor" name="indoor" value="false" control={<Radio />}/>
            <FormControlLabel label='Indoor' id="indoor" name="indoor" value="true" control={<Radio />}/>
            </RadioGroup>
            </Stack>
            
            <Stack spacing={2} sx={{marginBottom: 2, marginLeft: 4.75}}>
            <TextField label='Image URL' name="imageURL" id="outlined-size-small" defaultValue={activity.imageURL} size="small"/>    
            <TextField label='Important Reminder' name="importantReminder" id="outlined-size-small" defaultValue={activity.importantReminder} size="small"/>
            <TextField label='Group Size' name="groupSize" type="number" id="outlined-size-small" defaultValue={activity.groupSize} size="small"/>
            </Stack>

            <Stack spacing={2} sx={{marginBottom: 0, marginLeft: 4.75}}>
            <FormLabel id="mandatory-checkbox">Is Activity Mandatory?</FormLabel>
            </Stack>
          
            <FormGroup>
            <Stack spacing={0} sx={{marginBottom: 2, marginLeft: 4.75}}>
            <Checkbox label='Mandatory' name="mandatory" value="true" size="small" style={{ width: "20px", padding:2 }}/>
            </Stack>
            </FormGroup>

            <Stack spacing={2} sx={{marginBottom: 4, marginLeft: 4.75}}>
            <TextField label='Price' name="price" type="number" id="outlined-size-small" defaultValue={activity.price} size="small"/>
            
            <FormGroup>
            <FormLabel id="type-select">Activity Type</FormLabel>
            <Select name="type" variant="outlined"  defaultValue={activity.type} style={{ height: '2.5em' }}>
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
            
            <TextField label='Activity URL' name="url" id="outlined-size-small" defaultValue={activity.activityURL} size="small"/>
            
            <TextField label='Address' name="address" id="outlined-size-small" defaultValue={activity.address} size="small"/>

            <TextField label='City' name="city" id="outlined-size-small" defaultValue={activity.city} size="small"/>
      
            <FormGroup>
            <FormLabel id="state-select">State</FormLabel>
            <Select name="state" style={{ height: '2.5em' }}defaultValue={activity.state}>
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
            
            <TextField label='Zip Code' name="zip" type="number" id="outlined-size-small" defaultValue={activity.zip} size="small"/>
            
            <DateTimePicker label='Start Time*' style={{ height: '2.5em' }} onChange={date => setStartTime(date)} id="outlined-size-small" size="small" required />
            
            <DateTimePicker label='End Time*' style={{ height: '2.5em' }} onChange={date => setEndTime(date)} id="outlined-size-small" size="small" required/>

            <Button value="Save Activity" type="submit" variant="contained">Save Activity</Button>
            <Button value="Cancel" variant="outlined" onClick={()=> setStates.setEditForm(false)}>Cancel</Button>
            </Stack>
            </LocalizationProvider>
            </FormControl>
        </form>
    </Box>
    )
}