import React, { useEffect } from "react";
import NameSearch from "./NameSearch";
import DropDownFilter from "./DropDownFilter";

function EventFilter({ originalState, participantState, setEventParticipants }) {

    useEffect(() => { console.log(participantState) }, []);

    function stateReset(e) {
        console.log(originalState)
        e.preventDefault();
        setEventParticipants(originalState)
    }

    return (
        <div className="EventFilter">
            <table>
                <tr>
                    <th className="NameSearch">
                        <NameSearch participantState={participantState} setEventParticipants={setEventParticipants} />
                    </th>
                    <th className="LocationFilter">
                        <DropDownFilter filterOn={"location"} filterName={"Location"} participantState={participantState} dataToFilter={participantState.map(x => x.city + ', ' + x.state)} setEventParticipants={setEventParticipants}></DropDownFilter>
                    </th>
                    <th className="StatusFilter">
                        <DropDownFilter filterOn={"status"} filterName={"Status"} participantState={participantState} dataToFilter={participantState.map(x => x.status)} setEventParticipants={setEventParticipants}></DropDownFilter>
                    </th>
                    <th className="DrivingFilter">
                        <DropDownFilter filterOn={"driving"} filterName={"Driving?"} participantState={participantState} dataToFilter={['Yes', 'No']} setEventParticipants={setEventParticipants}></DropDownFilter>
                    </th>
                    <th className="SeatsFilter">
                        <DropDownFilter filterOn={"seats"} filterName={"Seats Available"} participantState={participantState} dataToFilter={participantState.map(x => x.seatsAvail)} setEventParticipants={setEventParticipants}></DropDownFilter>
                    </th>
                </tr>
            </table>

            <button onClick={(e) => stateReset(e)}>Clear Filters</button>

        </div>
    )
}

export default EventFilter;