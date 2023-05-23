import React from "react";


export default function ActivityForm() {
    return (
        <div>
            <form>
                <label>Activity Name
                <input label="Activity Name" required/>
                </label>
                <br/>

                <label>Description
                <input label="Description"/>
                </label>
                <br/>

                <label>Outdoor
                <input name="door" type="radio" label="Outdoor"/>
                </label>
                <label>Indoor
                <input name="door" type="radio" label="Indoor"/>
                </label>
                <br/>
                
                <label>Image URL
                <input label="Image URL"/>
                </label>
                <br/>
                
                <label>Important Reminder
                <input label="Important Reminder"/>
                </label>
                <br/>
                
                <label>Group Size
                <input type="number" label="Group Size"/>
                </label>
                <br/>
                
                <label>Mandatory
                <input type="checkbox" label="Mandatory"/>
                </label>
                <br/>
                
                <label>Price
                <input type="number" label="Price"/>
                </label>
                <br/>
                
                <label>Type
                <select label="Activity Name">
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
                <input label="Event URL"/>
                </label>
                <br/>
                
                <label>Address
                <input label="Address"/>
                </label>
                <br/>
                
                <label>City
                <input label="City"/>
                </label>
                <br/>
                
                <label>State
                <select label="State">
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
                <input type="number" label="Zip Code"/>
                </label>
                <br/>
                
                <label>Start Time
                <input type="datetime-local" label="Start Time" required/>
                </label>
                <br/>
                
                <label>End Time
                <input type="datetime-local" label="End Time"/>
                </label>
                <br/>

                <input type="submit"></input>
            </form>
        </div>
    )
}