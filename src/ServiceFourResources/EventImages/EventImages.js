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
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto',
            marginTop: '20px'
        }}>
            <Card sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <UploadInterface fetchEventImages={fetchEventImages} eventId={eventId}></UploadInterface>
                <Box sx={{
                    height: '600px',
                    width: '1040px',
                    overflowY: 'auto',
                    margin: '10px'
                }}>
                    <ImageList variant="masonry" cols={4} gap={6}>
                        {loading ? "" : imageList.map((img) => (<EventImage img={img}></EventImage>))}
                    </ImageList>
                </Box>
            </Card>
        </Box>
    )
}

export default EventImages;