import React, { useEffect, useState } from "react";
import Activities from "./Activities.json";
import ActivityList from "./ActivityList";
import ActivityDetails from "./ActivityDetails";

function Itinerary() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     setData(Activities);
//   }, [data]);

const [activity, setActivity] = useState({}); 

const data = Activities; 

  return (
    <div className="Itinerary">
        <h2 style={{color: 'red'}}>Activity List Component</h2>
        <ActivityList activityList = {data} setActivity = {setActivity}></ActivityList> 
        <h2 style={{color: 'red'}}>Activity Details Component</h2>
        <ActivityDetails activity={activity}/> 
    </div>
  );
}
export default Itinerary;