import React from "react";
import ImageListItem from '@mui/material/ImageListItem';

function EventImage({ img }) {
    return (
        <ImageListItem key={img.data}>
            <img
                src={`data:image/jpg;base64,${img.data}`}
                alt={"Failed to load"}
                loading="lazy"
                style={{ width: '250px', height: 'auto', objectFit: 'cover' }}
            />
        </ImageListItem>
    )
}

export default EventImage;