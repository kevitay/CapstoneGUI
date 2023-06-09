import React from "react";
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

// export default function ActivitySummary({editForm, activity, setDisplayActivityDetails, setCloseActivityDetailsButton}) {
//     const time = new Date(activity.startTime); 
//     const formattedTime = time.toLocaleTimeString('en-US', {
//         hour: 'numeric',
//         minute: 'numeric'
//     });

//     return (
//         <div>
//             <h3 >{activity.activityName}</h3>
//             <p >{activity.description}</p>
//             <p >Activity Start Time:{formattedTime}</p>

//             {!editForm && <Button  onClick={() => {setDisplayActivityDetails(activity); setCloseActivityDetailsButton(true)}} variant="contained">Expand Details</Button>}
//         </div>
//     )

function createData(name, address, startTime, endTime) {
    return {
      name,
      address,
      startTime,
      endTime,
      history: [
        {
          mandatory: 'Yes',
          importantReminder: 'Do not forget shoes',
          indoor: 'Indoor',
          price: 3.00,
          groupSize: 5,
          address: '123 Street',
          city: 'Some City',
          state: 'Statington',
          zip: '12345',
          activityURL: 'www.activity.com',
          activityType: 'meal'
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
          <TableCell align="right">{row.address}</TableCell>
          <TableCell align="right">{row.startTime}</TableCell>
          <TableCell align="right">{row.endTime}</TableCell>
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
                      <TableCell align="right">State</TableCell>
                      <TableCell align="right">Zip</TableCell>
                      <TableCell align="right">Activity URL</TableCell>
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
                        <TableCell align="right">{historyRow.indoor}</TableCell>
                        <TableCell align="right">{historyRow.price}</TableCell>
                        <TableCell align="right">{historyRow.groupSize}</TableCell>
                        <TableCell align="right">{historyRow.address}</TableCell>
                        <TableCell align="right">{historyRow.city}</TableCell>
                        <TableCell align="right">{historyRow.state}</TableCell>
                        <TableCell align="right">{historyRow.zip}</TableCell>
                        <TableCell align="right">{historyRow.activityURL}</TableCell>
                        <TableCell align="right">{historyRow.activityType}</TableCell>
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
  //I want this to use
  const rows = [
    createData('T Party', "123 Street", "5/16/23 8:00 AM", "5/16/23 10:00 AM"),
  ];
  
  export default function CollapsibleTable() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Activity Name</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Start Time</TableCell>
              <TableCell align="right">End Time</TableCell>
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

}; 