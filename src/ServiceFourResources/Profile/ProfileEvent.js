import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../IdentityResources/Contexts/AuthContext.js";
import UserEvent from "./UserEvent.js";

function ProfileEvent() {

    const [authState, ] = useContext(AuthContext);
    const [userEventsList, setUserEventsList] = useState([])
    const [loading, setLoadState] = useState(false);
    const [eventInfo, setEventInfo] = useState([]);

    useEffect(() => {
        var requestOptions = {
            method: 'GET'
        };
        setLoadState(true);
        fetch(`http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/participant/${authState.username}/events`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setUserEventsList(result.eventParticipants)
                // TODO on integration with Event team 
                // Grab event info either from an Event state, or a fetch call on Event API 
            })
            .then(() => setLoadState(false))
            .catch(error => console.log('error', error));
    }, []);
    
    return (
        <>
        <div>
            {
            loading ? "" : userEventsList.map((event) => <><UserEvent event={event}></UserEvent></>)
            }
        </div>
        </>
    )

}

export default ProfileEvent; 