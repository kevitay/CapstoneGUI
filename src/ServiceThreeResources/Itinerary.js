import React, { useEffect, useState } from "react";
import Activities from "./Activities.json";

function Itinerary() {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(Activities);
  }, []);
  return (
    <div>
      {data.activities?.map((item) => (
        <p key={item.ID}>{item.ActivityName}</p>
      ))}
    </div>
  );
}
export default Itinerary;