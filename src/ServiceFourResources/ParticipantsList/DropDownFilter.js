import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
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
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel
              sx={{
                // position: "relative",
                top: -9,
                // background: "white",
              }}
            >
              {filterName}
            </InputLabel>
            <Select 
              value={filterState}
              name={filterState}
              onChange={(e) => captureCategory(e)}
              sx={{height:'2em' }}
            >
              <MenuItem value="" disabled>
                {filterName}
              </MenuItem>
              {uniqueData.map((option) =>
                option ? (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ) : null
              )}
            </Select>
          </FormControl>
        </div>
      );
}

export default DropDownFilter;