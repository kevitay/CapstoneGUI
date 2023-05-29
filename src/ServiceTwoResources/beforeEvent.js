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

  const handleDeleteItem = (item, itemIndex) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id": item.id,
      "type": "packing list",
      "description": "swimsuit",
      "required": false,
      "quantity": 1
    });

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/checklist/" + item.id, requestOptions)
      .then(response => {
        if(response.status === 202){
          console.log("delete worked")
        }
      }
        
    //     response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
    // const updatedPackingList = [...packingList];
    // updatedPackingList.splice(itemId, 1);
    // setPackingList(updatedPackingList);
  )};
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Required</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <AddListItem onAddItem={handleAddItem} />
          <ItemList
            items={packingList}
            setPackingList={setPackingList}
            onDeleteItem={handleDeleteItem}
          />
        </tbody>
      </table>
    </div>
  );
}

export default BeforeEvent;