import React from "react";

export default function DateSelector({formatDate, dateArray, setButtonDate}) {

    return (
        <div>
            <button onClick={() => setButtonDate("")}>Select All</button>
            {dateArray.map((date, index) => <button onClick={() => setButtonDate(date)} key={index}>{formatDate(date)}</button>)}
        </div>
    )
}