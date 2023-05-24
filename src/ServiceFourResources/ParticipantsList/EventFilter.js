import React from "react";
import NameSearch from "./NameSearch";
import LocationFilter from "./LocationFilter";
import StatusFilter from "./StatusFilter";
import DrivingFilter from "./DrivingFilter";
import SeatsFilter from "./SeatsFilter";
import RoomFilter from "./RoomFilter";
import DropDownFilter from "./DropDownFilter";

function EventFilter( { userState, setUserState }) {
    return (
        <div className="EventFilter">
            <div className="ProfileFilterHeader">
                <th>empty</th>
            </div>
            <div className="NameSearch">
                <th><NameSearch/></th>
            </div>
            <div className="LocationFilter">
                <th><DropDownFilter dataToFilter={userState}></DropDownFilter></th>
            </div>
            <div className="StatusFilter">
                <th><StatusFilter/></th>
            </div>
            <div className="DrivingFilter">
                <th><DrivingFilter/></th>
            </div>
            <div className="SeatsFilter">
                <th><SeatsFilter/></th>
            </div>
            <div className="RoomFilter">
                <th><RoomFilter/></th>
            </div>

        </div>
    )
}

export default EventFilter;