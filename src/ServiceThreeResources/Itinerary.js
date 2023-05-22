import React, { useEffect, useState } from "react";
import Activities from "./Activities.json";
import ActivityList from "./ActivityList";

function Itinerary() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     setData(Activities);
//   }, [data]);
const data = Activities; 

  return (
    <div className="Itinerary">
        <ActivityList activityList = {data}></ActivityList> 
    </div>
  );
}
export default Itinerary;