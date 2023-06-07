import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../IdentityResources/Contexts/AuthContext.js";

const ProfilePic = () => {
    const [authState] = useContext(AuthContext);
    const [img, setImg] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const fetchProfilePicture = (username) => {
        fetch('http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/users/' + username)
            .then(response => response.json())
            .then(result => {
                setImg(result.profilePicture);
            })
            .catch(error => console.log('error', error));
    };

    //Fetch image when component loads or logged in user changes
    useEffect(() => {
        fetchProfilePicture(authState.username);
    }, [authState.username]);

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
                console.log('Profile picture updated');
                fetchProfilePicture(authState.username);
            } else {
                console.error('ERROR: Profile picture failed to update');
            }
        } catch (error) {
            console.error('ERROR: Profile picture failed to update', error);
        }
    };

    const handleFileChange = (event) => {
        const fileSelection = event.target.files[0];
        setSelectedFile(fileSelection);
        console.log(fileSelection);
    };

    return (
        <div>
            <form>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={sendFile}>Upload</button>
            </form>
            <div>
                <img src={"data:image/jpg;base64," + img} height="200px" width="200px" alt="profile pic" />
            </div>
        </div>
    );
};

export default ProfilePic;