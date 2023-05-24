import React, { useEffect } from "react";

function DropDownFilter({ filterOn, filterName, userState, dataToFilter, setEventParticipants }) {

    const uniqueData = [...new Set(dataToFilter)];

    const captureCategory = (event) => {
        event.preventDefault()
        const newValue = event.target.value;
        console.log(newValue)
        handleFilter(newValue);
    }

    const handleFilter = (category) => {
        if (!category) return;
        if (filterOn === 'location') {
            const categories = userState.filter(x => x.City + ', ' + x.State === category);
            setEventParticipants(categories);
        } else if (filterOn === 'status') {
            const categories = userState.filter(x => x.Status === category);
            setEventParticipants(categories);
        } else if (filterOn === 'driving') {
            const categories = userState.filter(x => x.Driving === category);
            setEventParticipants(categories);
        } else if (filterOn === 'seats') {
            const categories = userState.filter(x => x.SeatsAvailable === category);
            setEventParticipants(categories);
        }

        //props.reducer({ type: 'eventList', payload: categories })
    };

    useEffect(() => { console.log("Unique DataSet" + uniqueData) }, []);

    return (
        <div>
            <form>
                <select onChange={(e) => captureCategory(e)}>
                    <option selected value=''>{filterName}</option>
                    {uniqueData.map((option) => (
                        <option value={option}>{option}</option>
                    ))}
                </select>
            </form>
        </div>
    )
}

export default DropDownFilter;