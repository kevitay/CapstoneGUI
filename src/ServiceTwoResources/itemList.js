import React from "react";

function ItemList({ items, onUpdateItem, onDeleteItem }) {
     
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
          <td>{item.item}</td>
          <td>{item.required + "" }</td>
          <td>{item.count}</td>
          <td>
          <button onClick={() => onUpdateItem(index)}>Update</button>
          <button onClick={() => onDeleteItem(index)}>Delete</button>
        </td>
        </tr>
      ))}
      </tbody>
    </table>
)
};
export default ItemList;