import { React, useState, useEffect } from "react";
import { FormControl, Button, Input} from '@mui/material';

function InviteNameSearch({ users, setUserState, resetStatus }) {

    const [searchTerm, setSearchTerm] = useState("");

    const captureCategory = (event) => {
        event.preventDefault()
        const newValue = event.target.value;
        console.log(newValue)
        setSearchTerm(newValue);
    }

    function handleSearch(e) {
        console.log(searchTerm)
        e.preventDefault()
        const categories = users.filter(x => x.user.firstName + " " + x.user.lastName === searchTerm);
        console.log(categories)
        setUserState(categories);
    }

    useEffect(() => { setSearchTerm("") }, [resetStatus]);

    return (
        <form onSubmit={(e) => handleSearch(e)}>
            <FormControl>
                <Input onChange={(e) => captureCategory(e)} type="text" value={searchTerm} placeholder="Enter Name"></Input>
                <Button type="submit" >Search</Button>
            </FormControl>

        </form>
    )
}

export default InviteNameSearch;