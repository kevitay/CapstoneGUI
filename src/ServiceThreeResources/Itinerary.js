import React, { useEffect, useState } from "react";
import Activities from "./Activities.json";

function Itinerary() {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(Activities);
  }, []);
  return (
    <div className="Itinerary">
        <h2>Event 1 Itinerary</h2>
        <ul className="ActivityList">
            {
                data.activities?.map((item) => (
                <li className="Activity" key={item.ID}>
                    <p>{item.ActivityName}</p>
                </li>
                ))
            }
        </ul>
      
    </div>
  );
}
export default Itinerary;