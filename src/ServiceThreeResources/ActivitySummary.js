import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ActivitySummary({activity, states, setStates}) {
    const time = new Date(activity.startTime); 
    const formattedTime = time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric'
    });
    
    // return (
    //     <div>
    //         <h3 >{activity.activityName}</h3>
    //         <p >{activity.description}</p>
    //         <p >Activity Start Time:{formattedTime}</p>

    //         {!editForm && <Button  onClick={() => {setDisplayActivityDetails(activity); setCloseActivityDetailsButton(true)}} variant="contained">Expand Details</Button>}
    //     </div>
    // )

function createData(activity) {
    return {
      name: activity.activityName,
      address: activity.address,
      startTime: activity.startTime,
      endTime: activity.endTime,
      history: [
        {
          mandatory: activity.mandatory,
          importantReminder: activity.importantReminder,
          indoor: activity.indoor,
          price: activity.price,
          groupSize: activity.groupSize,
          address: activity.address,
          city: activity.city,
          state: activity.state,
          zip: activity.zip,
          activityURL: activity.url,
          activityType: activity.type,
        },
      ],
    };
  }
  
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="left">{row.address}</TableCell>
          <TableCell align="left">{row.startTime}</TableCell>
          <TableCell align="left">{row.endTime}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Activity Details
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Mandatory?</TableCell>
                      <TableCell>Important Reminder</TableCell>
                      <TableCell>Indoor/Outdoor</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Group Size</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>City</TableCell>
                      <TableCell>State</TableCell>
                      <TableCell>Zip</TableCell>
                      <TableCell>Activity URL</TableCell>
                      <TableCell>Activity Type</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.mandatory}>
                        <TableCell component="th" scope="row">
                          {historyRow.mandatory}
                        </TableCell>
                        <TableCell>{historyRow.importantReminder}</TableCell>
                        <TableCell align="left">{historyRow.indoor}</TableCell>
                        <TableCell align="left">{historyRow.price}</TableCell>
                        <TableCell align="left">{historyRow.groupSize}</TableCell>
                        <TableCell align="left">{historyRow.address}</TableCell>
                        <TableCell align="left">{historyRow.city}</TableCell>
                        <TableCell align="left">{historyRow.state}</TableCell>
                        <TableCell align="left">{historyRow.zip}</TableCell>
                        <TableCell align="left">{historyRow.activityURL}</TableCell>
                        <TableCell align="left">{historyRow.activityType}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  Row.propTypes = {
    row: PropTypes.shape({
      address: PropTypes.string,
      endTime: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          indoor: PropTypes.string.isRequired,
          price: PropTypes.string,
          groupSize: PropTypes.number.groupSize,
          address: PropTypes.string.address,
          city: PropTypes.string.city,
          state: PropTypes.string.state,
          zip: PropTypes.string.zip,
          activityURL: PropTypes.string.activityURL,
          activityType: PropTypes.string.activityType,
          importantReminder: PropTypes.string.isRequired,
          mandatory: PropTypes.string.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired,
  };
  
  const rows = [];
  rows.push(createData(activity));
  
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">Activity Name</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Start Time</TableCell>
              <TableCell align="left">End Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );

            {!states.editForm && <Button  onClick={() => {setStates.setDisplayActivityDetails(activity); setStates.setCloseActivityDetailsButton(true)}}>Expand Details</Button>}
        // </div>
    // )
}; 