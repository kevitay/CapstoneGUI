import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';


const Signup = ({ username, signupListItem, handleAddAssignee }) => {
  const signupForItem = () => {
    handleAddAssignee(signupListItem.id);
  };

  return (
    <TableRow key={signupListItem.id}>
      <TableCell>{signupListItem.description}</TableCell>
      <TableCell align="center">{signupListItem.quantity}</TableCell>
      <TableCell align="center">{signupListItem.required}</TableCell>
      <TableCell>
        {(username === null || username === "" || signupListItem.quantity === 0)
          ? <Button variant="contained" onClick={signupForItem} disabled> Sign Up </Button>
          : <Button variant="contained" onClick={signupForItem}> Sign Up </Button>
        }
      </TableCell>
    </TableRow>
  );
}

export default Signup;