import React, { useEffect, useState } from "react";
import Activities from "./Activities.json";
import ActivityList from "./ActivityList";
import ActivityDetails from "./ActivityDetails";
import DateSelector from "./DateSelector";

function Itinerary() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     setData(Activities);
//   }, [data]);

const [activity, setActivity] = useState({}); 
const [dateArray, setDateArray] = useState([]); 

return (
    <div className="Itinerary">
        <h2 style={{color: 'red'}}>Date Selector Component</h2>
        <DateSelector dateSelector = {dateArray}/>
        <h2 style={{color: 'red'}}>Activity List Component</h2>
        <ActivityList activityList = {Activities} setActivity = {setActivity} setDateArray = {setDateArray} ></ActivityList> 
        <h2 style={{color: 'red'}}>Activity Details Component</h2>
        <ActivityDetails activity={activity}/> 
    </div>
  );
}
export default Itinerary;