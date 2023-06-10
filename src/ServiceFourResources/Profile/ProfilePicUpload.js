import React, { useState, useContext } from "react";
import AuthContext from "../../IdentityResources/Contexts/AuthContext.js";
import { Button, IconButton, Typography, Box } from "@mui/material";
import Modal from '@mui/material/Modal';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';



function ProfilePicUpload({fetchProfilePicture}){
    const [authState,] = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [open, setOpen] = useState(false);

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

    const handleClose = () => {
        setOpen(false);
        clearFiles();
    }
    const handleFileChange = (event) => {
        const fileSelection = event.target.files[0];
        setSelectedFile(fileSelection);
    };

    const clearFiles = () => {
        setSelectedFile(null);
    }

    
    const sendFile = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('profilePic', selectedFile);

        try {
            const response = await fetch('http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/users/' + authState.username + '/pic', {
                method: 'PATCH',
                body: formData
            });

            if (response.ok) {
                fetchProfilePicture(authState.username);
                handleClose(); 
                clearFiles();
            } else {
                console.error('ERROR: Profile picture failed to update');
            }
        } catch (error) {
            console.error('ERROR: Profile picture failed to update', error);
        }
    };
    return (
        <>
        <Button variant="contained" onClick={handleOpen} sx={{ml:'4em',mt:'1em',mr:'13em',mb: '1em',maxBlockSize:'2em',width:'11em', height:'3em', fontSize:'.5em'}}>
            Change pic
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
                                    <Avatar sx={{ width: 40, height: 40 }}>
                                        <img
                                            src={URL.createObjectURL(selectedFile)}
                                            alt="Failed to load"
                                            loading="lazy"
                                            className="img-selection-icon"
                                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
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

export default ProfilePicUpload; 