import { ACTIONS, fetchFunction } from "./FetchFunctions";
import Button from "@mui/material/Button";
import React from "react";

export default function DateSelector({formatDate, states, setStates, activity}) {

    function handleSubmit(event) {
        event.preventDefault();
        console.log(activity)

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
    <div>
            {states.editForm && <div>
            <form onSubmit={(event) => handleSubmit(event)}>
                <label>Activity Name
                <input defaultValue={activity.activityName} name= "activityName" label="Activity Name" required/>
                </label>
                <br/>

                <label>Description
                <input defaultValue={activity.description} name="description" label="Description"/>
                </label>
                <br/>

                <label>Outdoor
                <input name="indoor" value="false" type="radio" label="Outdoor"/>
                </label>
                <label>Indoor
                <input name="indoor" value="true" type="radio" label="Indoor"/>
                </label>
                <br/>
                
                <label>Image URL
                <input defaultValue={activity.imageURL} name="imageURL" label="Image URL"/>
                </label>
                <br/>
                
                <label>Important Reminder
                <input defaultValue={activity.importantReminder} name="importantReminder" label="Important Reminder"/>
                </label>
                <br/>
                
                <label>Group Size
                <input defaultValue={activity.groupSize} name="groupSize" type="number" label="Group Size"/>
                </label>
                <br/>
                
                <label>mandatory
                <input name="mandatory" value="true" type="checkbox" label="mandatory"/>
                </label>
                <br/>
                
                <label>price
                <input defaultValue={activity.price} name="price" type="number" label="price"/>
                </label>
                <br/>
                
                <label>Type
                <select name="type" label="Activity Name">
                    <option defaultValue={activity.type}></option>
                    <option value="Music">Music</option>
                    <option value="Sports">Sports</option>
                    <option value="Professional">Professional</option>
                    <option value="Meals">Meals</option>
                    <option value="Education">Education</option>
                    <option value="Festivals">Festivals</option>
                    <option value="Family">Family</option>
                    <option value="Entertainment">Entertainment</option>
                </select>
                </label>
                <br/>
                
                <label>Event URL
                <input defaultValue={activity.url} name="url" label="Event URL"/>
                </label>
                <br/>
                
                <label>Address
                <input defaultValue={activity.address} name="address" label="Address"/>
                </label>
                <br/>
                
                <label>City
                <input defaultValue={activity.city} name="city" label="City"/>
                </label>
                <br/>
                
                <label>State
                <select name="state" label="State">
                    <option defaultValue={activity.state}></option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                </select>
                </label>
                <br/>
                
                <label>Zip Code
                <input defaultValue={activity.zip} name="zip" type="number" label="Zip Code"/>
                </label>
                <br/>
                
                <label>Start Time
                <input defaultValue={activity.startTime} name="startTime" type="datetime-local" label="Start Time" required/>
                </label>
                <br/>
                
                <label>End Time
                <input defaultValue={activity.endTime} name="endTime" type="datetime-local" label="End Time"/>
                </label>
                <br/>

                <input value="Save Changes" type="submit" ></input>
            </form>
            <Button onClick={() => {
                setStates.setEditForm(false)
            }}>Cancel</Button>
        </div>}
    </div>
    )
}