import React from "react";
import { NavLink } from "react-router-dom";

function EventImageNav({ eventId }) {
    return (
        <button><NavLink to={'/eventImages/' + eventId}>Event Images</NavLink></button>
    )
}

export default EventImageNav;