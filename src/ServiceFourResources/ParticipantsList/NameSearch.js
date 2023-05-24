import React from "react";

function NameSearch({participantState, setEventParticipants}) {
   let searchTerm = ""
   
    const captureCategory = (event) => {
        event.preventDefault()
        const newValue = event.target.value;
        console.log(newValue)
        searchTerm = newValue;
    }

    function handleSearch(e){
        console.log(searchTerm)
        e.preventDefault()
        const categories = participantState.filter(x => x.user.firstName + " " + x.user.lastName === searchTerm);
            setEventParticipants(categories);
    }
    return (
        <form onSubmit={(e) => handleSearch(e)}>
            <input onChange={(e) => captureCategory(e)} type="text" placeholder="Enter Name"></input>
            <button type="submit">Search</button>
        </form>
    )
}

export default NameSearch;