import React from "react";
import { useState } from "react";
import { Button, Card, IconButton, Input } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Modal from '@mui/material/Modal';

function UploadInterface({ fetchEventImages, eventId }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const fileSelection = event.target.files[0];
        setSelectedFile(fileSelection);
    };

    const sendFile = async () => {
        const formData = new FormData();
        formData.append('eventImg', selectedFile);

        try {
            const response = await fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/' + eventId + '/eventImages', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                console.log('Picture upload successful');
                fetchEventImages(eventId);
            } else {
                console.error('ERROR: Picture failed to upload');
            }
        } catch (error) {
            console.error('ERROR: Picture failed to upload', error);
        }
    };

    return (
        <>
            <Input
                id="file-input"
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <Card sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '5px',
                padding: '3px'
            }}>
                <label htmlFor="file-input">
                    <IconButton component="span">
                        <AddPhotoAlternateIcon />
                    </IconButton>
                </label>
                <Button variant="contained" onClick={sendFile} disableElevation>Submit</Button>
                {selectedFile ? <img src={URL.createObjectURL(selectedFile)} alt={"Failed to load"} loading="lazy" height="40px" width="40px"/> : ""}
            </Card>
        </>

    )
}

export default UploadInterface;