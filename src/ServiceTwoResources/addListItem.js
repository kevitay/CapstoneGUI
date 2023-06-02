import React, {useState} from "react";

function AddListItem({ eventId, setPackingList, packingList }) {
    const [itemInput, setItemInput] = useState('');
    const [required, setRequired] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [typeInput, setTypeInput] = useState("packing list");

    const checklistUrl = "http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/checklist";

    const handleTypeChange = (event) => {
        setTypeInput(event.target.value);
    }

    const handleInputChange = (event) => {
        setItemInput(event.target.value);
        };

    const handleCheckboxChange=(event) => {
        setRequired(!required);
    };

    const handleQuantityChange=(event) => {
       let value = parseInt(event.target.value);
        if(typeof value === 'number') {
           setQuantity(value);}
   }

    const addItem = () => {
     if(itemInput !== "") {
        let newItem = {item: itemInput, type: typeInput, required: required, quantity: quantity};
        handleAddItem(newItem);
        setRequired(false);
        setItemInput(''); 
        setQuantity(1);
        setTypeInput("packing list");
        };
    };

    const handleAddItem = (item) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
          "eventId": eventId,
          "type": item.type,
          "description": item.item,
          "required": item.required,
          "quantity": item.quantity
        });
    
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
    
        fetch(checklistUrl, requestOptions)
          .then(response => response.json())
          .then(result => setPackingList([...packingList, result]))
          .catch(error => console.log('error', error));
      };

    return (
        <tr>
            <td><input type="text" value={itemInput} onChange={handleInputChange} /></td>
            <td><select name="type" defaultValue="packing list" onChange={handleTypeChange}> <option value="packing list"> Packing List </option>
            <option value="signup list"> Signup List </option> </select></td>
            <td><input type="number" min="1" value={quantity} onChange={handleQuantityChange} /></td> 
            <td><input type="checkbox" checked={required} onChange={handleCheckboxChange} /></td>
            <td><button onClick={addItem}> Add Item </button></td>
        </tr>) 
    
}

export default AddListItem