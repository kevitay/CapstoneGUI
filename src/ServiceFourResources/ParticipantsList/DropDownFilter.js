import React from "react";

function DropDownFilter({ dataToFilter }) {

    const captureCategory = (event) => {
        event.preventDefault()
        const newValue = event.target.value;
        console.log(newValue)
        handleFilter(newValue);
    }

    const handleFilter = (category) => {
        if (!category) return;
        const categories = dataToFilter.filter(x => x.classifications[0].segment.name === category);
        //props.reducer({ type: 'eventList', payload: categories })
    };

    return (
        <div>
            <form>
                <select>
                    <option selected value=''>Select Category</option>
                </select>
            </form>
        </div>
    )
}

export default DropDownFilter;