import React from "react";
import { NavLink, useParams } from "react-router-dom";

function EventImageNav() {
    let { eventId } = useParams();
    return (
        <NavLink to={'/eventImages/' + eventId}>Event Images</NavLink>
    )
}

export default EventImageNav;