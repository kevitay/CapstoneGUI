import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../IdentityResources/Contexts/AuthContext.js";
import UserEvent from "./UserEvent.js";
import EventInfo from "./EventInfo.js";

function ProfileEvent() {

    const [authState, ] = useContext(AuthContext);
    const [userEventsList, setUserEventsList] = useState([])
    const [loading, setLoadState] = useState(false);
    const [eventInfo, setEventInfo] = useState([]);

    useEffect(() => {
        var requestOptions = {
            method: 'GET'
        };
        let eventPartArr = [];
        let eventArr = []; 
        setLoadState(true);
        fetch("http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/participant/"+authState.username+"/events", requestOptions)
            .then(response => response.json())
            .then(result => {eventPartArr.push(result.eventParticipants);})
            .then(eventResult => {    
                for(let i = 0; i < eventPartArr[0].length; i++) {
                    fetch("http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/"+ eventPartArr[0][i].eventId)
                    .then(response => response.json())
                    .then(result => {eventArr.push(result);})  
                    
                    .catch(error => console.log('error', error));
                }
            })
            .then(() => setUserEventsList(eventPartArr))
           
            .then(() => setEventInfo(eventArr))
            .then(result => console.log('Gibber', eventInfo))

            .catch(error => console.log('error', error))
            .then(()=>setLoadState(false));
    }, []);
    
    return (
        <>
        <div>
            {loading ? "" : eventInfo.map((eventInformation) => <><EventInfo eventInformation={eventInformation}></EventInfo></>)}
            {
            loading ? "" : userEventsList.map((event) => <><UserEvent event={event}></UserEvent></>)
            }
        </div>
        </>
    )

}

export default ProfileEvent; 