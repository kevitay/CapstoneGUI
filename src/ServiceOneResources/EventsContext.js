import React, { createContext, useReducer } from 'react';

//This is our EventList State 
const initialState = {
  eventsList: [],
};

//Here we are exporting our Context to be able to use it in other components
export const EventContext = createContext();

//This is our reducer: The first case sets our list, Second: Deletes one from local list State.
// On re render the eventList gets set again with the most current data from API.
const eventReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return {
        ...state,
        eventsList: action.payload
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        //we are only keeping events that don't match the id from the payload
        eventsList: state.eventsList.filter((event) => event.id !== action.payload),
      };
    case 'ADD_EVENT':
      return {
         ...state,
         eventsList: [...state.eventsList, action.payload]
      };
    default:
      return state;
  }
};

//EventProvider component allows to pass down state to children: eventlist,brief, etc.
export const EventProvider = ({ children }) => {

  const [state, dispatch] = useReducer(eventReducer, initialState);

  return <EventContext.Provider value={{ state, dispatch }}>{children}</EventContext.Provider>;
};
