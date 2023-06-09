import React from "react";
import { useState } from "react";
import { Button, IconButton, Typography, Box } from "@mui/material";
import Modal from '@mui/material/Modal';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';

function UploadInterface({ fetchEventImages, eventId }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [open, setOpen] = React.useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFileChange = (event) => {
        const fileSelection = event.target.files[0];
        setSelectedFile(fileSelection);
    };

    const clearFiles = () => {
        setSelectedFile(null);
    }

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
                handleClose();
            } else {
                console.error('ERROR: Picture failed to upload');
            }
        } catch (error) {
            console.error('ERROR: Picture failed to upload', error);
        }
    };

    return (
        <>
            <Button variant="contained" onClick={handleOpen} sx={{ margin: '5px' }}>
                Add Photos
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Upload an image
                    </Typography>
                    <IconButton className="img-selection-finder-icon" variant="contained" component="label">
                        <CloudUploadIcon />
                        <input type="file" onChange={handleFileChange} hidden />
                    </IconButton>
                    {selectedFile ? (
                        <>
                            <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
                                <ListItem>
                                    <IconButton onClick={clearFiles}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <img
                                                src={URL.createObjectURL(selectedFile)}
                                                alt="Failed to load"
                                                loading="lazy"
                                                className="img-selection-icon"
                                            />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText disableTypography primary={<Typography noWrap variant="body2">{selectedFile.name}</Typography>} />
                                    <Button variant="contained" sx={{ minWidth: 80, padding: '10px', margin: '5px' }} onClick={sendFile}>Upload</Button>
                                </ListItem>
                            </List>
                        </>
                    ) : ("")}
                </Box>
            </Modal>
        </>
    )
}

export default UploadInterface;