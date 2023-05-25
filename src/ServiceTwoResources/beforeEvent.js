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
  "description": "swimsuit",
  "required": false,
  "quantity": 1
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/checklist", requestOptions)
  .then(response => response.text())  
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
    setPackingList([...packingList, item]);
};

// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify({
//   "eventId": "381f2e4c-ba8c-4204-a4fc-c1874fcbc375",
//   "type": "packing list",
//   "description": "swimsuit",
//   "required": false,
//   "quantity": 1
// });

// var requestOptions = {
//   method: 'PUT',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// fetch("http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/checklist", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

//   const handleUpdateItem = (index) => {
//     // Implement the logic for updating the item at the specified index
//   };

//   const handleDeleteItem = (index) => {

//     var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify({
//   "eventId": "381f2e4c-ba8c-4204-a4fc-c1874fcbc375",
//   "type": "packing list",
//   "description": "swimsuit",
//   "required": false,
//   "quantity": 1
// });

// var requestOptions = {
//   method: 'DELETE',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// fetch("http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/checklist", requestOptions)
//   .then(response => response.text())  
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
//     const updatedPackingList = [...packingList];
//     updatedPackingList.splice(index, 1);
//     setPackingList(updatedPackingList);
//   };
  return (
    <div>
      <AddListItem onAddItem={handleAddItem} />
      <ItemList
        items={packingList}
        //onUpdateItem={handleUpdateItem}
        //onDeleteItem={handleDeleteItem}
      />
    </div>
  );
}

export default BeforeEvent;