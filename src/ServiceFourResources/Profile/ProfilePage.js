import React from "react"; 
import UserProfile from "./UserProfile"; 
import ProfilePic from "./ProfilePic";
import './Profile.css';


function ProfilePage() {
    return (
        <div>
            <h1>User Profile</h1>
            <ProfilePic></ProfilePic>
            <UserProfile></UserProfile>
        </div>
    )
}

export default ProfilePage; 