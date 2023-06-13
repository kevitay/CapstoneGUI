import { TableRow, TableCell, Button, Checkbox, TextField, MenuItem, Select } from "@mui/material";
import React, { useEffect } from "react";

function ItemList({ items, setPackingList, eventId }) {
  const checklistUrl = "http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/checklist";

  const handleUpdateItem = (item, itemIndex) => {
    // Implement the logic for updating the item at the specified index
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id": item.id,
      "type": item.type,
      "description": item.description,
      "required": item.required,
      "quantity": item.quantity
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      id: 23,
    };

    fetch(checklistUrl + "/" + item.id, requestOptions)
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

  const handleDeleteItem = (item, index) => {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };

    fetch(checklistUrl + "/" + item.id, requestOptions)
      .then(response => {
        if (response.status === 202) {
          alert("Item Deleted");
          const updatedPackingList = [...items];
          // updatedPackingList.splice(item, 1);
          updatedPackingList.splice(index, 1);
          setPackingList(updatedPackingList);
        } else {
          let alertText = "Item Not Deleted";
          if (item.type === "signup list") {
            alertText += "\nThis is a Signup List that may have people signed up.";
          }
          alert(alertText);
        }
      })
      .catch(error => console.log('error', error));
  };

  const getPackingListByEventId = () => {

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(checklistUrl + "/" + eventId, requestOptions)
      .then(response => {
        if(response.status !== 204){
          return response.json();
        }})
      .then(result => {
        if(result) {
          setPackingList((result.checklist.length > 1) ? result.checklist.sort((a, b) => parseInt(a.id) - parseInt(b.id)) : result.checklist);
        } else {
          setPackingList([]);
        }
      })
      .catch(error => console.log('error', error));
  };

  useEffect(getPackingListByEventId, [eventId, setPackingList]);


  const onChangeInput = (e, index) => {
    let { name, value } = e.target
    // console.log(name, value);
    let editList = items.map(item => ({ ...item }))
    if (name === "required") value = e.target.checked;
    editList[index][name] = value;
    // console.log("editList: ", editList);
    setPackingList(editList);
  }


  return (
    <>
      {items.map((item, index) => (
        <TableRow key={item.id} variant="contained">
          <TableCell>
            <TextField
              type="text"
              name="description"
              size="small"
              value={item.description}
              sx={{ width: 350 }}
              onChange={(e) => onChangeInput(e, index)}>
            </TextField>
          </TableCell>
          <TableCell>
            <Select name="type" size="small" value={item.type} onChange={(e) => onChangeInput(e, index)}>
              <MenuItem size="small" value="packing list">Packing List</MenuItem>
              <MenuItem size="small" value="signup list">Signup List</MenuItem>
            </Select>
          </TableCell>
          <TableCell align="center">
            <TextField
              type="number"
              name="quantity"
              size="small"
              min="1"
              inputProps={{ style: { textAlign: 'center' } }}
              value={item.quantity} onChange={(e) => onChangeInput(e, index)}>
            </TextField>
          </TableCell>
          <TableCell align="center"><Checkbox name="required" checked={item.required} onChange={(e) => onChangeInput(e, index)}></Checkbox></TableCell>
          <TableCell align="center">
            <Button variant="contained" onClick={() => handleUpdateItem(item, index)}>Update Item</Button>
            &nbsp; &nbsp;
            <Button variant="contained" onClick={() => handleDeleteItem(item, index)}>Delete Item</Button>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
};
export default ItemList;