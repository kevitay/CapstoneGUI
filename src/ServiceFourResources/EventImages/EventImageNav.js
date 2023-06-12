import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import Tooltip from '@mui/material/Tooltip';

function EventImageNav({ eventId }) {
    const navigate = useNavigate();

    function handlePhotoIconClick() {
        navigate('/eventImages/' + eventId);
    }

    return (
        <Tooltip title="View Photo Gallery">
            <IconButton onClick={handlePhotoIconClick}>
                <PhotoLibraryIcon />
            </IconButton>
        </Tooltip>
    )
}

export default EventImageNav;