import React, { useState } from "react";
import AddListItem from "./addListItem";
import ItemList from "./itemList";
//import axios from "axios";


function BeforeEvent() {
  const [packingList, setPackingList] = useState([]);

  const handleAddItem = (item) => {
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "eventId": '3',
  "type": "packing list",
  "description": item.item,
  "required": item.required,
  "quantity": item.count
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/checklist", requestOptions)
  .then(response => response.json())
  .then(result => setPackingList([...packingList, result]))
  .catch(error => console.log('error', error));
};

  const handleUpdateItem = (item, itemIndex) => {
    // Implement the logic for updating the item at the specified index
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "id": item.id,
  "type": "packing list",
  "description": item.description,
  "required": item.required,
  "quantity": item.count
});

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
  id: 23,
};

fetch("http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/checklist/" + item.id, requestOptions)
  .then(response => response.json())
  .then(result => {
    //make copy of existing package
    let newList = [...packingList];
    //find item by id
    //let itemIndex = newList.findIndex( listItem => listItem.id === item.id);
    //update or replace the item
    newList[itemIndex] = result; 
    //set new packing list
    setPackingList(newList);
  })
  .catch(error => console.log('error', error));
  };

  const handleDeleteItem = (item, itemIndex) => {

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "id": item.id,
    "type": "packing list",
    "description": item.description,
    "required": item.required,
    "quantity": item.count
  });

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/checklist/" + item.id, requestOptions)
  .then(response => response.text())  
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
    const updatedPackingList = [...packingList];
    updatedPackingList.splice(itemIndex, 1);
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