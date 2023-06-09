import React, { useState } from "react";
import { TableCell, TableRow, Button, TextField, CheckBox } from '@mui/material';

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

    const handleCheckboxChange = (event) => {
        setRequired(!required);
    };

    const handleQuantityChange = (event) => {
        let value = parseInt(event.target.value);
        if (typeof value === 'number') {
            setQuantity(value);
        }
    }

    const addItem = () => {
        if (itemInput !== "") {
            let newItem = { item: itemInput, type: typeInput, required: required, quantity: quantity };
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
        <TableRow>
            <TableCell>
                <TextField
                    type="text"
                    value={itemInput}
                    sx={{ width: 350, fontWeight: 'bold' }}
                    onChange={handleInputChange}
                />
            </TableCell>
            <TableCell>
                <TextField
                    select
                    name="type"
                    defaultValue="packing list"
                    onChange={handleTypeChange}
                >
                    <option value="packing list"> Packing List </option>
                    <option value="signup list"> Signup List </option>
                </TextField>
            </TableCell>
            <TableCell align="center">
                <TextField
                    type="number"
                    min="1"
                    inputProps={{ style: { textAlign: 'center' } }}
                    value={quantity}
                    onChange={handleQuantityChange}
                />
            </TableCell>
            <TableCell align="center"><CheckBox checked={required} onChange={handleCheckboxChange} /></TableCell>
            <TableCell align="center"><Button variant="contained" onClick={addItem}> Add Item </Button></TableCell>
        </TableRow>)

}

export default AddListItem