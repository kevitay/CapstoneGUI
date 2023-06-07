import React from "react";

function EventImage({ img }) {
    return (
        <img
            src={"data:image/jpg;base64," + img.data}
            alt="Failed to load"
        />
    )
}

export default EventImage;