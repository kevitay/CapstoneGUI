import React from "react";
import { NavLink } from "react-router-dom";

function MyEventsNav() {
    return (
        <button><NavLink to={'/myEvents/'}>My Events</NavLink></button>
    )
}

export default MyEventsNav;