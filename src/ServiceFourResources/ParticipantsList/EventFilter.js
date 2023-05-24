import React, { useEffect } from "react";
import NameSearch from "./NameSearch";
import DropDownFilter from "./DropDownFilter";

function EventFilter({ participantState, setEventParticipants }) {

    useEffect(() => { console.log(participantState) }, []);

    return (
        <div className="EventFilter">
            <div className="ProfileFilterHeader">
                <th>empty</th>
            </div>
            <div className="NameSearch">
                <th><NameSearch /></th>
            </div>
            <div className="LocationFilter">
                <th><DropDownFilter filterOn={"location"} filterName={"Location"} userState={participantState} dataToFilter={participantState.map(x => x.city + ', ' + x.state)} setEventParticipants={setEventParticipants}></DropDownFilter></th>
            </div>
            <div className="StatusFilter">
                <th><DropDownFilter filterOn={"status"} filterName={"Status"} userState={participantState} dataToFilter={participantState.map(x => x.status)} setEventParticipants={setEventParticipants}></DropDownFilter></th>
            </div>
            <div className="DrivingFilter">
                <th><DropDownFilter filterOn={"driving"} filterName={"Driving?"} userState={participantState} dataToFilter={['Yes', 'No']} setEventParticipants={setEventParticipants}></DropDownFilter></th>
            </div>
            <div className="SeatsFilter">
                <th><DropDownFilter filterOn={"seats"} filterName={"Seats Available"} userState={participantState} dataToFilter={participantState.map(x => x.seatsAvail)} setEventParticipants={setEventParticipants}></DropDownFilter></th>
            </div>

        </div>
    )
}

export default EventFilter;