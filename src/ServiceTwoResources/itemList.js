import React from "react";

function ItemList({ items, onUpdateItem, onDeleteItem }) {
     console.log(items);
return (
    <table> 
      <thead> 
        <tr>
          <th>name</th>
          <th>required</th>
          <th>count</th>
          <th></th>
        </tr>
         </thead>
         <tbody>
      {items.map((item, index) => (
        <tr key={index}>
          <td><input type="text" value={item.description}></input></td>
          <td><input type="text" value={item.required + "" }></input></td>
          <td><input type="text" value={item.quantity}></input></td>
          <td>
          <button onClick={() => onUpdateItem(item, index)}>Update</button>
          <button onClick={() => onDeleteItem(item)}>Delete</button>
        </td>
        </tr>
      ))}
      </tbody>
    </table>
)
};
export default ItemList;