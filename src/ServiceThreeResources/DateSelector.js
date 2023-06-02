import React from "react";

export default function DateSelector({dateArray, setButtonDate}) {

    return (
        <div>
            <button onClick={() => setButtonDate("")}>Select All</button>
            {dateArray.map((date, index) => <button onClick={() => setButtonDate(date)} key={index}>{date}</button>)}
        </div>
    )
}