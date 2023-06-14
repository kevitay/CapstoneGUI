import React, { useEffect, useState } from "react";
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
import EditAndDelete from "./EditAndDelete"
import EditActivity from "./EditActivity"

export default function ActivityList({ formatDate, states, setStates }) {
    const [dateObject, setDateObject] = useState({});
    const [currentActivity, setCurrentActivity] = useState(0);

    useEffect(() => {
        const tempDateObject = {};
        const tempDateArray = [];
        const activities = states.itineraryJSON.activities;

        for (let i = 0; i < activities.length; i++) {
            const currentActivityDate = activities[i].startTime.slice(0, 10)
            if (tempDateObject[currentActivityDate]) {
                tempDateObject[currentActivityDate].push(activities[i])
            } else {
                tempDateObject[currentActivityDate] = [activities[i]]
                tempDateArray.push(currentActivityDate)
            }
        };

        tempDateArray.sort();

        setDateObject(tempDateObject)
        setStates.setDateArray(tempDateArray)
    }, [states.itineraryJSON, setDateObject, setStates]);

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
                    id: activity.id
                },
            ],
        };
    }

    function Row(props) {
        const { row, activity } = props;
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}>

                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">{row.name}</TableCell>
                    <TableCell align="left">{row.address}</TableCell>
                    <TableCell align="left">{row.startTime}</TableCell>
                    <TableCell align="left">{row.endTime}</TableCell>
                    <TableCell align="left"><EditAndDelete setCurrentActivity={setCurrentActivity} activity={activity} states={states} setStates={setStates} /></TableCell>
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
                                            <TableRow>
                                                <TableCell align="left">{historyRow.mandatory ? historyRow.mandatory : "TBD"}</TableCell>
                                                <TableCell align="left">{historyRow.importantReminder  ? historyRow.importantReminder : "TBD"}</TableCell>
                                                <TableCell align="left">{historyRow.indoor ? historyRow.indoor : "TBD"}</TableCell>
                                                <TableCell align="left">{historyRow.price ? historyRow.price : "TBD"}</TableCell>
                                                <TableCell align="left">{historyRow.groupSize ? historyRow.groupSize : "TBD"}</TableCell>
                                                <TableCell align="left">{historyRow.address ? historyRow.address : "TBD"}</TableCell>
                                                <TableCell align="left">{historyRow.city ? historyRow.city : "TBD"}</TableCell>
                                                <TableCell align="left">{historyRow.state ? historyRow.state : "TBD"}</TableCell>
                                                <TableCell align="left">{historyRow.zip ? historyRow.zip : "TBD"}</TableCell>
                                                <TableCell align="left">{historyRow.activityURL  ? historyRow.activityURL : "TBD"}</TableCell>
                                                <TableCell align="left">{historyRow.activityType ? historyRow.activityType : "TBD"}</TableCell>
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
                    indoor: PropTypes.boolean,
                    price: PropTypes.string,
                    groupSize: PropTypes.number.groupSize,
                    address: PropTypes.string.address,
                    city: PropTypes.string.city,
                    state: PropTypes.string.state,
                    zip: PropTypes.string.zip,
                    activityURL: PropTypes.string.activityURL,
                    activityType: PropTypes.string.activityType,
                    importantReminder: PropTypes.string,
                    mandatory: PropTypes.string,
                }),
            ).isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number,
        }).isRequired,
    };

    
    return (
        <div>
            <ul>
                {states.dateArray.map((date) =>
                    (states.buttonDate === "" ? true : date === states.buttonDate) && (

                        <li key={date}>
                            <h2>{formatDate(date)}</h2>
                            <TableContainer component={Paper}>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Activity Name</TableCell>
                                        <TableCell>Address</TableCell>
                                        <TableCell>Start Time</TableCell>
                                        <TableCell>End Time</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    </TableHead>
                                    {dateObject[date]
                                        .sort(
                                            (a, b) =>
                                                Date.parse(a.startTime) - Date.parse(b.startTime)
                                        )
                                        .map((item) => (
                                            <TableBody>
                                                <Row key={item.activityName} activity={item} row={createData(item)} />
                                            </TableBody>
                                        ))}
                                </Table>
                            </TableContainer>
                        </li>
                    )
                )}
            </ul>
            

            {states.editForm && <EditActivity states={states} setStates={setStates} activity={currentActivity} />}
        </div>
    );
}