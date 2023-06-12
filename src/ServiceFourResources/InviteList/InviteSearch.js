import { React, useState, useEffect } from "react";
import { FormControl, Button, Input} from '@mui/material';

function InviteNameSearch({ userState, setUserState, resetStatus }) {

    const [searchTerm, setSearchTerm] = useState("");

    const captureCategory = (event) => {
        event.preventDefault()
        const newValue = event.target.value;
        console.log(newValue)
        setSearchTerm(newValue);
    }

    function handleSearch(e) {
        e.preventDefault()
        console.log("Search button")
        const results = userState.filter(x => x.firstName === searchTerm);
        console.log(results)
        setUserState(results);
    }

    useEffect(() => { setSearchTerm("") }, [resetStatus]);

    return (
        <form onSubmit={(e) => handleSearch(e)}>
            <FormControl >
                <Input onChange={(e) => captureCategory(e)} type="text" value={searchTerm} placeholder="Enter Name"></Input>
                <Button type="submit" >Search</Button>
            </FormControl>
        </form> 
            
    )
}

export default InviteNameSearch;