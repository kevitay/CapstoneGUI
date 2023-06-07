import React, { useState, useEffect } from "react";

function DropDownFilter({ resetStatus, filterOn, filterName, participantState, dataToFilter, setEventParticipants }) {


    const uniqueData = [...new Set(dataToFilter)];
    const [filterState, setFilterState] = useState(filterName);

    const captureCategory = (event) => {
        event.preventDefault();
        const filterVal = event.target.value;
        handleFilter(filterVal);
        setFilterState(filterVal);
    }

    useEffect(() => { setFilterState(filterName) }, [filterName, resetStatus]);

    const handleFilter = (category) => {
        if (!category) return;
        if (filterOn === 'location') {
            const categories = participantState.filter(x => x.user.city + ', ' + x.user.state === category);
            setEventParticipants(categories);
        } else if (filterOn === 'status') {
            const categories = participantState.filter(x => x.status === category);
            setEventParticipants(categories);
        } else if (filterOn === 'driving') {
            if (category === 'Yes') {
                const categories = participantState.filter(x => x.carpool === true);
                setEventParticipants(categories);
            } else {
                const categories = participantState.filter(x => x.carpool === false);
                setEventParticipants(categories);
            }
        } else if (filterOn === 'seats') {
            const categories = participantState.filter(x => x.seatsAvail + '' === category);
            setEventParticipants(categories);
        }

        //props.reducer({ type: 'eventList', payload: categories })
    };

    return (
        <div>
            <form>
                <select value={filterState} name={filterState} onChange={(e) => captureCategory(e)}>
                    <option hidden={true} selected value='' defaultValue={filterName}>{filterName}</option>
                    {uniqueData.map((option) => (
                        option ? <option value={option}>{option}</option> : ''
                    ))}
                </select>
            </form>
        </div>
    )
}

export default DropDownFilter;