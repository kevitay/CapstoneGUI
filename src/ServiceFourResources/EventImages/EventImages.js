import React, { useEffect, useState } from "react";
import EventImage from "./EventImage";
import UploadInterface from "./UploadInterface";
import { useParams } from "react-router-dom";
import ImageList from '@mui/material/ImageList';
import { Card, Box } from '@mui/material';

function EventImages() {
    const [imageList, setImageList] = useState([]);
    const [loading, setLoadState] = useState(false);

    const { eventId } = useParams();

    const fetchEventImages = (eventId) => {
        setLoadState(true);
        fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/' + eventId + '/eventImages')
            .then(response => response.json())
            .then(result => {
                setImageList(result);
            })
            .then(setLoadState(false))
            .catch(error => console.log('error', error));
    };

    useEffect(() => {
        fetchEventImages(eventId);
    }, [eventId]);

    return (
        <Card sx={{
            width: 1080,
            height: 720,
            fontSize: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto',

        }}>
            <UploadInterface fetchEventImages={fetchEventImages} eventId={eventId}></UploadInterface>
            <Box sx={{ width: '98%', height: '100%', overflowY: 'scroll', marginTop: '10px' }}>
                <ImageList variant="masonry" cols={4} gap={10}>
                    {loading ? "" : imageList.map((img) => (<EventImage img={img}></EventImage>))}
                </ImageList>
            </Box>
        </Card>
    )
}

export default EventImages;