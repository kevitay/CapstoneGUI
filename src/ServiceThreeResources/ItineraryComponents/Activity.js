import React from "react";

export default function Activity() {
    const activityJson = {
        "activity": {
            "ActivityName": "Example Activity",
            "ID": 123,
            "Description": "This is the activity description",
            "Indoor": true,
            "ImageURL": "www.example.com/image",
            "ImportantReminder": "Don't forget to bring cash!",
            "GroupSize": 3,
            "Mandatory": false, 
            "Price": 120, 
            "Type": "Music",
            "URL": "www.example.com",
            "Address": "123 Example St",
            "City": "Normal",
            "State": "IL",
            "ZipCode": 61761,
            "StartTime": "2023-05-16T14:00:00-03:00",
            "EndTime": "2023-05-16T16:00:00-03:00" 
                    }
        }

    return (
        <div>
            <h1>ACTIVITY COMPONENT</h1>
            <h2>{activityJson.activity.ActivityName}</h2>
            <p>{activityJson.activity.Description}</p>
        </div>
    )
}; 