import React from "react";
import Users from "./Users";
import { Box } from "@mui/material";

function InviteList({setCreationStep, event, editMode}) {
    
    return (
        <div className="InviteList">
            <Box sx={{ml:'5em'}}>
            {!editMode ? <h1>Invite Users</h1>: <h1>Invite additional Users</h1>}
           <Users editMode={editMode} setCreationStep={setCreationStep}  event={event}></Users>
           </Box>
        </div>
    )
}

export default InviteList; 