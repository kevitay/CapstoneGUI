import React, { useState } from "react";


function BeforeEvent(){
const [packingList, setPackingList] = useState([])

return (
    <div>
        <ul>
            {packingList.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
        <button onClick={() => setPackingList([...packingList, "towel"])}>
            Add Item
        </button>
    </div>
)

}
export default BeforeEvent;