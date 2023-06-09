import { ACTIONS, fetchFunction } from "./FetchFunctions";
import React from "react";

export default function ActivityDetails({states, setStates}) {



    function handleSubmit(event) {
        event.preventDefault();

        const confirmed = window.confirm("Are you sure you want to edit this activity?");
        if (confirmed) {
            let activityJSON = {}; 
            const formData = new FormData(event.currentTarget);
            for (let [key, value] of formData.entries()) {
                activityJSON[key] = value; 
            }
            activityJSON.id = states.displayActivityDetails.id
            if(activityJSON.indoor === undefined && states.displayActivityDetails.indoor !== undefined) activityJSON.indoor = states.displayActivityDetails.indoor
            if(activityJSON.mandatory === undefined && states.displayActivityDetails.mandatory !== undefined) activityJSON.mandatory = states.displayActivityDetails.mandatory
            fetchFunction({type: ACTIONS.UPDATE_ACTIVITY, payload: activityJSON, dispatch: setStates.setItineraryJSON, itinerary: states.itineraryJSON, authState: states.authState})
    
            setStates.setCloseActivityDetailsButton(true);
            setStates.setEditForm(false)
            setStates.setDisplayActivityDetails(activityJSON)
        }
    }

    return (
        <div>
            {states.closeActivityDetailsButton && <button onClick={() => {setStates.setDisplayActivityDetails({}); setStates.setCloseActivityDetailsButton(false)}}>Close Details</button>}

            {states.userIsOwner && states.displayActivityDetails.id && states.closeActivityDetailsButton && <button onClick={() => {
                setStates.setEditForm(true)
                setStates.setCloseActivityDetailsButton(false);
            }}>Edit Activity</button>}
            




            {states.userIsOwner && states.displayActivityDetails.id && states.closeActivityDetailsButton && <button onClick={() => {
                const confirmed = window.confirm("Are you sure you want to delete this activity?");
                if (confirmed) {
                    fetchFunction({ type: ACTIONS.DELETE_ACTIVITY, payload:states.displayActivityDetails, dispatch: setStates.setItineraryJSON, itinerary: states.itineraryJSON, authState: states.authState });
                    setStates.setDisplayActivityDetails({});
                    setStates.setCloseActivityDetailsButton(false);
            }}}>Delete Activity</button>}

            <ul>
            {!states.editForm && Object.entries(states.displayActivityDetails).map(([key, value], index) => value && <li key={index}><h4>{key}</h4><p>{value}</p></li>)}
            </ul>

            {states.editForm && <div>
            <form onSubmit={(event) => handleSubmit(event)}>
                <label>Activity Name
                <input defaultValue={states.displayActivityDetails.activityName} name= "activityName" label="Activity Name" required/>
                </label>
                <br/>

                <label>Description
                <input defaultValue={states.displayActivityDetails.description} name="description" label="Description"/>
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
                <input defaultValue={states.displayActivityDetails.imageURL} name="imageURL" label="Image URL"/>
                </label>
                <br/>
                
                <label>Important Reminder
                <input defaultValue={states.displayActivityDetails.importantReminder} name="importantReminder" label="Important Reminder"/>
                </label>
                <br/>
                
                <label>Group Size
                <input defaultValue={states.displayActivityDetails.groupSize} name="groupSize" type="number" label="Group Size"/>
                </label>
                <br/>
                
                <label>mandatory
                <input name="mandatory" value="true" type="checkbox" label="mandatory"/>
                </label>
                <br/>
                
                <label>price
                <input defaultValue={states.displayActivityDetails.price} name="price" type="number" label="price"/>
                </label>
                <br/>
                
                <label>Type
                <select name="type" label="Activity Name">
                    <option defaultValue={states.displayActivityDetails.type}></option>
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
                <input defaultValue={states.displayActivityDetails.url} name="url" label="Event URL"/>
                </label>
                <br/>
                
                <label>Address
                <input defaultValue={states.displayActivityDetails.address} name="address" label="Address"/>
                </label>
                <br/>
                
                <label>City
                <input defaultValue={states.displayActivityDetails.city} name="city" label="City"/>
                </label>
                <br/>
                
                <label>State
                <select name="state" label="State">
                    <option defaultValue={states.displayActivityDetails.state}></option>
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
                <input defaultValue={states.displayActivityDetails.zip} name="zip" type="number" label="Zip Code"/>
                </label>
                <br/>
                
                <label>Start Time
                <input defaultValue={states.displayActivityDetails.startTime.slice(0, 16)} name="startTime" type="datetime-local" label="Start Time" required/>
                </label>
                <br/>
                
                <label>End Time
                <input defaultValue={states.displayActivityDetails.endTime.slice(0, 16)} name="endTime" type="datetime-local" label="End Time"/>
                </label>
                <br/>

                <input value="Save Changes" type="submit" ></input>
            </form>
            <button onClick={() => {
                setStates.setCloseActivityDetailsButton(true);
                setStates.setEditForm(false)
            }}>Cancel</button>
        </div>}
        </div>
    )
}