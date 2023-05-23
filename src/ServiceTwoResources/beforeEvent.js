import React, { useReducer, useState } from "react";


function BeforeEvent(){

const [packingList, setPackingList] = useState([])
const [itemInput, setItemInput] = useState('')
const [show, setShow] = useState(true)
// const hideButton = () => {
//     setShow(false);
//}
const handleInputChange = (event) => {
    setItemInput(event.target.value);
    };

const handleCheckboxChange = (index)=>{
    const newPackingList = packingList.map((item) => ({...item}));
    newPackingList[index].required = !newPackingList[index].required;
    console.log(newPackingList);
    setPackingList(newPackingList);
}
const addItem = () => {
    setPackingList([...packingList, {name:itemInput, required:false}]);
    setShow(true);
    setItemInput(''); // Clears the input field
  };

const updateItem = () => {
    // itemToUpdate([...itemInput, updateItems]);
    // updateItems([...setItemInput, true]);
    // setItemInput(updateItems);
};

const deleteItem = () => {
    const newPackingList = packingList.filter((item) => item.name !== itemInput);
    setPackingList(newPackingList);
    setItemInput('');   

}

return (
    <div>
        <ul>
            {packingList.map((item, index) => (
                <li key={index}>
                    {item.name}
                    <label>
                    <input
                    type="checkbox"
                    checked={item.required}
                    onChange={()=> handleCheckboxChange(index)}/>
                    Required </label>
                    </li>
            ))}
        
            <li>
                <input type="text" value={itemInput} onChange={handleInputChange} />
                { show &&
                    <button onClick={
                    addItem
                }>
                Add Item
                </button>}
                <button onClick={deleteItem}>
                Delete Item
                </button>
            </li>
            <li>
                <input type="text" onChange={handleInputChange} />
                <button onClick={updateItem}>
                Update Item
                </button>
            </li>
        </ul>
     </div>
)

}
export default BeforeEvent;