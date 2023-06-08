import React from "react";
import { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";

function UploadInterface({ fetchEventImages, eventId }) {
    //const [selectedFile, setSelectedFile] = useState(null);

    // const handleFileChange = (event) => {
    //     const fileSelection = event.target.files[0];
    //     setSelectedFile(fileSelection);
    // };

    // const sendFile = async () => {
    //     const formData = new FormData();
    //     formData.append('eventImg', selectedFile);

    //     try {
    //         const response = await fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/' + eventId + '/eventImages', {
    //             method: 'POST',
    //             body: formData
    //         });

    //         if (response.ok) {
    //             console.log('Picture upload successful');
    //             fetchEventImages(eventId);
    //         } else {
    //             console.error('ERROR: Picture failed to upload');
    //         }
    //     } catch (error) {
    //         console.error('ERROR: Picture failed to upload', error);
    //     }
    // };

    return (
        <>
            <ButtonGroup variant="contained">
                <Button></Button>
                <Button></Button>
            </ButtonGroup>
        </>

    )
}

export default UploadInterface;