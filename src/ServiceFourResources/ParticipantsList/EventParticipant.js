import React, { useState } from "react";
import './EventParticipant.css';
import EventParticipantData from "./EventParticipantData";
import DropDownFilter from "./DropDownFilter";
import NameSearch from "./NameSearch";
import { Button } from "@mui/material";

function EventParticipant({ originalState, participantState, setEventParticipants }) {

    const [resetStatus, setResetStatus] = useState(false);

    function stateReset(e) {
        setResetStatus(!resetStatus);
        console.log(originalState);
        e.preventDefault();
        setEventParticipants(originalState);
    }

    return (
        <div className="EventParticipant">
            <table className="participant-data-table">
                <tr>
                    <th>
                        <Button onClick={(e) => stateReset(e)}>Clear Filters</Button>
                    </th>

                    <th className="NameSearch">
                        <NameSearch resetStatus={resetStatus} participantState={participantState} setEventParticipants={setEventParticipants} />
                    </th>
                    <th className="LocationFilter">
                        <DropDownFilter resetStatus={resetStatus} filterOn={"location"} filterName={"Location"} participantState={participantState} dataToFilter={participantState.map(x => x.user.city + ', ' + x.user.state)} setEventParticipants={setEventParticipants}></DropDownFilter>
                    </th>
                    <th className="StatusFilter">
                        <DropDownFilter resetStatus={resetStatus} filterOn={"status"} filterName={"Status"} participantState={participantState} dataToFilter={participantState.map(x => x.status)} setEventParticipants={setEventParticipants}></DropDownFilter>
                    </th>
                    <th className="DrivingFilter">
                        <DropDownFilter resetStatus={resetStatus} filterOn={"driving"} filterName={"Driving?"} participantState={participantState} dataToFilter={['Yes', 'No']} setEventParticipants={setEventParticipants}></DropDownFilter>
                    </th>
                    <th className="SeatsFilter">
                        <DropDownFilter resetStatus={resetStatus} filterOn={"seats"} filterName={"Seats Available"} participantState={participantState} dataToFilter={participantState.map(x => x.seatsAvail)} setEventParticipants={setEventParticipants}></DropDownFilter>
                    </th>
                </tr>
                {
                    participantState.map((user) => (<EventParticipantData participant={user} />))
                } </table>
        </div>
    )
}

export default EventParticipant;
