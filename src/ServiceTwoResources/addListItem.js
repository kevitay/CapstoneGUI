import React, {useState} from "react";



function AddListItem({onAddItem}) {
    const [itemInput, setItemInput] = useState('');
    const [required, setRequired] = useState(false);
    const [count, setCount] = useState([]);
    

    const handleInputChange = (event) => {
        setItemInput(event.target.value);
        };

    const handleCheckboxChange=(event) => {
        setRequired(!required);
    };

    const handleCountChange=(event) => {
       let value = event.target.value
        if(typeof value === number) {
           setCount(value);
        }
    }

    const addItem = () => {
     if(itemInput !== "") {
        let newItem = {item: itemInput, required: required, count: count};
        onAddItem(newItem);
        setRequired(false);
        setItemInput(''); 
     };

          };
    return(<div>

    <input type="text" value={itemInput} onChange={handleInputChange} />
        <input type="number" value={count} onChange={handleCountChange} />
        <label>
            <input
              type="checkbox" checked={required}
              onChange={handleCheckboxChange}
            />
            Required
          </label>  

                    <button onClick={
                    addItem
                }>
                Add Item
                </button>
    </div>) 
}

export default AddListItem