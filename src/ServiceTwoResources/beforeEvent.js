import React, { useState } from "react";


function BeforeEvent(){
const [packingList, setPackingList] = useState([])
const [itemInput, setItemInput] = useState('')
const [requiredItems, setRequiredItems] = useState([]);

const handleInputChange = (event) => {
    setItemInput(event.target.value);
};
const handleCheckboxChange = (index)=>{
    const updatedRequiredItems = [...requiredItems];
    updatedRequiredItems[index] = !updatedRequiredItems[index];
    setRequiredItems(updatedRequiredItems);
}
const addItem = () => {
    setPackingList([...packingList, itemInput]);
    setRequiredItems([...requiredItems, false]);
    setItemInput(''); // Clears the input field
  };

return (
    <div>
        <ul>
            {packingList.map((item, index) => (
                <li key={index}>
                    {item}
                    <label>
                    <input
                    type="checkbox"
                    checked={requiredItems[index]}
                    onChange={()=> handleCheckboxChange(index)}/>
                    Required </label>
                    </li>
            ))}
        </ul>
        <input type="text" value={itemInput} onChange={handleInputChange} />
        <button onClick={addItem}>
            Add Item
        </button>
    </div>
)

}
export default BeforeEvent;