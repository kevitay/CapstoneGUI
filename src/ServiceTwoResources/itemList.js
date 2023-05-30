import React from "react";

function ItemList({ items, setPackingList }) {
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
        let newList = [...items];
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

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/checklist/" + item.id, requestOptions)
      .then(response => {
        if (response.status === 202) {
          alert("Item Deleted");
          const updatedPackingList = [...items];
          updatedPackingList.splice(item, 1);
          setPackingList(updatedPackingList);
        }
      }
      )
      .catch(error => console.log('error', error));
  };

  
  const onChangeInput = (e, index) => {
    const { name, value } = e.target
    console.log(name, value);
    // editList = items.map((item) =>
    //   item.itemId === itemId && name ? { ...item, [name]: value } : item
    // )
    let editList = items.map(item  => ({...item}))
    editList[index][name]=value;
    console.log(editList);
    setPackingList(editList);
  }
console.log("item array", items);


  return (
    <>
      {items.map((item, index) => (
        <tr key={item.id}>
          <td><input type="text"  name="description" value={item.description} onChange={(e) => onChangeInput(e, index)}></input></td>
          <td><input type="number" name="quantity" value={item.quantity} onChange={(e) => onChangeInput(e, index)}></input></td>
          <td><input type="checkbox" checked={item.required} name="required" onChange={(e) => onChangeInput(e, index)}></input></td>
          <td>
            <button onClick={() => handleUpdateItem()}>Update Item</button>
            <button onClick={() => handleDeleteItem(item)}>Delete Item</button>
          </td>
        </tr>
      ))}
    </>
  )
};
export default ItemList;