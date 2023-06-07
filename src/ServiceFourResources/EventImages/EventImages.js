import React, { useEffect, useState } from "react";
import EventImage from "./EventImage";
import { useParams } from "react-router-dom";

function EventImages() {
    const [imageList, setImageList] = useState([]);
    const [loading, setLoadState] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

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

    const handleFileChange = (event) => {
        const fileSelection = event.target.files[0];
        setSelectedFile(fileSelection);
        console.log(fileSelection);
    };

    const sendFile = async (event) => {
        event.preventDefault();
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

    useEffect(() => {
        fetchEventImages(eventId);
    }, [eventId]);

    return (
        <div>
            <form>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={sendFile}>Upload</button>
            </form>
            {loading ? "" : imageList.map((img) => (<EventImage img={img}></EventImage>))}
        </div>
    )
}

export default EventImages;