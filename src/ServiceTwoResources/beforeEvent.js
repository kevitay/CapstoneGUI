import React, { useState } from "react";
import AddListItem from "./addListItem";
import ItemList from "./itemList";


function BeforeEvent({ eventId }) {
  const [packingList, setPackingList] = useState([]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Required</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <AddListItem
            eventId={eventId}
            setPackingList={setPackingList}
            packingList={packingList}
          />
          <ItemList
            items={packingList}
            setPackingList={setPackingList}
            eventId={eventId}
          />
        </tbody>
      </table>
    </div>
  );
}

export default BeforeEvent;