import React, {useState, useEffect} from "react"; 
import UserProfile from "./UserProfile"; 
import ProfileEvent from "./ProfileEvent"; 
import './Profile.css';


function ProfilePage() {
    return (
        <div>
            <h1>User Profile</h1>
            <p>-----------------------</p>
            <UserProfile></UserProfile>
            <h2>Your current events</h2>
            <ProfileEvent></ProfileEvent>
        </div>
    )
}

export default ProfilePage; 