import React from "react";

import{ACTIONS} from "./Itinerary";

export default function ActivityForm({setForm, dispatch}) {
    let activityJSON = {}; 

    function handleSubmit(event) {
        event.preventDefault();
        setForm(false); 
        
        const formData = new FormData(event.currentTarget);
        for (let [key, value] of formData.entries()) {
            activityJSON[key] = value; 
        }
        dispatch({type: ACTIONS.CREATE_ACTIVITY, payload: activityJSON})
    }

    return (
        <div>
            <form onSubmit={(event) => handleSubmit(event)}>
                <label>Activity Name
                <input name= "activityName" label="Activity Name" required/>
                </label>
                <br/>

                <label>Description
                <input name="description" label="Description"/>
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
                <input name="imageURL" label="Image URL"/>
                </label>
                <br/>
                
                <label>Important Reminder
                <input name="importantReminder" label="Important Reminder"/>
                </label>
                <br/>
                
                <label>Group Size
                <input name="groupSize" type="number" label="Group Size"/>
                </label>
                <br/>
                
                <label>mandatory
                <input name="mandatory" value="true" type="checkbox" label="mandatory"/>
                </label>
                <br/>
                
                <label>price
                <input name="price" type="number" label="price"/>
                </label>
                <br/>
                
                <label>Type
                <select name="type" label="Activity Name">
                    <option value=""></option>
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
                <input name="url" label="Event URL"/>
                </label>
                <br/>
                
                <label>Address
                <input name="address" label="Address"/>
                </label>
                <br/>
                
                <label>City
                <input name="city" label="City"/>
                </label>
                <br/>
                
                <label>State
                <select name="state" label="State">
                    <option value=""></option>
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
                <input name="zip" type="number" label="Zip Code"/>
                </label>
                <br/>
                
                <label>Start Time
                <input name="startTime" type="datetime-local" label="Start Time" required/>
                </label>
                <br/>
                
                <label>End Time
                <input name="endTime" type="datetime-local" label="End Time"/>
                </label>
                <br/>

                <input value="Save Activity" type="submit"></input>
            </form>
        </div>
    )
}