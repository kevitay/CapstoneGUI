import React, { useEffect } from "react";
import NameSearch from "./NameSearch";
import LocationFilter from "./LocationFilter";
import StatusFilter from "./StatusFilter";
import DrivingFilter from "./DrivingFilter";
import SeatsFilter from "./SeatsFilter";
import RoomFilter from "./RoomFilter";
import DropDownFilter from "./DropDownFilter";

function EventFilter({ userData, setUserState }) {

    useEffect(() => { console.log(userData) }, []);

    return (
        <div className="EventFilter">
            <div className="ProfileFilterHeader">
                <th>empty</th>
            </div>
            <div className="NameSearch">
                <th><NameSearch /></th>
            </div>
            <div className="LocationFilter">
                <th><DropDownFilter filterOn={"location"} filterName={"Location"} userState={userData} dataToFilter={userData.map(x => x.City + ', ' + x.State)} setUserState={setUserState}></DropDownFilter></th>
            </div>
            <div className="StatusFilter">
                <th><DropDownFilter filterOn={"status"} filterName={"Status"} userState={userData} dataToFilter={userData.map(x => x.Status)} setUserState={setUserState}></DropDownFilter></th>
            </div>
            <div className="DrivingFilter">
                <th><DropDownFilter filterOn={"driving"} filterName={"Driving?"} userState={userData} dataToFilter={userData.map(x => x.Driving)} setUserState={setUserState}></DropDownFilter></th>
            </div>
            <div className="SeatsFilter">
                <th><DropDownFilter filterOn={"seats"} filterName={"Seats Available"} userState={userData} dataToFilter={userData.map(x => x.SeatsAvailable)} setUserState={setUserState}></DropDownFilter></th>
            </div>

        </div>
    )
}

export default EventFilter;