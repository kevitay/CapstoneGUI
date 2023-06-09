import React, { useState } from "react";
import AddListItem from "./addListItem";
import ItemList from "./itemList";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function BeforeEvent({ eventId }) {
  const [packingList, setPackingList] = useState([]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 350, fontWeight: 'bold' }}>DESCRIPTION</TableCell>
              <TableCell sx={{ width: 250, fontWeight: 'bold' }}>TYPE</TableCell>
              <TableCell sx={{ width: 150, fontWeight: 'bold' }} align="center">QUANTITY</TableCell>
              <TableCell sx={{ width: 150, fontWeight: 'bold' }} align="center">REQUIRED</TableCell>
              <TableCell sx={{ width: 350, fontWeight: 'bold' }} align="center">ACTION</TableCell>
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