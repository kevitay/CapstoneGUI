import React, { useState, useEffect, useContext } from 'react';
import Signup from './signup';
import { getListData, signupForItem } from './listGetters';
import AuthContext from '../IdentityResources/Contexts/AuthContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';



const ParticipantView = ({ eventId }) => {
  // username = "Russhi";
  const checklistUrl = "http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/checklist";
  const [packingList, setPackingList] = useState([]);
  const [signupList, setSignupList] = useState([]);
  const [assignedList, setAssignedList] = useState([]);
  const [authState,] = useContext(AuthContext);

  const username = authState.username;
  // console.log(authState);

  const refreshData = () => {
    getListData(eventId, username)
      .then((listData) => {
        // console.log(listData);
        setAssignedList(listData.currentUserSignups);
        setPackingList(listData.packingList);
        setSignupList(listData.availableSignups);
      });
  };

  const addSignup = (checklistItemId) => {
    signupForItem(checklistItemId, username)
      .then(refreshData);
  };

  const removeSignup = (checklistItemId) => {
    let requestOptions = { method: 'GET', redirect: 'follow' };

    fetch(checklistUrl + "/assignees/" + checklistItemId + "?userName=" + username, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log("Assignee List to be removed: ", result);
        return result;
      })
      .then(result => {
        for (let i = 0; i < result.assigneeList.length; i++) {
          // console.log("assignee to be removed", result.assigneeList[i]);
          deleteAssigneeById(result.assigneeList[i].id);
        }
        return result;
      })
      .catch(error => console.log('error', error));
  };

  const deleteAssigneeById = (assigneeId) => {
    let requestOptions = { method: 'DELETE', redirect: 'follow' };

    fetch(checklistUrl + "/assignees/" + assigneeId, requestOptions)
      .then(response => {
        if (response.status === 202) {
          // console.log('deleteAssigneeById removed assignee', assigneeId);
        } else {
          throw new Error('deleteAssigneeById assignee', assigneeId, 'remove failed');
        }
        refreshData();
      })
      .catch(error => console.log('error', error));
  };

  useEffect(refreshData, [eventId, username]);

  return (
    <>
      <Typography variant="h6">Packing List Items</Typography>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow >
              <TableCell sx={{width: 350, fontWeight: 'bold'}}>DESCRIPTION</TableCell>
              <TableCell sx={{width: 350, fontWeight: 'bold'}} align="center">QUANTITY</TableCell>
              <TableCell sx={{width: 350, fontWeight: 'bold'}} align="center">REQUIRED</TableCell>
              <TableCell sx={{width: 350}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packingList.length > 0 ? packingList.map(result => (
              <TableRow key={result.id} sx={{}}>
                <TableCell>{result.description}</TableCell>
                <TableCell align="center">{result.quantity}</TableCell>
                <TableCell align="center">
                  {(result.required) ? "yes" : ""}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))
              : <TableRow><TableCell colSpan="3">No Packing List Items</TableCell></TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6">Signup List Items I've Signed Up For</Typography>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{width: 350, fontWeight: 'bold'}}>DESCRIPTION</TableCell>
              <TableCell sx={{width: 350, fontWeight: 'bold'}} align="center">QUANTITY</TableCell>
              <TableCell sx={{width: 350, fontWeight: 'bold'}} align="center">REQUIRED</TableCell>
              <TableCell sx={{width: 350}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignedList.length > 0 ? assignedList.map(result => (
              <TableRow key={result.id}>
                <TableCell>{result.description}</TableCell>
                <TableCell align="center">{result.quantity}</TableCell>
                <TableCell align="center">
                  {(result.required) ? "yes" : ""}
                </TableCell>
                <TableCell> <Button variant="contained" onClick={() => removeSignup(result.id)}> Remove </Button></TableCell>
              </TableRow>
            ))
              : <TableRow><TableCell colSpan="4">You haven't signed up for anything</TableCell></TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6">Signup List Items Available</Typography>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{width: 350, fontWeight: 'bold'}}>DESCRIPTION</TableCell>
              <TableCell sx={{width: 350, fontWeight: 'bold'}} align="center"># REMAINING</TableCell>
              <TableCell sx={{width: 350, fontWeight: 'bold'}} align="center">REQUIRED</TableCell>
              <TableCell sx={{width: 350}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {signupList.length > 0 ? signupList.map(result => (
              <Signup 
                key={result.id}
                username={username}
                signupListItem={result}
                handleAddAssignee={addSignup}
              />
            ))
              : <TableRow><TableCell colSpan="3">No Signup List Items Available</TableCell></TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ParticipantView;