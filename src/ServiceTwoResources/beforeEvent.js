import React, { useState } from "react";
import AddListItem from "./addListItem";
import ItemList from "./itemList";
//import axios from "axios";


function BeforeEvent() {
  const [packingList, setPackingList] = useState([]);

  const handleAddItem = (item) => {
    setPackingList([...packingList, item]);

  };

  

  const handleUpdateItem = (index) => {
    // Implement the logic for updating the item at the specified index
  };

  const handleDeleteItem = (index) => {
    const updatedPackingList = [...packingList];
    updatedPackingList.splice(index, 1);
    setPackingList(updatedPackingList);
  };
  return (
    <div>
      <AddListItem onAddItem={handleAddItem} />
      <ItemList
        items={packingList}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
}

export default BeforeEvent;