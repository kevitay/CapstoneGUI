import React, { useState } from "react";
import AddListItem from "./addListItem";
import ItemList from "./itemList";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';


function BeforeEvent({ eventId }) {
  const [packingList, setPackingList] = useState([]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 350, fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ width: 250, fontWeight: 'bold' }}>Type</TableCell>
              <TableCell sx={{ width: 150, fontWeight: 'bold' }} align="center">Quantity</TableCell>
              <TableCell sx={{ width: 150, fontWeight: 'bold' }} align="center">Required</TableCell>
              <TableCell sx={{ width: 350, fontWeight: 'bold' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <AddListItem
              eventId={eventId}
              setPackingList={setPackingList}
              packingList={packingList}
            />
            <ItemList
              items={packingList}
              setPackingList={setPackingList}
              eventId={eventId}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default BeforeEvent;