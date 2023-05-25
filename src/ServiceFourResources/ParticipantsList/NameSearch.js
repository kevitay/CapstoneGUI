import {React, useState, useEffect} from "react";

function NameSearch({ resetStatus, participantState, setEventParticipants }) {

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
        const categories = participantState.filter(x => x.user.firstName + " " + x.user.lastName === searchTerm);
        setEventParticipants(categories);
    }

    useEffect(() => { setSearchTerm("") }, [resetStatus]);

    return (
        <form onSubmit={(e) => handleSearch(e)}>
            <input onChange={(e) => captureCategory(e)} type="text" value={searchTerm} placeholder="Enter Name"></input>
            <button type="submit">Search</button>
        </form>
    )
}

export default NameSearch;