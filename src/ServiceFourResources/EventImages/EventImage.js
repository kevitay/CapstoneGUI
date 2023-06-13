import { React, useState } from "react";
import ImageListItem from '@mui/material/ImageListItem';
import Modal from '@mui/material/Modal';
import { Box } from "@mui/material";

function EventImage({ img }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
    }

    const style = {
        position: 'absolute',
        width: '100%',
        maxWidth: '600px',
        height: 'auto',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0px',
        padding: '5px'
    };

    return (
        <ImageListItem key={img.data}>
            <img
                src={`data:image/jpg;base64,${img.data}`}
                alt={"Failed to load"}
                loading="lazy"
                style={{ width: '250px', height: 'auto', objectFit: 'cover' }}
                onClick={handleOpen}
            />
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <img
                        src={`data:image/jpg;base64,${img.data}`}
                        alt={"Failed to load"}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </Box>
            </Modal>
        </ImageListItem>
    )
}

export default EventImage;