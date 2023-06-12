import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

function EventImageNav({ eventId }) {
    const navigate = useNavigate();

    function handlePhotoIconClick() {
        navigate('/eventImages/' + eventId);
    }

    return (
        //<button><NavLink to={'/eventImages/' + eventId}>Event Images</NavLink></button>
        <IconButton onClick={handlePhotoIconClick}>
            <PhotoLibraryIcon />
        </IconButton>
    )
}

export default EventImageNav;