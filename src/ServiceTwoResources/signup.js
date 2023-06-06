import React from 'react';

const Signup = ({ user, signupListItem, handleAddAssignee }) => {
  const signupForItem = () => {
    handleAddAssignee(signupListItem.id);
  };

  return (
    <tr key={signupListItem.id}>
      <td>{signupListItem.description}</td>
      <td>{signupListItem.quantity}</td>
      <td>
        {(signupListItem.quantity === 0)
          ? <button onClick={signupForItem} disabled> Sign Up! </button>
          : <button onClick={signupForItem}> Sign Up! </button>
        }
      </td>
    </tr>
  );
}

export default Signup;